package com.example.patientmanager.services;

import com.example.patientmanager.exceptions.UserNotFoundException;
import com.example.patientmanager.models.*;
import com.example.patientmanager.repositories.ConversationRepository;
import com.example.patientmanager.repositories.MessageRepository;
import com.example.patientmanager.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConversationService
{
    @Autowired
    ConversationRepository conversationRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    MessageRepository messageRepository;


    public Conversation createConversation(long senderId, String otherUserEmail, Conversation conversation)
    {
        User user1, user2;
        try
        {
            //Pair the conversation with user 1...
            //Calling get() retrieves the actual User from the repos
            user1 = (User) userRepository.findById(senderId).get();
            conversation.addUserInvolved(user1);

            //Pair the conversation with user 1...
            //Calling get() retrieves the actual User from the repos
            user2 = (User) userRepository.findByEmail(otherUserEmail);
            if (user2 == null) throw new Exception();
            conversation.addUserInvolved(user2);
        }
        catch (Exception ex)
        {
            throw new UserNotFoundException("That user could not be found. Ensure their email address is correct.");
        }

        //Ensure user is not starting a conversation with themself
        if (user1.getUserId() == user2.getUserId())
        {
            throw new UserNotFoundException("You cannot start a conversation with yourself!");
        }

        //Check if two patients exist and throw an exception if so
        conversation.throwExceptionIfContainsTwoPatients();

        return conversationRepository.save(conversation);
    }


    public Iterable<Conversation> getConversationsByUserId(long userId)
    {
        //Retrieve the conversations associated with this user from the database
        Iterable<Conversation> conversations = conversationRepository.getConversationsByUserId(userId);
        for (Conversation conv : conversations)
        {
            //Add the first/last names of each user in the conversation to the object
            conv.updateNamesInvolved(userId);
            //Get the names of who is online
            conv.updateUsersOnline();
        }

        //Also, update each conversation with the number of unread messages
        //It's not the fastest solution, though.
        for (Conversation conv : conversations)
        {
            int numberUnread = 0;
            for (Message message : conv.getMessages())
            {
                //If the message is unread by this user...
                if (message.getUnreadByUserIds().contains(userId))
                    numberUnread++;
            }
            conv.setNumberUnread(numberUnread);
        }

        return conversations;
    }

    public int getTotalNumberOfUnreadMessagesByUserId(long userId)
    {
        //Iterate through each conversation this user is involved in
        int totalNumberUnread = 0;
        Iterable<Conversation> conversations = conversationRepository.getConversationsByUserId(userId);
        for (Conversation conv : conversations)
        {
            //Check all their messages to find unreads
            for (Message message : conv.getMessages())
            {
                //If the message is unread by this user...
                if (message.getUnreadByUserIds().contains(userId))
                    totalNumberUnread++;
            }
            conv.setNumberUnread(totalNumberUnread);
        }
        return totalNumberUnread;
    }


    public Message addMessage(long conversationId, long userId, Message message)
    {
        //Tell the message which conversation it belongs to
        Conversation conversation = conversationRepository.findById(conversationId).get();
        message.setConversation(conversation);

        //Tell the message who sent it
        User sender = userRepository.findById(userId).get();
        message.setSender(sender);

        //Also, create a list of user IDs representing which users still need to read the message
        List<Long> unreadByUserIds = new ArrayList<>();
        for (User userInvolved : conversation.getUsersInvolved())
        {
            //If userId is not the sender's ID
            long recipientId = userInvolved.getUserId();
            if (recipientId != userId)
            {
                unreadByUserIds.add(recipientId);
            }
        }
        message.setUnreadByUserIds(unreadByUserIds);

        return messageRepository.save(message);
    }

    public Iterable<Message> getRecentMessages(long conversationId, long viewerId)
    {
        try
        {
            //Retrieve the messages form the database
            List<Message> messages = messageRepository.getRecentMessages(conversationId);
            //Mark the messages as read
            for (Message message : messages)
            {
                message.markAsRead(viewerId);
                //Save the change in read status
                messageRepository.save(message);
            }
            return messages;
        }
        catch (Exception ex)
        {
            System.out.println("Unknown conversation with ID "+conversationId);
            return new ArrayList<Message>();
        }
    }

    public Conversation addUserToConversation(long conversationIdLong, String otherUserEmail)
    {
        //Get the conversation and userToAdd to add from the database
        Conversation conversation = conversationRepository.findById(conversationIdLong).get();
        User userToAdd = userRepository.findByEmail(otherUserEmail);

        //Check if email was valid
        if (userToAdd == null)
            throw new UserNotFoundException("That user could not be found. Ensure their email address is correct.");

        ////Add the user to the conversation if they are not already in it
        if (conversation.getUsersInvolved().contains(userToAdd) == false)
        {
            //Add the user
            conversation.addUserInvolved(userToAdd);

            //Check if two patients exist and throw an exception if so
            conversation.throwExceptionIfContainsTwoPatients();

            conversationRepository.save(conversation);
        }
        else
        {
            throw new UserNotFoundException("That user is already in this conversation");
        }

        //Return the conversation
        return conversation;
    }
}

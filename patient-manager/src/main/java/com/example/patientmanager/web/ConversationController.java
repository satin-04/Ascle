package com.example.patientmanager.web;

import com.example.patientmanager.models.Conversation;
import com.example.patientmanager.models.Message;
import com.example.patientmanager.services.ConversationService;
import com.example.patientmanager.services.ErrorMapValidationService;
import com.example.patientmanager.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController
{
    @Autowired
    private UserService userService;

    @Autowired
    private ConversationService conversationService;

    @Autowired
    private ErrorMapValidationService errorMapValidationService;


    @GetMapping("/view/{conversationId}/{viewerId}")
    public Iterable<Message> getConversationById(@PathVariable String conversationId, @PathVariable String viewerId, Principal principal)
    {
        //Get the messages from the database
        long conversationIdLong = ControllerUtility.parseUserId(conversationId);
        long viewerIdLong = ControllerUtility.parseUserId(viewerId);
        Iterable<Message> messageList = conversationService.getRecentMessages(conversationIdLong, viewerIdLong);
        //Add the name of the sender to each message
        for (Message message : messageList)
        {
            message.updateSenderName();
        }
        return messageList;
    }

    @PostMapping("/sender-{userId}/conversation-{conversationId}")
    public ResponseEntity<?> addMessageToConversation(@Valid @RequestBody Message message,
                                                      BindingResult result,
                                                      @PathVariable String conversationId,
                                                      @PathVariable String userId,
                                                      Principal principal)
    {
        //Return an error if the message was blank
        ResponseEntity<?> errorMap = errorMapValidationService.mapErrors(result);
        if (errorMap != null) return errorMap;

        //Create the message on the database
        long conversationIdLong = ControllerUtility.parseUserId(conversationId);
        long userIdLong = ControllerUtility.parseUserId(userId);
        Message message1 = conversationService.addMessage(conversationIdLong, userIdLong, message);

        return new ResponseEntity<Message>(message1, HttpStatus.CREATED);
    }

    @PostMapping("/create-conversation/{senderId}&{otherUserEmail}")
    public ResponseEntity<?> createConversation(@Valid @RequestBody Conversation conversation,
                                               BindingResult result, @PathVariable String senderId, @PathVariable String otherUserEmail,
                                               Principal principal)
    {
        ResponseEntity<?> errorMap = errorMapValidationService.mapErrors(result);
        if (errorMap != null) return errorMap;

        long senderIdLong = ControllerUtility.parseUserId(senderId);
        Conversation newConversation = conversationService.createConversation(senderIdLong, otherUserEmail, conversation);

        return new ResponseEntity<Conversation>(newConversation, HttpStatus.CREATED);
    }

    @GetMapping("/get-by-user/{userId}")
    public Iterable<Conversation> getConversationsByUserId(@PathVariable String userId, Principal principal)
    {
        long userIdLong = ControllerUtility.parseUserId(userId);
        return conversationService.getConversationsByUserId(userIdLong);
    }

    @GetMapping("/get-number-unread/{userId}")
    public int getTotalNumberOfUnreadMessagesByUserId(@PathVariable String userId, Principal principal)
    {
        long userIdLong = ControllerUtility.parseUserId(userId);
        return conversationService.getTotalNumberOfUnreadMessagesByUserId(userIdLong);
    }

    @PostMapping("/add-user-to-conversation/{conversationId}/{otherUserEmail}")
    public ResponseEntity<?> addUserToConversation(@PathVariable String conversationId, @PathVariable String otherUserEmail, Principal principal)
    {
        long conversationIdLong = ControllerUtility.parseUserId(conversationId);
        Conversation updatedConversation = conversationService.addUserToConversation(conversationIdLong, otherUserEmail);

        return new ResponseEntity<Conversation>(updatedConversation, HttpStatus.CREATED);
    }
}

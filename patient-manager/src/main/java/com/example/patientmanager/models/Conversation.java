package com.example.patientmanager.models;

import com.example.patientmanager.exceptions.UserNotFoundException;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import java.util.*;

@Entity
@Table(name="Conversation")
public class Conversation
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long conversationId;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "userId", nullable = false)
    @JsonIgnore //do not show all user JSON for each conversation
    private List<User> usersInvolved = new ArrayList<>();

    @Transient
    private List<String> namesInvolved = new ArrayList<>();

    @OneToMany(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER, mappedBy = "conversation", orphanRemoval = true)
    private List<Message> messages = new ArrayList<>();

    @Transient
    private int numberUnread = 0;

    private Date lastUpdatedAt;

    @Transient
    private List<String> usersOnline = new ArrayList<>();



    public Conversation() {
    }

    @PrePersist
    public void onCreate()
    {
        refreshLastUpdatedAt();
    }
    @PreUpdate
    public void onUpdate()
    {
        refreshLastUpdatedAt();
    }

    public void refreshLastUpdatedAt()
    {
        lastUpdatedAt = new Date();
    }

    public Long getConversationId() {
        return conversationId;
    }

    public void setConversationId(Long conversationId) {
        this.conversationId = conversationId;
    }

    public List<User> getUsersInvolved() {
        return usersInvolved;
    }

    public void setUsersInvolved(List<User> usersInvolved) {
        this.usersInvolved = usersInvolved;
    }

    public void addUserInvolved(User newUser)
    {
        if (usersInvolved == null) {
            usersInvolved = new ArrayList<>();
        }

        //Add the new user as normal
        usersInvolved.add(newUser);
    }

    public void throwExceptionIfContainsTwoPatients()
    {
        int numberOfPatients = 0;
        for (User u : usersInvolved)
        {
            if (u.getUserType().equals("PAT"))
            {
                numberOfPatients++;
                if (numberOfPatients > 1)
                    throw new UserNotFoundException("Patients may not chat with each other.");
            }
        }
    }

    public List<Message> getMessages() {
        return messages;
    }

    public void setMessages(List<Message> messages) {
        this.messages = messages;
    }

    public List<String> getNamesInvolved() {
        return namesInvolved;
    }

    public void setNamesInvolved(List<String> namesInvolved) {
        this.namesInvolved = namesInvolved;
    }

    public int getNumberUnread() {
        return numberUnread;
    }

    public void setNumberUnread(int numberUnread) {
        this.numberUnread = numberUnread;
    }

    public Date getLastUpdatedAt() {
        return lastUpdatedAt;
    }

    public void setLastUpdatedAt(Date lastUpdatedAt) {
        this.lastUpdatedAt = lastUpdatedAt;
    }

    public List<String> getUsersOnline() {
        return usersOnline;
    }

    public void setUsersOnline(List<String> usersOnline) {
        this.usersOnline = usersOnline;
    }

    public void updateNamesInvolved(long userIdToExclude) {
        //Add a list of the first+last names of each user involved
        //in this conversation to this object
        this.namesInvolved = new ArrayList<String>();
        for (User user : usersInvolved)
        {
            if (user.getUserId() != userIdToExclude) //do not include the user accessing the object
                this.namesInvolved.add(user.getFirstName() + " " + user.getLastName());
        }
    }

    public void updateUsersOnline() {
        //Form a list of users with the online status.
        //Put their first/last names into a list.
        this.usersOnline = new ArrayList<String>();
        for (User user : usersInvolved)
        {
            //Do not include the user accessing the object
            if (user.isOnline())
                this.usersOnline.add(user.getFirstName() + " " + user.getLastName());
        }
    }
}

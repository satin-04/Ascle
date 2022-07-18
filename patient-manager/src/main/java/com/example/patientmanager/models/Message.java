package com.example.patientmanager.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name="T_Message") //"Message" is a reserved table
public class Message
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    @NotBlank(message = "Message cannot be blank")
    private String content;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name = "conversationId", updatable = false, nullable = false)
    @JsonIgnore
    private Conversation conversation;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId", updatable = false, nullable = false)
    @JsonIgnore
    private User sender;

    @Transient
    private String senderName;

    //The userIds of the users who still need to read this message
    @ElementCollection
    private List<Long> unreadByUserIds;



    public Message() {
    }

    @PrePersist
    public void onCreate()
    {
        //When posting a message, update the lastUpdatedAt
        //date of the parent conversation
        conversation.refreshLastUpdatedAt();
    }
    @PreUpdate
    public void onUpdate()
    {
        conversation.refreshLastUpdatedAt();
    }

    public Long getMessageId() {
        return messageId;
    }

    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Conversation getConversation() {
        return conversation;
    }

    public void setConversation(Conversation conversation) {
        this.conversation = conversation;
    }

    public User getSender() {
        return sender;
    }

    public void setSender(User sender) {
        this.sender = sender;
    }

    public String getSenderName() {
        return senderName;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public List<Long> getUnreadByUserIds() {
        return unreadByUserIds;
    }

    public void setUnreadByUserIds(List<Long> unreadByUserIds) {
        this.unreadByUserIds = unreadByUserIds;
    }


    public void markAsRead(long userIdOfReader)
    {
        unreadByUserIds.remove(userIdOfReader);
    }

    public void updateSenderName() {
        //When retrieving the message from the DB, include the sender's first/last
        //name in the result but not the user's entire info
        this.senderName = this.sender.getFirstName() + " " + this.sender.getLastName();
    }
}

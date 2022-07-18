package com.example.patientmanager.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.patientmanager.models.Conversation;
import com.example.patientmanager.models.Message;

import java.util.List;

//NOTE: The table is named "T_Message" because "Message" is a reserved table

@Repository
public interface MessageRepository extends CrudRepository<Message, Long>
{
    @Query(value = "SELECT m FROM Message m " +
            "WHERE m.conversation.conversationId = :conversationId " +
            "ORDER BY m.id")
    List<Message> getRecentMessages(long conversationId);
}

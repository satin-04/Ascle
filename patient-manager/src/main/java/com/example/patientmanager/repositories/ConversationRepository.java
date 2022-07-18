package com.example.patientmanager.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.example.patientmanager.models.Appointment;
import com.example.patientmanager.models.Conversation;

import java.util.Date;
import java.util.List;

@Repository
public interface ConversationRepository extends CrudRepository<Conversation, Long>
{
    //Credit to https://stackoverflow.com/a/12110211 for the sub-query
    @Query("SELECT c from Conversation c WHERE EXISTS " +
            "(SELECT u from Conversation ce LEFT JOIN ce.usersInvolved u WHERE c = ce AND u.id = :userId) " +
            "ORDER BY c.lastUpdatedAt DESC")
    List<Conversation> getConversationsByUserId(long userId);
}
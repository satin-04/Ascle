package com.example.patientmanager.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.patientmanager.models.Appointment;

import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

@Repository
public interface AppointmentRepository extends CrudRepository<Appointment, Long>
{
    @Query("SELECT a FROM Appointment a " +
            "WHERE a.patient.id = :patientId " +
            "ORDER BY a.date ")
    List<Appointment> getAppointmentsByPatientId(long patientId);

    @Query("SELECT a FROM Appointment a " +
            "WHERE a.doctor.id = :doctorId " +
            "AND a.date > :now " +
            "ORDER BY a.date")
    List<Appointment> getAppointmentsByDoctorId(long doctorId, Date now);
}


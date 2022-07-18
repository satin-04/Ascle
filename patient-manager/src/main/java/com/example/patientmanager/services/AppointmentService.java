package com.example.patientmanager.services;

import com.example.patientmanager.exceptions.UserNotFoundException;
import com.example.patientmanager.models.Appointment;
import com.example.patientmanager.models.Doctor;
import com.example.patientmanager.models.Patient;
import com.example.patientmanager.repositories.AppointmentRepository;
import com.example.patientmanager.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AppointmentService
{
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    public Appointment addAppointment(long doctorId, Appointment appointment, String username)
    {
        try
        {
            //Pair the appointment with the patient...
            Patient patient = (Patient) userRepository.findByEmail(username);
            appointment.setPatient(patient);

            //Pair the appointment with the doctor...
            //Calling get() retrieves the actual User from the repos
            Doctor doctor = (Doctor) userRepository.findById(doctorId).get();
            appointment.setDoctor(doctor);

            return appointmentRepository.save(appointment);
        }
        catch (Exception ex)
        {
            throw new UserNotFoundException("The patient or doctor could not be found.");
        }

    }

    public Iterable<Appointment> getAppointmentsByPatientId(long patientId, String username)
    {
        return appointmentRepository.getAppointmentsByPatientId(patientId);
    }

    public Iterable<Appointment> getAppointmentsByDoctorId(long doctorId)
    {
        Date now = new Date(); //pass in the current time to only show upcoming Appointments
        return appointmentRepository.getAppointmentsByDoctorId(doctorId, now);
    }
}

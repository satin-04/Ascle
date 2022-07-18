package com.example.patientmanager.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Table(name="Appointment")
public class Appointment
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long appointmentId;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH) //refresh updates the Patient when an Appointment has been deleted
    @JoinColumn(name="patientId")
    //@JsonIgnore //fixes infinite recursion with relationship setting
    private Patient patient; //reference to the patient who will attend this appt.

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REFRESH) //refresh updates the Doctor when an Appointment has been deleted
    @JoinColumn(name="doctorId")
    //@JsonIgnore //fixes infinite recursion with relationship setting
    private Doctor doctor; //reference to the doctor hosting this appt.

    //@JsonFormat(pattern="MM/dd/yyyy h:mm a")
    private Date date; //time and date when the appointment is scheduled

    public Appointment() {
    }

    public Long getAppointmentId() {
        return appointmentId;
    }

    public void setAppointmentId(Long appointmentId) {
        this.appointmentId = appointmentId;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Doctor getDoctor() {
        return doctor;
    }

    public void setDoctor(Doctor doctor) {
        this.doctor = doctor;
    }
}

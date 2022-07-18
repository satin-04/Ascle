package com.example.patientmanager.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Doctor")
@DiscriminatorValue("DOC")
public class Doctor extends User
{
    @OneToMany(mappedBy="doctor")
    @JsonIgnore
    private List<Appointment> appointments = new ArrayList<>();

    @Column(name = "specialization", unique = false)
    @NotBlank(message = "Specialization cannot be blank")
    private String specialization;

    @Column(name = "hospitalName")
    @NotBlank(message = "Hospital name cannot be blank")
    private String hospitalName;

    @Column(name = "latitude", unique = false)
    @NotNull(message = "Address is required")
    private double latitude;

    @Column(name = "longitude", unique = false)
    @NotNull(message = "Address is required")
    private double longitude;

    private boolean supportsCovidCare = false;

    public Doctor() {
        this.setUserType("DOC");
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getHospitalName() {
        return hospitalName;
    }

    public void setHospitalName(String hospitalName) {
        this.hospitalName = hospitalName;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public boolean isSupportsCovidCare() {
        return supportsCovidCare;
    }

    public void setSupportsCovidCare(boolean supportsCovidCare) {
        this.supportsCovidCare = supportsCovidCare;
    }
}

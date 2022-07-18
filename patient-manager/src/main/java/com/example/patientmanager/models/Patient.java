package com.example.patientmanager.models;

import com.example.patientmanager.repositories.UserRepository;
import com.example.patientmanager.services.InsurancePackageService;
import com.example.patientmanager.services.UserService;
import com.fasterxml.jackson.annotation.JsonIgnore;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import javax.persistence.*;
import javax.validation.constraints.Digits;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Patient")
@DiscriminatorValue("PAT")
public class Patient extends User
{
    @OneToMany(mappedBy="patient")
    @JsonIgnore
    private List<Appointment> appointments = new ArrayList<>();

    @Column(name = "age", nullable = true, unique = false)
    private int age;

    @Column(name = "height", nullable = true, unique = false)
    private int height;

    @Column(name = "weight", nullable = true, unique = false)
    private int weight;

    @Column(name = "isSmoking", nullable = false, unique = false)
    private boolean isSmoking;

    @Column(name = "isDrinking", nullable = false, unique = false)
    private boolean isDrinking;

    @Column(name = "medicalHistory", nullable = true, unique = false)
    private String medicalHistory;

    @Column(name = "allergies", nullable = true, unique = false)
    private String allergies;

    @Column(name = "latitude", nullable = true, unique = false)
    private double latitude;

    @Column(name = "longitude", nullable = true, unique = false)
    private double longitude;

    @OneToMany(mappedBy="patientsList")
    @JsonIgnore
    private List<InsurancePackage> insurancePackagesList = new ArrayList<>();


    public Patient() {
        this.setUserType("PAT");
    }

    //When creating a patient, add default values
    private void addDefaultValues()
    {
        if (this.medicalHistory == null || this.medicalHistory.equals(""))
            this.medicalHistory = "Not provided";
        if (this.allergies == null || this.allergies.equals(""))
            this.allergies = "None";
    }
    @PrePersist
    protected void onCreate()
    {
        this.addDefaultValues();
    }
    @PreUpdate
    protected void onUpdate()
    {
        this.addDefaultValues();
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public String getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }

    public String getAllergies() {
        return allergies;
    }

    public void setAllergies(String allergies) {
        this.allergies = allergies;
    }

    public List<InsurancePackage> getInsurancePackagesList() {
        return insurancePackagesList;
    }

    public void setInsurancePackagesList(List<InsurancePackage> insurancePackagesList) {
        this.insurancePackagesList = insurancePackagesList;
    }

    public boolean isSmoking() {
        return isSmoking;
    }

    public void setSmoking(boolean smoking) {
        isSmoking = smoking;
    }

    public boolean isDrinking() {
        return isDrinking;
    }

    public void setDrinking(boolean drinking) {
        isDrinking = drinking;
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

    public List<InsurancePackage> addInsurancePackage(InsurancePackage insurancePackage)
    {
        if (insurancePackagesList == null)
            this.insurancePackagesList = new ArrayList<>();
        this.insurancePackagesList.add(insurancePackage);
        return this.insurancePackagesList;
    }

    public List<InsurancePackage> removeInsurancePackage(InsurancePackage insurancePackage)
    {
        this.insurancePackagesList.remove(insurancePackage);
        return this.insurancePackagesList;
    }
}

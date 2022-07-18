package com.example.patientmanager.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.*;

@Entity
@Table(name = "Insurer")
@DiscriminatorValue("INS")
public class Insurer extends User
{
    @Column(name = "firmName", nullable = false, unique = false)
    @NotBlank(message = "Company name cannot be blank")
    private String firmName;

    @ManyToMany
    public List<InsurancePackage> insurancePackagesList = new ArrayList<>();


    public Insurer() {
        this.setUserType("INS");
    }

    public String getFirmName() {
        return firmName;
    }

    public void setFirmName(String firmName) {
        this.firmName = firmName;
    }

    public List<InsurancePackage> getInsurancePackageList() {
        return insurancePackagesList;
    }

    public void setInsurancePackageList(List<InsurancePackage> offerings)
    {
        this.insurancePackagesList = offerings;
    }

    public List<InsurancePackage> addInsurancePackage(InsurancePackage thisInsurancePackage, List<InsurancePackage> insurancePackages)
    {
        if (insurancePackagesList == null)
            this.insurancePackagesList = new ArrayList<>();
        this.insurancePackagesList.add(thisInsurancePackage);
        return insurancePackages;
    }

    /*public void addRecommendations(Patient patient, InsurancePackage thisPackage)
    {
        patient.recommendations.add(thisPackage);
    }

    public void removeRecommendations(Patient patient, InsurancePackage thisPackage)
    {
        patient.recommendations.remove(thisPackage);
    }

    public void setRecommendations(Patient patient, List<InsurancePackage> insurerRecommendations)
    {
        patient.setRecommendations(insurerRecommendations);
    }*/

    public List<InsurancePackage> getInsurancePackagesList() {
        return insurancePackagesList;
    }

    public void setInsurancePackagesList(List<InsurancePackage> insurancePackagesList) {
        this.insurancePackagesList = insurancePackagesList;
    }
}

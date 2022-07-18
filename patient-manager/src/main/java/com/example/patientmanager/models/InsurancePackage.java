package com.example.patientmanager.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.*;

@Entity
@Table
public class InsurancePackage
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long insurancePackageId;

    private String firmName;

    private String packageName;

    @Column(name = "isRecommendation", nullable = false)
    private boolean isRecommendation;

    //Below are the details for a standard insurance package

    public String packageDetails; // contains details and/or comments that the insurer feels is relevant

    public double premium,
            deductible,
            copayment,
            coInsurance,
            maximumOutOfPocket;
    // premium = monthly payment
    // deductible = deductible is how much you’ll pay for a covered procedure before your insurance starts to pay,
    // copayment = fixed amount that you pay for a specific service or prescription medication.
    // coinsurance = it’s a percentage of the cost that you pay for covered services.
    // maximum out of pocket = out-of-pocket limit, is the most you’d ever have to pay for covered health care services in a year.

    @ManyToOne(optional = true, fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name="insurerId")
    @JsonIgnore
    private Insurer insurer; //reference to the insurer who created this package

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REFRESH)
    @JoinColumn(name="patientId")
    @JsonIgnore
    private List<Patient> patientsList; //reference to the patient holding this package


    public InsurancePackage() {
    }

    //When creating an InsurancePackage, add default values
    @PrePersist
    protected void onCreate()
    {
        if (this.packageDetails == null || this.packageDetails.equals(""))
            this.packageDetails = "N/A";
    }

    public void setPackageName(String packageName)
    {
        this.packageName = packageName;
    }

    public String getPackageName() { return packageName; }

    public Long getInsurancePackageId() {
        return insurancePackageId;
    }

    public void setInsurancePackageId(Long insurancePackageId) {
        this.insurancePackageId = insurancePackageId;
    }

    public String getPackageDetails() {
        return packageDetails;
    }

    public void setPackageDetails(String packageDetails) {
        this.packageDetails = packageDetails;
    }

    public double getPremium() { return premium; }

    public void setPremium(double premium) {
        this.premium = premium;
    }

    public double getDeductible() {
        return deductible;
    }

    public void setDeductible(double deductible) {
        this.deductible = deductible;
    }

    public double getCopayment() {
        return copayment;
    }

    public void setCopayment(double copayment) {
        this.copayment = copayment;
    }

    public double getCoInsurance() {
        return coInsurance;
    }

    public void setCoInsurance(double coInsurance) {
        this.coInsurance = coInsurance;
    }

    public double getMaximumOutOfPocket() {
        return maximumOutOfPocket;
    }

    public void setMaximumOutOfPocket(double maximumOutOfPocket) {
        this.maximumOutOfPocket = maximumOutOfPocket;
    }

    public String getFirmName() {
        return firmName;
    }

    public void setFirmName(String firmName) {
        this.firmName = firmName;
    }

    public void setInsurancePackageId(long insurancePackageId) {
        this.insurancePackageId = insurancePackageId;
    }

    public Insurer getInsurer() {
        return insurer;
    }

    public void setInsurer(Insurer insurer) {
        this.insurer = insurer;
    }

    public List<Patient> getPatientsList() {
        return patientsList;
    }

    public void setPatientsList(List<Patient> patientsList) {
        this.patientsList = patientsList;
    }

    public void addPatient(Patient patient) {
        if (patientsList == null)
            this.patientsList = new ArrayList<>();
        if (patientsList.contains(patient) == false)
            this.patientsList.add(patient);
    }

    public void removePatient(Patient patient) {
        if (patientsList != null)
            this.patientsList.remove(patient);
    }

    public boolean isRecommendation() {
        return isRecommendation;
    }

    public void setRecommendation(boolean recommendation) {
        isRecommendation = recommendation;
    }

    /**
     * Creates and returns the default package given to patients upon account creation.
     * This method does not persist the package on its own.
     */
    public static InsurancePackage createNewDefaultPackage()
    {
        InsurancePackage newPackage = new InsurancePackage();
        newPackage.setInsurancePackageId(Integer.MAX_VALUE);
        newPackage.firmName = "Vita Insurance";
        newPackage.packageName = "Default Insurance Package";
        newPackage.isRecommendation = false;
        newPackage.packageDetails = "This is the default package given to you for creating an account with Vita. It provides coverage for one person.";
        newPackage.premium = 475.0;
        newPackage.deductible = 4600.0;
        newPackage.copayment = 0;
        newPackage.coInsurance = 0.18;
        newPackage.maximumOutOfPocket = 8100;

        return newPackage;
    }
}

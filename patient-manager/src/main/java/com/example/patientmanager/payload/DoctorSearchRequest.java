package com.example.patientmanager.payload;



public class DoctorSearchRequest
{
    private String keywords;

    private String specialization;

    //private long latitude;

    //private long longitude;

    //private int maxRadius = Integer.MAX_VALUE;

    private boolean supportsCovidCare;

    public DoctorSearchRequest() {
    }

    public String getKeywords() {
        return keywords;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public boolean isSupportsCovidCare() {
        return supportsCovidCare;
    }

    public void setSupportsCovidCare(boolean supportsCovidCare) {
        this.supportsCovidCare = supportsCovidCare;
    }
}

package com.example.patientmanager.exceptions;

public class InsurancePackageAlreadyHeldExceptionResponse
{
    private String alreadyHeld;

    public InsurancePackageAlreadyHeldExceptionResponse(String alreadyHeld) {
        this.alreadyHeld = alreadyHeld;
    }

    public String getAlreadyHeld() {
        return alreadyHeld;
    }

    public void setAlreadyHeld(String alreadyHeld) {
        this.alreadyHeld = alreadyHeld;
    }
}

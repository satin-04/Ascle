package com.example.patientmanager.exceptions;

public class EmailTakenExceptionResponse
{
    private String email;

    public EmailTakenExceptionResponse(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}

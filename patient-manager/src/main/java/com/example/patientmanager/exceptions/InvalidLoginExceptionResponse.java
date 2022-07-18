package com.example.patientmanager.exceptions;

public class InvalidLoginExceptionResponse
{
    private String email;
    private String password;

    public InvalidLoginExceptionResponse()
    {
        this.email = "Email and password do not match";
        this.password = "Email and password do not match";
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}

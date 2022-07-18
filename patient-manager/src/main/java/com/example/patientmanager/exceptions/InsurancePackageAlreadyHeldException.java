package com.example.patientmanager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class InsurancePackageAlreadyHeldException extends RuntimeException
{
    public InsurancePackageAlreadyHeldException(String message) {
        super(message);
    }
}

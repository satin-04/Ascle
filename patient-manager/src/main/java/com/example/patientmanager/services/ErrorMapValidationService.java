package com.example.patientmanager.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

/**
 * Significant credit to Agile Intelligence: https://github.com/AgileIntelligence/AgileIntPPMTool/
 */
@Service
public class ErrorMapValidationService
{

    public ResponseEntity<?> mapErrors(BindingResult result)
    {
        if (result.hasErrors())
        {
            Map<String, String> errorMap = new HashMap<>();

            for (FieldError error: result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<Map<String, String>>(errorMap, HttpStatus.BAD_REQUEST);
        }

        return null;
    }
}

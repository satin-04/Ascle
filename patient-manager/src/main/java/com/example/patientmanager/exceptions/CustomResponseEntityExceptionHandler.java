package com.example.patientmanager.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;


/**
 * Credit to https://github.com/AgileIntelligence/AgileIntPPMTool/
 * for the method logic in this class.
 */
@RestController
@ControllerAdvice
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler
{
    //Username taken
    @ExceptionHandler
    public final ResponseEntity<Object> handleUsernameTakenException(EmailTakenException ex, WebRequest request)
    {
        EmailTakenExceptionResponse exceptionResponse = new EmailTakenExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    //Find User by ID failed
    @ExceptionHandler
    public final ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException ex, WebRequest request)
    {
        UserNotFoundExceptionResponse exceptionResponse = new UserNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    //Incorrect login credentials
    @ExceptionHandler
    public final ResponseEntity<Object> handleInvalidLoginException(InvalidLoginException ex, WebRequest request)
    {
        InvalidLoginExceptionResponse exceptionResponse = new InvalidLoginExceptionResponse();
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    //Incorrect role
    @ExceptionHandler
    public final ResponseEntity<Object> handlePermissionDeniedException(PermissionDeniedException ex, WebRequest request)
    {
        PermissionDeniedExceptionResponse exceptionResponse = new PermissionDeniedExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    //Patient already has insurance package
    @ExceptionHandler
    public final ResponseEntity<Object> handleInsurancePackageAlreadyHeldException(InsurancePackageAlreadyHeldException ex, WebRequest request)
    {
        InsurancePackageAlreadyHeldExceptionResponse exceptionResponse = new InsurancePackageAlreadyHeldExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}

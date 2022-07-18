package com.example.patientmanager.web;

import com.example.patientmanager.exceptions.InvalidLoginException;
import com.example.patientmanager.exceptions.UserNotFoundException;
import com.example.patientmanager.models.*;
import com.example.patientmanager.payload.DoctorSearchRequest;
import com.example.patientmanager.payload.JwtLoginSuccessResponse;
import com.example.patientmanager.payload.LoginRequest;
import com.example.patientmanager.security.JwtTokenProvider;
import com.example.patientmanager.services.ErrorMapValidationService;
import com.example.patientmanager.services.InsurancePackageService;
import com.example.patientmanager.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.example.patientmanager.security.SecurityConstants.TOKEN_PREFIX;

import java.security.Principal;

@RestController
@RequestMapping("/api/account")
public class UserController
{
    @Autowired
    private UserService userService;

    @Autowired
    private InsurancePackageService insurancePackageService; //for use in adding the default package to new patients

    @Autowired
    private ErrorMapValidationService errorMapValidationService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;


    /**
     * Registers a new user to the database.
     * @param doctor the JSON data used to create a new account
     * @param result contains Spring validation errors
     * @return the new user as JSON or errors JSON
     */
    @PostMapping("/create-doctor")
    public ResponseEntity<?> createNewDoctor(@Valid @RequestBody Doctor doctor, BindingResult result)
    {
        //Return errors if the exist
        ResponseEntity<?> errorMap = errorMapValidationService.mapErrors(result);
        if (errorMap != null) return errorMap;

        //Persist the user
        Doctor newDoctor = (Doctor) userService.saveOrUpdateUser(doctor);
        return new ResponseEntity<User>(newDoctor, HttpStatus.CREATED);
    }

    /**
     * Registers a new user to the database.
     * @param patient the JSON data used to create a new account
     * @param result contains Spring validation errors
     * @return the new user as JSON or errors JSON
     */
    @PostMapping("/create-patient")
    public ResponseEntity<?> createNewPatient(@Valid @RequestBody Patient patient, BindingResult result)
    {
        //Return errors if the annotations in User class cause them
        ResponseEntity<?> errorMap = errorMapValidationService.mapErrors(result);
        if (errorMap != null) return errorMap;

        //Create and save the patient
        Patient newPatient = (Patient) userService.saveOrUpdateUser(patient);

        //Create a default insurance package especially for this new patient
        InsurancePackage defaultPackage = InsurancePackage.createNewDefaultPackage();
        //Save the default package
        defaultPackage = insurancePackageService.createInsurancePackage(defaultPackage, null);
        //Add the default package to this new user
        insurancePackageService.saveInsurancePackageToPatient(defaultPackage.getInsurancePackageId(),
                newPatient.getEmail(), false);

        return new ResponseEntity<Patient>(newPatient, HttpStatus.CREATED);
    }

    /**
     * Registers a new user to the database.
     * @param insurer the JSON data used to create a new account
     * @param result contains Spring validation errors
     * @return the new user as JSON or errors JSON
     */
    @PostMapping("/create-insurer")
    public ResponseEntity<?> createNewInsurer(@Valid @RequestBody Insurer insurer, BindingResult result)
    {
        //Return errors if the annotations in User class cause them
        ResponseEntity<?> errorMap = errorMapValidationService.mapErrors(result);
        if (errorMap != null) return errorMap;

        Insurer newInsurer = (Insurer) userService.saveOrUpdateUser(insurer);
        return new ResponseEntity<Insurer>(newInsurer, HttpStatus.CREATED);
    }

    @GetMapping("/all-doctors")
    public Iterable<Doctor> getAllDoctors(){return userService.getAllDoctors();}

    @PostMapping("/search-doctors")
    public ResponseEntity<?> getDoctorsByFilter(@Valid @RequestBody DoctorSearchRequest filter)
    {
        Iterable<Doctor> filteredDoctors = userService.getDoctorsByFilter(filter);
        return ResponseEntity.ok(filteredDoctors);
    }

    @GetMapping("/doctor-specializations")
    public Iterable<String> getAllSpecializations()
    {
        return userService.getAllSpecializations();
    }

    //Get all patients from the database
    @GetMapping("/all-patients")
    public Iterable<Patient> getAllPatients(){return userService.getAllPatients();}

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable String userId)
    {
        long userIdLong = ControllerUtility.parseUserId(userId);
        return userService.findUserById(userIdLong);
    }

    /**
     * Returns a JWT token to login.
     * Significant credit to Agile Intelligence: https://github.com/AgileIntelligence/AgileIntPPMTool/
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result)
    {
        //Return errors if the exist
        ResponseEntity<?> errorMap = errorMapValidationService.mapErrors(result);
        if (errorMap != null) return errorMap;

        try //Attempt to login with the provided username and password
        {
            //Authenticate the login credentials
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            //Prepare the JWT token
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = TOKEN_PREFIX + jwtTokenProvider.generateToken(authentication);

            return ResponseEntity.ok(new JwtLoginSuccessResponse(true, jwt));
        }
        catch (Exception ex)
        {
            throw new InvalidLoginException("Invalid credentials");
        }
    }

    @PostMapping("/give-user-online-status/{userId}")
    public ResponseEntity<?> giveUserOnlineStatus(@PathVariable String userId)
    {
        //Parse the IDs from the URL
        long userIdLong = ControllerUtility.parseUserId(userId);
        //Adjust the user's online status boolean
        userService.updateUserOnlineStatus(userIdLong, true);
        return new ResponseEntity<String>("User ID "+userId+" is now online", HttpStatus.OK);
    }

    @PostMapping("/give-user-offline-status/{userId}")
    public ResponseEntity<?> giveUserOfflineStatus(@PathVariable String userId)
    {
        //Parse the IDs from the URL
        long userIdLong = ControllerUtility.parseUserId(userId);
        //Adjust the user's online status boolean
        userService.updateUserOnlineStatus(userIdLong, false);
        return new ResponseEntity<String>("User ID "+userId+" is now offline", HttpStatus.OK);
    }
}

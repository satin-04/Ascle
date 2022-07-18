package com.example.patientmanager.web;

import com.example.patientmanager.models.InsurancePackage;
import com.example.patientmanager.services.InsurancePackageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;


@RestController
@RequestMapping(path = "/api/insurance")
public class InsurancePackageController
{
    @Autowired
    private InsurancePackageService insurancePackageService;


    //Get every package from the database
    @GetMapping("/all-insurance-packages")
    public Iterable<InsurancePackage> getAllInsurancePackages()
    {
        return insurancePackageService.getAllInsurancePackages();
    }

    //Get all packages that the insurer offers or has created
    @GetMapping("/get-by-insurer/{insurerId}")
    public List<InsurancePackage> getInsurancePackagesByInsurerId(@PathVariable String insurerId, Principal principal)
    {
        long userIdLong = ControllerUtility.parseUserId(insurerId);
        return insurancePackageService.getInsurancePackagesByInsurerId(userIdLong, principal.getName());
    }

    //Get every package held by the patient regardless of whether it is a recommendation
    @GetMapping("/get-by-patient/{patientId}")
    public List<InsurancePackage> getInsurancePackagesByPatientId(@PathVariable String patientId, Principal principal)
    {
        long userIdLong = ControllerUtility.parseUserId(patientId);
        return insurancePackageService.getInsurancePackagesByPatientId(userIdLong, principal.getName());
    }

    //Lets an insurer create an insurance package
    @PostMapping("/create-insurance-package/")
    public ResponseEntity<?> createInsurancePackage(@RequestBody InsurancePackage insurancePackage, Principal principal)
    {
        insurancePackage = insurancePackageService.createInsurancePackage(insurancePackage, principal.getName());
        return new ResponseEntity<InsurancePackage>(insurancePackage, HttpStatus.CREATED);
    }

    //Lets a patient acquire an insurance package
    @PostMapping("/add-insurance-package/package-{packageId}/")
    public ResponseEntity<?> addInsurancePackageToPatient(@PathVariable String packageId, Principal principal)
    {
        //Parse the IDs from the URL
        long packageIdLong = ControllerUtility.parseUserId(packageId);
        //Add the insurance package to the target patient
        InsurancePackage insurancePackage = insurancePackageService.saveInsurancePackageToPatient(packageIdLong, principal.getName(), false);
        return new ResponseEntity<InsurancePackage>(insurancePackage, HttpStatus.OK);
    }

    //Lets an insurer add a package to a patient's recommended list
    @PostMapping("/recommend-insurance-package/package-{packageId}/patient-{patientEmail}/")
    public ResponseEntity<?> recommendInsurancePackageToPatient(@PathVariable String packageId, @PathVariable String patientEmail, Principal principal)
    {
        //Parse the IDs from the URL
        long packageIdLong = ControllerUtility.parseUserId(packageId);
        //Add the insurance package to the target patient
        InsurancePackage insurancePackage = insurancePackageService.saveInsurancePackageToPatient(packageIdLong, patientEmail, true);
        return new ResponseEntity<InsurancePackage>(insurancePackage, HttpStatus.OK);
    }

    //Lets a patient remove an insurance package from their recommendations
    @DeleteMapping("/decline-insurance-recommendation/package-{packageId}/")
    public ResponseEntity<?> declineInsurancePackageRecommendation(@PathVariable String packageId, Principal principal)
    {
        //Parse the IDs from the URL
        long packageIdLong = ControllerUtility.parseUserId(packageId);
        //Remove the package from the patient's recommended list
        List<InsurancePackage> updatedList = insurancePackageService.removeInsurancePackageFromPatient(packageIdLong, principal.getName());
        return new ResponseEntity<String>("Recommendation successfully declined", HttpStatus.OK);
    }

    //Lets a patient accept an insurance package from their recommendations
    @PatchMapping("/accept-insurance-recommendation/package-{packageId}/")
    public ResponseEntity<?> acceptInsurancePackageRecommendation(@PathVariable String packageId, Principal principal)
    {
        //Parse the IDs from the URL
        long packageIdLong = ControllerUtility.parseUserId(packageId);
        //Update the InsurancePackage so that it is no longer a recommendation but still held
        insurancePackageService.acceptInsurancePackageRecommendation(packageIdLong, principal.getName());
        return new ResponseEntity<String>("Recommendation accepted by "+principal.getName()+"!", HttpStatus.OK);
    }

}

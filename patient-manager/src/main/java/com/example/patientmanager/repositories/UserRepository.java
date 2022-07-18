package com.example.patientmanager.repositories;

import com.example.patientmanager.models.Doctor;
import com.example.patientmanager.models.InsurancePackage;
import com.example.patientmanager.models.Patient;
import com.example.patientmanager.models.User;
import com.example.patientmanager.payload.DoctorSearchRequest;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Long>
{
    @Query("SELECT u FROM User u " +
            "WHERE u.email = :email")
    User findByEmail(String email);

    @Query("SELECT d FROM Doctor d")
    Iterable<Doctor> getAllDoctors();

    @Query("SELECT d.specialization FROM Doctor d")
    Iterable<String> getAllSpecializations();

    @Query(value="SELECT d FROM Doctor d WHERE " +
            "(" + /*Check for key words*/
                "d.firstName LIKE CONCAT('%', :#{#filter.keywords}, '%') " +
                "OR d.lastName LIKE CONCAT('%', :#{#filter.keywords}, '%') " +
                "OR d.hospitalName LIKE CONCAT('%', :#{#filter.keywords}, '%') " +
                "OR d.specialization LIKE CONCAT('%', :#{#filter.keywords}, '%') " +
            ") " +
            "AND (" + /*Doctor must support COVID care if the user requests it*/
                ":#{#filter.supportsCovidCare} = d.supportsCovidCare " +
                "OR :#{#filter.supportsCovidCare} = false" +
            ")" +
            "AND (" + /*Specialization must match the filter if the user specifies it*/
                ":#{#filter.specialization} = ''" +
                "OR :#{#filter.specialization} = d.specialization" +
            ")")
    Iterable<Doctor> getDoctorsByFilter(DoctorSearchRequest filter);

    @Query("SELECT p FROM Patient p")
    Iterable<Patient> getAllPatients();
}
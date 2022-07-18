package com.example.patientmanager.services;

import com.example.patientmanager.exceptions.EmailTakenException;
import com.example.patientmanager.exceptions.UserNotFoundException;
import com.example.patientmanager.models.Doctor;
import com.example.patientmanager.models.InsurancePackage;
import com.example.patientmanager.models.Patient;
import com.example.patientmanager.models.User;
import com.example.patientmanager.payload.DoctorSearchRequest;
import com.example.patientmanager.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService
{
    @Autowired
    UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;


    public User saveOrUpdateUser(User user)
    {
        try
        {
            //Check if the user already exists
            if (user.getUserId() != null) //Existing user
            {
                //Retrieve the old user data from the database
                User oldUserData = userRepository.findById(user.getUserId()).get();
                //Use the old password again
                user.setPassword(oldUserData.getPassword());
            }
            else //New user
            {
                //Encode the password
                user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            }

            //Throw error if username taken
            user.setUsername(user.getUsername());

            //Save the user
            return userRepository.save(user);
        }
        catch (Exception ex)
        {
            //Show an error if the username is taken
            throw new EmailTakenException(
                    "The email '" + user.getEmail() + "' is already registered");
        }
    }

    public Iterable<Doctor> getAllDoctors()
    {
        return userRepository.getAllDoctors();
    }

    public User findUserById(long id)
    {
        try
        {
            return userRepository.findById(id).get();
        }
        catch (Exception ex)
        {
            throw new UserNotFoundException("User with ID '"+id+"' not found");
        }
    }

    public Iterable<Doctor> getDoctorsByFilter(DoctorSearchRequest filter)
    {
        return userRepository.getDoctorsByFilter(filter);
    }

    public Iterable<String> getAllSpecializations()
    {
        return userRepository.getAllSpecializations();
    }

    public Iterable<Patient> getAllPatients()
    {
        return userRepository.getAllPatients();
    }

    public void updateUserOnlineStatus(long userId, boolean isOnline)
    {
        //Make the user online or offline, then save that to the database
        User user = userRepository.findById(userId).get();
        user.setOnline(isOnline);
        userRepository.save(user);
    }
}

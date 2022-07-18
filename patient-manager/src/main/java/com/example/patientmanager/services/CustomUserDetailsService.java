package com.example.patientmanager.services;

import com.example.patientmanager.models.User;
import com.example.patientmanager.repositories.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService
{
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException
    {
        try {
            return userRepository.findByEmail(email);
        }
        catch (Exception ex) {
            throw new UsernameNotFoundException("User with email '"+email+"' not found");
        }
    }

    @Transactional
    public User loadUserById(Long id)
    {
        try {
            return userRepository.findById(id).get();
        }
        catch (Exception ex) {
            throw new UsernameNotFoundException("User with ID '"+id+"' not found");
        }

    }
}
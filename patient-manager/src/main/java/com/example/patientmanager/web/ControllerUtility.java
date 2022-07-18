package com.example.patientmanager.web;

import com.example.patientmanager.exceptions.UserNotFoundException;

public class ControllerUtility
{
    /**
     * Converts a URL parameter to a long
     */
    public static long parseUserId(String id)
    {
        try
        {
            return Long.parseLong(id);
        }
        catch (NumberFormatException ex)
        {
            throw new UserNotFoundException("Invalid ID");
        }
    }
}

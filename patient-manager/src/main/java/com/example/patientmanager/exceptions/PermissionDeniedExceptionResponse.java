package com.example.patientmanager.exceptions;

public class PermissionDeniedExceptionResponse
{
    private String permissionDenied;

    public PermissionDeniedExceptionResponse(String permissionDenied) {
        this.permissionDenied = permissionDenied;
    }

    public String getPermissionDenied() {
        return permissionDenied;
    }

    public void setPermissionDenied(String permissionDenied) {
        this.permissionDenied = permissionDenied;
    }
}

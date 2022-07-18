package com.example.patientmanager.security;

/**
 * Based on code written by Agile Intelligence: https://github.com/AgileIntelligence/AgileIntPPMTool/
 */
public class SecurityConstants
{
    public static final String H2_URL = "h2-console/**";
    public static final String SECRET ="SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 1800_000; //30 minutes: bad practice, but we do not have a way to refresh tokens FIXME
}
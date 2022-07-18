package com.example.patientmanager.security;

import io.jsonwebtoken.*;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.example.patientmanager.models.User;

import static com.example.patientmanager.security.SecurityConstants.SECRET;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Significant credit to Agile Intelligence: https://github.com/AgileIntelligence/AgileIntPPMTool/
 */
@Component
public class JwtTokenProvider
{
    //Generate the token
    public String generateToken(Authentication authentication)
    {
        User user = (User) authentication.getPrincipal();
        Date now = new Date(System.currentTimeMillis());
        Date expiryDate = new Date(now.getTime() + SecurityConstants.EXPIRATION_TIME);

        String userId = Long.toString(user.getUserId());
        Map<String, Object> claims = new HashMap();
        claims.put("userId", userId);
        claims.put("email", user.getEmail());
        claims.put("userType", user.getUserType());

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    //Validate the token
    public boolean validateToken(String token)
    {
        try
        {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token);
            return true;
        }
        catch (SignatureException ex)
        {
            System.out.println("Invalid JWT signature");
        }
        catch (MalformedJwtException ex)
        {
            System.out.println("Invalid JWT token");
        }
        catch (ExpiredJwtException ex)
        {
            System.out.println("Expired JWT token");
        }
        catch (UnsupportedJwtException ex)
        {
            System.out.println("Unsupported JWT token");
        }
        catch (IllegalArgumentException ex)
        {
            System.out.println("JWT claims string is empty");
        }
        return false;
    }


    //Get User ID from the JWT token
    public Long getUserIdFromJwt(String token)
    {
        Claims claims = Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token).getBody();
        String userId = (String) claims.get("userId");

        return Long.parseLong(userId);
    }
}

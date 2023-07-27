package com.example.backend.Services.JwtService;

import com.example.backend.Entity.Users;

import java.security.Key;

public interface JwtService {
    String generateJWTToken(Users users);

    String generateJWTRefreshoken(Users users);

    Key getSigningKey();

    String extractUserFromJwt(String token);

    boolean validateToken(String token);
}

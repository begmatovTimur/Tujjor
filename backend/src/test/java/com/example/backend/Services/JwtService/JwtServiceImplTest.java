package com.example.backend.Services.JwtService;

import com.example.backend.Entity.User;
import com.example.backend.Services.AuthService.AuthServiceImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class JwtServiceImplTest {
    @Mock
    JwtServiceImpl jwtService;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        jwtService = new JwtServiceImpl();
    }

    @Test
    void itShouldGenerateJWTToken() {
// Arrange
        User mockUser = new User();
        UUID userId = UUID.randomUUID();
        mockUser.setId(userId);
        mockUser.setUsername("123456789");
        mockUser.setPhone("123456789");
        mockUser.setPassword("123456789");

        JwtServiceImpl jwtService = new JwtServiceImpl();

        // Act
        String token = jwtService.generateJWTToken(mockUser);
        String accessToken = token;

        // Assert
        assertNotNull(token);

        String s = jwtService.extractUserFromJwt(token);
        String id = s;

        assertEquals(accessToken, token);
        assertEquals(id, s);
        assertEquals(id, s);
        assertEquals(mockUser.getId(), userId);
    }

    @Test
    void itShouldGenerateJWTRefreshToken() {
        // Arrange
        User mockUser = new User();
        UUID userId = UUID.randomUUID();
        mockUser.setId(userId);
        mockUser.setUsername("123456789");
        mockUser.setPhone("123456789");
        mockUser.setPassword("123456789");

        JwtServiceImpl jwtService = new JwtServiceImpl();

        // Act
        String token = jwtService.generateJWTRefreshToken(mockUser);
        String refreshToken = token;

        // Assert
        assertNotNull(token);

        String s = jwtService.extractUserFromJwt(token);
        String id = s;

        assertEquals(refreshToken, token);
        assertEquals(id, s);
        assertEquals(id, s);
        assertEquals(mockUser.getId(), userId);
    }

    @Test
    void validateToken_ShouldReturnTrueForValidToken() {
        // Arrange
        String validToken = "eyJhbGciOiJIUzM4NCJ9.eyJwaG9uZSI6Iis5OTg5NzMwMDIwMjciLCJleHAiOjE2OTMzMTIxMTAsImlhdCI6MTY5MzIyNTcxMCwic3ViIjoiNTlmMDcxN2YtOTNiMi00YTFhLTg2M2ItMjljMDRhZjRlYzgxIn0.KwWuvV0FrskwOnrXqfAgA8CaIqB3rgEZ3NRgwy3-hG--bfqLBASsQw1MLOanPdFJ";
        jwtService.validateToken(validToken);

        // Act
        boolean isValid = jwtService.validateToken(validToken);

        // Assert
        assertTrue(isValid);
    }

    @Test
    void validateToken_ShouldReturnFalseForExpiredToken() {
        // Arrange
        String validToken = "eyJhbGciOiJIUzM4NCJ9";
        jwtService.validateToken(validToken);

        // Act
        boolean isValid = jwtService.validateToken(validToken);

        // Assert
        assertFalse(isValid);
    }
}
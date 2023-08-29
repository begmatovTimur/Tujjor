package com.example.backend.Services.AuthService;


import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Payload.Reaquest.LoginReq;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UsersRepository;
import com.example.backend.Services.JwtService.JwtService;
import com.example.backend.Services.JwtService.JwtServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.mockito.stubbing.OngoingStubbing;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Timestamp;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuthServiceImplTest {

    @Mock
    AuthServiceImpl loginController;

    @Mock
    JwtServiceImpl jwtService;

    @Mock
    UsersRepository userRepository;

    @Mock
    RoleRepository roleRepository;


    @Mock
    AuthenticationManager authenticationManager;
    @Mock
    AuthService underTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        loginController = new AuthServiceImpl(userRepository,roleRepository,jwtService,authenticationManager);
    }



    @Test
    void itShouldLogin() {
        // Mocking input DTO
        LoginReq mockLoginReq = new LoginReq("user_name","123", "phone_number", true);

        // Mocking UserRepository
        String phoneWithPlus = "+phone_number";
        User mockUser = new User();
        when(userRepository.findByPhone(phoneWithPlus)).thenReturn(Optional.of(mockUser));
        // Mocking RoleRepository
        List<Role> mockRoles = new ArrayList<>();
        when(roleRepository.findAll()).thenReturn(mockRoles);

        // Mocking JWT token generation
        String mockAccessToken = "mock_access_token";
        String mockRefreshToken = "mock_refresh_token";
        when(jwtService.generateJWTToken(mockUser)).thenReturn(mockAccessToken);
        when(jwtService.generateJWTRefreshToken(mockUser)).thenReturn(mockRefreshToken);
// Perform the login
        HttpEntity<?> responseEntity = loginController.login(mockLoginReq);

        // Assertions
        Map<String, Object> responseBody = (Map<String, Object>) responseEntity.getBody();
        assertNotNull(responseBody);
        assertEquals(mockAccessToken, responseBody.get("access_token"));
        assertEquals(mockRefreshToken, responseBody.get("refresh_token"));
        assertEquals(mockRoles, responseBody.get("roles"));

        // Verify that authenticationManager.authenticate() was called with the correct arguments
    }

        @Test
    void refreshToken() {
        String refreshToken = "eyJhbGciOiJIUzM4NCJ9.eyJleHAiOjE2OTM4MzA1MTAsImlhdCI6MTY5MzIyNTcxMCwic3ViIjoiNTlmMDcxN2YtOTNiMi00YTFhLTg2M2ItMjljMDRhZjRlYzgxIn0.LMDnC0nDqDA7f-EerzzV6VJgxtK07rm_YavrjyKuiS0FTeZmRhBPNNS425bz8ubJ";
        String userId = "59f0717f-93b2-4a1a-863b-29c04af4ec81";
        User mockUser = new User();
        mockUser.setId(UUID.fromString(userId));

        JwtService mockJwtService = Mockito.mock(JwtService.class);
        Mockito.when(mockJwtService.extractUserFromJwt(Mockito.anyString())).thenReturn(userId);
        Mockito.when(mockJwtService.generateJWTToken(Mockito.any(User.class))).thenReturn("eyJhbGciOiJIUzM4NCJ9.eyJwaG9uZSI6Iis5OTg5NzMwMDIwMjciLCJleHAiOjE2OTMzMTIxMTAsImlhdCI6MTY5MzIyNTcxMCwic3ViIjoiNTlmMDcxN2YtOTNiMi00YTFhLTg2M2ItMjljMDRhZjRlYzgxIn0.KwWuvV0FrskwOnrXqfAgA8CaIqB3rgEZ3NRgwy3-hG--bfqLBASsQw1MLOanPdFJ");

        UsersRepository mockUserRepository = Mockito.mock(UsersRepository.class);
        Mockito.when(mockUserRepository.findById(Mockito.any(UUID.class))).thenReturn(Optional.of(mockUser));

        //Assertions
        underTest.refreshToken(refreshToken);
        // Assert
        assertEquals(mockUser.getId(), UUID.fromString(userId));
    }
}

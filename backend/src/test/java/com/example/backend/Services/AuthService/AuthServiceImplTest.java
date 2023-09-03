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
}

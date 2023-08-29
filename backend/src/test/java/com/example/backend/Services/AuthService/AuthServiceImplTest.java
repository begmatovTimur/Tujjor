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
    UserDetailsService userDetailsService;

    @Mock
    PasswordEncoder passwordEncoder;

    @Mock
    AuthenticationConfiguration authenticationConfiguration;

    @Mock
    AuthenticationManager authenticationManager;
    @Mock
    AuthService underTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        loginController = new AuthServiceImpl(userRepository,roleRepository,jwtService,userDetailsService,passwordEncoder,authenticationConfiguration,authenticationManager);
    }

    @Test
    void itShouldRegister() {
        // Create a new Role (ROLE_USER) and save it to the database
        Role roleUser = new Role(
                UUID.randomUUID(),
                "ROLE_USER",
                new Timestamp(2023- 7 -29),
                new Timestamp(2023- 7 -29)
        );
        roleRepository.save(roleUser);

        // Create a new User with the corresponding Role
        UserDTO userData = new UserDTO();
        userData.setUsername("testuser");
        userData.setPhone("123456789");
        userData.setPassword("password123");

        UUID userId = UUID.randomUUID();
        User user = new User(
                userId,
                "testuser",
                userData.getPhone(),
                userData.getPassword(),
                List.of(roleUser) // User has the ROLE_USER role
        );

        // Save the User to the database
        userRepository.save(user);

        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        User savedUser = userRepository.findById(userId).orElse(null);
        assertNotNull(savedUser);

        // Verify that the User fields match the input data
        assertEquals(userData.getPhone(), savedUser.getPhone());
        assertEquals(userData.getPassword(), savedUser.getPassword());
        assertEquals(1, savedUser.getRoles().size()); // User has only one role (ROLE_USER)
        assertEquals(roleUser.getRoleName(), savedUser.getRoles().get(0).getRoleName());
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
        HttpEntity<?> responseEntity = underTest.login(mockLoginReq);

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

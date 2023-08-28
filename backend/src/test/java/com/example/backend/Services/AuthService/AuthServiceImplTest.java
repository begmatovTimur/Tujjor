package com.example.backend.Services.AuthService;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Payload.Reaquest.LoginReq;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UsersRepository;
import com.example.backend.Services.JwtService.JwtServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Timestamp;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
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

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        loginController = new AuthServiceImpl(userRepository,roleRepository,jwtService,userDetailsService,passwordEncoder,authenticationConfiguration,authenticationManager);
    }


}
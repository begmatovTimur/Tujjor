package com.example.backend.Services.AuthService;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Payload.LoginReq;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface AuthService {
    HttpEntity<?> register(UserDTO dto);
    HttpEntity<?> login(LoginReq dto);
    HttpEntity<?> refreshToken(String refreshToken);
}

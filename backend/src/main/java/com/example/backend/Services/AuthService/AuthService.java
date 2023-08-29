package com.example.backend.Services.AuthService;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Payload.Reaquest.LoginReq;
import org.springframework.http.HttpEntity;

public interface AuthService {
    HttpEntity<?> login(LoginReq dto);
    HttpEntity<?> refreshToken(String refreshToken);
}

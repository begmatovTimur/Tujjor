    package com.example.backend.Controller;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Payload.LoginReq;
import com.example.backend.Services.AuthService.AuthService;
import com.example.backend.Services.JwtService.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

    @RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService service;

    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody LoginReq loginReq) {
            return service.login(loginReq);
    }

    @PostMapping("/register")
    public HttpEntity<?> register(@RequestBody UserDTO userData) {
        return service.register(userData);
    }

    @PostMapping("/refresh")
    public HttpEntity<?> refreshToken(@RequestParam String refreshToken) {
        return service.refreshToken(refreshToken);
    }
}

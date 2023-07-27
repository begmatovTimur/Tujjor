    package com.example.backend.Controller;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Payload.LoginReq;
import com.example.backend.Services.AuthService.AuthService;
import com.example.backend.Services.JwtService.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService service;
    private final JwtService jwtService;

    @PostMapping("/login")
    public HttpEntity<?> login(@RequestBody UserDTO dto) {
        return service.login(dto);
    }

    @PostMapping("/register")
    public HttpEntity<?> register(@RequestBody LoginReq dto) {
        return service.register(dto);
    }

    @PostMapping("/refresh")
    public HttpEntity<?> refreshUser(@RequestParam String refreshToken) {
        return service.refreshToken(refreshToken);
    }

    @GetMapping("/decode")
    public HttpEntity<?> decode(@RequestHeader("token") String token) {
        return service.decode(token);
    }

    ;;
}

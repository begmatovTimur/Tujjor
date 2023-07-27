package com.example.backend.Controller;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Services.UsersService.UsersService;
import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UsersController {
    private final UsersService service;
    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public HttpEntity<?> addUser(@RequestBody UserDTO dto) {
        return service.addUser(dto);
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public HttpEntity<?> getStudents(@RequestParam String role) {
      return service.getStudents(role);
    };

    @GetMapping("/search")
    @PreAuthorize("isAuthenticated()")
    public HttpEntity<?> getStudentByTitle(@RequestParam String username) {
        return service.getStudentByTitle(username);
    }


}

package com.example.backend.Services.UsersService;

import com.example.backend.DTO.UserDTO;
import org.springframework.http.HttpEntity;

public interface UsersService {
    HttpEntity<?> addUser(UserDTO dto);
    HttpEntity<?> getStudents(String role);

    HttpEntity<?> getStudentByTitle(String title);
}

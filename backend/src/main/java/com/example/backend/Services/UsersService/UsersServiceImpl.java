package com.example.backend.Services.UsersService;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.Users;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class UsersServiceImpl implements UsersService {
    private final UsersRepository repository;
    private final RoleRepository roleRepository;
    @Override
    public HttpEntity<?> addUser(UserDTO dto) {

        List<Role> roles = new ArrayList<>();

        roles.add(addUserRoleIfAbsent());


        Users reqUser = new Users(
                null,
                dto.getUsername(),
                dto.getPassword(),
                roles,
                null,
                null
        );
        Users savedUser = repository.save(reqUser);
        return ResponseEntity.ok(savedUser);
    }

    @Override
    public HttpEntity<?> getStudents(String role) {
        return ResponseEntity.ok(repository.findAllByRoles(role));
    }

    @Override
    public HttpEntity<?> getStudentByTitle(String title) {
        return ResponseEntity.ok(repository.findAllByUsernameContainingIgnoreCase(title));
    }


    private Role addUserRoleIfAbsent() {
        Role userRole = roleRepository.findByRoleName("ROLE_USER");
        if (userRole == null) {
            return roleRepository.save(new Role(
                    null,
                    "ROLE_USER",
                    null,
                    null
            ));
        }

        return roleRepository.findByRoleName("ROLE_USER");
    }
}

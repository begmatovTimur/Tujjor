package com.example.backend.Repository;

import com.example.backend.Entity.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class RoleRepositoryTest {
    @Autowired
    RoleRepository roleRepository;

    @BeforeEach
    void setUp() {
        roleRepository.save(generateRole());
    }

    private static Role generateRole() {
        return Role
                .builder()
                .created_at(null)
                .roleName("ROLE_ADMIN")
                .id(UUID.randomUUID())
                .updated_at(null)
                .build();
    }

    @Test
    void itShouldFindByRoleName() {
        Role roleAdmin = roleRepository.findByRoleName("ROLE_ADMIN");
        assertEquals("ROLE_ADMIN", roleAdmin.getRoleName());
    }
}
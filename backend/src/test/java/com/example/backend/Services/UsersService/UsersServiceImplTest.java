package com.example.backend.Services.UsersService;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.SettingsRepository;
import com.example.backend.Repository.UsersRepository;
import com.example.backend.Services.SettingsService.SettingsServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import static org.hibernate.validator.internal.util.Contracts.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
class UsersServiceImplTest {
    @InjectMocks
    private UsersServiceImpl underTest;

    @Mock
    private UsersRepository usersRepository;

    @Mock
    private RoleRepository roleRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    void itShouldAddUser() {
        UserDTO userDTO = new UserDTO();
        userDTO.setUsername("testUser");
        userDTO.setPhone("123456789");
        userDTO.setPassword("password");

        // Create a sample Role
        Role role = new Role();
        role.setId(UUID.randomUUID());
        role.setRoleName("ROLE_USER");

        // Mock the behavior of roleRepository to return the sample Role when findByName is called
        when(roleRepository.findByRoleName("ROLE_USER")).thenReturn(Optional.of(role).get());


        // Create a sample User
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setUsername(userDTO.getUsername());
        user.setPhone(userDTO.getPhone());
        user.setPassword(userDTO.getPassword());
        user.setRoles(new ArrayList<>());
        user.getRoles().add(role);

        // Mock the behavior of usersRepository to return the sample User when save is called
        when(usersRepository.save(any(User.class))).thenReturn(user);

        // Call the addUser method multiple times
        HttpEntity<?> result1 = underTest.addUser(userDTO);
        HttpEntity<?> result2 = underTest.addUser(userDTO);


        // Verify that the results are as expected
        ResponseEntity<?> expectedResponse = ResponseEntity.ok(user);
        assertEquals(expectedResponse, result1);
        assertEquals(expectedResponse, result2);
    }

    @Test
    public void itShouldGetStudents() {
        // Create a sample role name ("STUDENT")
        String roleName = "STUDENT";

        // Create a list of sample students with non-null UUIDs
        List<User> students = new ArrayList<>();
        students.add(createUser("Student1", roleName));
        students.add(createUser("Student2", roleName));

        // Mock the behavior of usersRepository to return the sample students when findAllByRoles is called
// Assuming your repository method returns a List<User>
//        when(usersRepository.findAllByRoles(roleName)).thenReturn(List.of(createUser("Student1", roleName), createUser("Student2", roleName)));

        // Call the getStudents method
        HttpEntity<?> result = underTest.getStudents(roleName);

        // Verify that usersRepository.findAllByRoles was called once
        verify(usersRepository, times(1)).findAllByRoles(roleName);

        // Verify that the result is as expected
        ResponseEntity<?> expectedResponse = ResponseEntity.ok(students);
    }


    private User createUser(String username, String role) {
        User user = new User();
        user.setUsername(username);
        user.setRoles(new ArrayList<>());
        user.getRoles().add(createRole(role));
        return user;
    }

    private Role createRole(String roleName) {
        Role role = new Role();
        role.setRoleName(roleName);
        return role;
    }

    @Test
    void itShouldGetStudentByTitle() {
        // Call the service method
        HttpEntity<?> response = underTest.getStudentByTitle("john");

        // Verify that the response is a ResponseEntity with HTTP status 200 (OK)
        assertTrue(response instanceof ResponseEntity);
        ResponseEntity<?> entityResponse = (ResponseEntity<?>) response;
        assertEquals(200, entityResponse.getStatusCodeValue());

        // Verify that the repository method was called with the correct argument
        verify(usersRepository).findAllByUsernameContainingIgnoreCase("john");
    }


    @Test
    void itShouldGetMe() {
        // Create a User object to use as input for the getMe method
        User user = new User();
        user.setId(UUID.randomUUID()); // Set appropriate user properties



        // Call the getMe method
        HttpEntity<?> response = underTest.getMe(user);

        // Assert that the response is not null
        assertNotNull(response);

        // Assert that the response is an instance of ResponseEntity
        assertTrue(response instanceof ResponseEntity);

        // Assert that the status code in the ResponseEntity is OK (200)
        ResponseEntity<?> entityResponse = (ResponseEntity<?>) response;
        assertEquals(200, entityResponse.getStatusCodeValue());

        // Assert that the body of the response is the same as the input User object
        assertEquals(user, entityResponse.getBody());
    }
    @Test
    public void testAddUserRoleIfAbsentWhenRoleDoesNotExist() {
        // Create a mocked Role object representing the case where the role does not exist
        Role roleNotExists = null;

        // Mock the behavior of roleRepository.findByRoleName("ROLE_USER") to return null
        when(roleRepository.findByRoleName("ROLE_USER")).thenReturn(roleNotExists);

        // Create a new Role object that should be saved
        Role roleToBeSaved = new Role(null, "ROLE_USER", null, null);

        // Mock the behavior of roleRepository.save() to return the newly created role
        when(roleRepository.save(any(Role.class))).thenReturn(roleToBeSaved);

        // Call the method to test
        Role result = underTest.addUserRoleIfAbsent();

        // Verify that the roleRepository.findByRoleName("ROLE_USER") was called
        verify(roleRepository).findByRoleName("ROLE_USER");

        // Verify that roleRepository.save() was called with the expected role
        verify(roleRepository).save(roleToBeSaved);

        // Assert that the result is the same as the roleToBeSaved
        assertEquals(roleToBeSaved, result);
    }

    @Test
    public void testAddUserRoleIfAbsentWhenRoleExists() {
        // Create a mocked Role object representing the case where the role already exists
        Role roleExists = new Role(UUID.randomUUID(), "ROLE_USER", null, null);

        // Mock the behavior of roleRepository.findByRoleName("ROLE_USER") to return the existing role
        when(roleRepository.findByRoleName("ROLE_USER")).thenReturn(roleExists);

        // Call the method to test
        Role result = underTest.addUserRoleIfAbsent();

        // Verify that the roleRepository.findByRoleName("ROLE_USER") was called
//        verify(roleRepository).findByRoleName("ROLE_USER");

        // Verify that roleRepository.save() was not called because the role already exists
        verify(roleRepository, never()).save(any(Role.class));

        // Assert that the result is the same as the existing role
        assertEquals(roleExists, result);
    }
}
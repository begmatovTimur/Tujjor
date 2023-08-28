package com.example.backend.Repository;

import static org.junit.jupiter.api.Assertions.*;

import com.example.backend.Projection.UsersProjection;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

// Import your repository and entity classes
import com.example.backend.Repository.UsersRepository;
import com.example.backend.Entity.User;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class UsersRepositoryTest {

    @Autowired
    private UsersRepository usersRepository;

    @Test
    void testFindByPhone() {
        // Create a user with a known phone number
        User user = createUser("timur", "998", "root123");

        // Save the user to the repository
        usersRepository.save(user);

        // Perform the findByPhone operation
        Optional<User> foundUser = usersRepository.findByPhone("998");

        assertTrue(foundUser.isPresent());
        assertEquals(user.getPhone(), foundUser.get().getPhone());
    }

    @Test
    void testFindAllByRoles() {
        // Perform the findAllByRoles operation
        List<UsersProjection> usersWithRole = usersRepository.findAllByRoles("ROLE_ADMIN");

        // Add assertions here to verify the results
        // For example, you can check the size of the returned list
        // and verify that the user projections have the expected data
    }

    @Test
    void testFindAllByUsernameContainingIgnoreCase() {
        // Create users with similar usernames
        User user1 = createUser("timur", "998", "root123");
        User user2 = createUser("TiMuR", "999", "pass456");

        // Save the users to the repository
        usersRepository.saveAll(List.of(user1, user2));

        // Perform the findAllByUsernameContainingIgnoreCase operation
        List<User> usersWithUsername = usersRepository.findAllByUsernameContainingIgnoreCase("timur");

        assertEquals(3, usersWithUsername.size());
        // Add further assertions to check the details of the returned users
    }

    private User createUser(String username, String phone, String password) {
        return User.builder()
                .username(username)
                .phone(phone)
                .password(password)
                .build();
    }
}

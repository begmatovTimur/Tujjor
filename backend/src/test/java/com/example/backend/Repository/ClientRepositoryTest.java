package com.example.backend.Repository;

import com.example.backend.Entity.Client;
import com.example.backend.Projection.ClientProjection;
import org.glassfish.grizzly.http.util.TimeStamp;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class ClientRepositoryTest {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void testGetAllFilteredFields() {
        Client client1 = new Client(UUID.randomUUID(), null, "name", "address", "phone", "tin", "companyName", "referencePoint", 0.0, 0.0, false, null, null, null);
        entityManager.persist(client1);

        List<UUID> cities = new ArrayList<>();
        List<Integer> categories = new ArrayList<>();
        List<Boolean> active = new ArrayList<>();
        active.add(true);
        String tin = "true";
        String search = "search text";
        PageRequest pageable = PageRequest.of(0, 10);

        Page<ClientProjection> result = clientRepository.getAllFilteredFields(cities, categories, active, tin, search, pageable);

        assertEquals(10, result.getSize());
    }
}

package com.example.backend.Repository;

import com.example.backend.Entity.Client;
import com.example.backend.Entity.Territory;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Projection.ClientProjection;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ClientRepositoryTest {

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private CustomerCategoryRepository customerCategoryRepository;

    @Autowired
    private TerritoryRepository territoryRepository;

    private CustomerCategory customerCategory;

    @BeforeEach
    void setUp() {
        customerCategory = new CustomerCategory();
        customerCategory.setId(1); // Ensure that a category with ID 1 exists in your test context
        customerCategory.setName("CategoryName");
        CustomerCategory savedCustomerCategory = customerCategoryRepository.save(customerCategory);


        Territory territory = new Territory();
        territory.setId(UUID.randomUUID());
        territory.setRegion("CityName");
        Territory savedTerritory = territoryRepository.save(territory);

        Client client = new Client();
        client.setId(UUID.randomUUID());
        client.setTerritory(savedTerritory);
        client.setCategory(savedCustomerCategory);
        client.setName("Test Client");
        client.setActive(true);
        client.setTin("12345");
        client.setPhone("+139139");
        // Set other client properties as needed
        // ...

        clientRepository.save(client);
    }

    @Test
    void testGetAllFilteredFields() {
        List<UUID> city = new ArrayList<>();
        // Add city UUID to the list

        List<Integer> categoryIds = Collections.singletonList(customerCategory.getId());
        List<Boolean> active = Collections.singletonList(true);
        String tin = "12345";
        String search = "Test";
        Pageable pageable = Pageable.unpaged();

        Page<ClientProjection> result = clientRepository.getAllFilteredFields(city, categoryIds, active, tin, search, pageable);

        assertEquals(1, result.getTotalElements());
        if (result.getTotalElements() > 0) {

            ClientProjection projection = result.getContent().get(0);
            assertEquals("Test Client", projection.getClientName());
        }
    }

    @Test
    void testGetAllFilteredFieldsWithEmptyResults() {
        List<UUID> city = new ArrayList<>();
        // Add non-existing city UUID to the list

        List<Integer> categoryIds = Collections.singletonList(2); // Non-existing Category ID
        List<Boolean> active = Collections.singletonList(false);
        String tin = "12345";
        String search = "Test";
        Pageable pageable = Pageable.unpaged();

        Page<ClientProjection> result = clientRepository.getAllFilteredFields(city, categoryIds, active, tin, search, pageable);

        assertEquals(0, result.getTotalElements());
    }
}

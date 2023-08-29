package com.example.backend.Services.ClientService;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Entity.Client;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import com.example.backend.Repository.ClientRepository;
import com.example.backend.Repository.CustomerCategoryRepository;
import com.example.backend.Repository.TerritoryRepository;
import com.example.backend.Services.ClientService.ClientServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class ClientServiceImplTest {

    @Mock
    private ClientRepository clientRepository;

    @Mock
    private CustomerCategoryRepository categoryRepository;

    @Mock
    private TerritoryRepository territoryRepository;

    private ClientServiceImpl clientService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        clientService = new ClientServiceImpl(clientRepository, categoryRepository, territoryRepository);
    }

    @Test
    void itShouldSaveClient() {
//        // Arrange
//        ClientDTO clientDTO = new ClientDTO();
//        System.out.println(territoryRepository.count());
//        clientDTO.setTerritoryId(U);
//        clientDTO.setCategoryId(categoryRepository.findAll().get(0).getId());
//        // Set properties of clientDTO
//
//        UUID clientId = UUID.randomUUID();
//        Client client = new Client();
//        // Set properties of client
//
//        when(clientRepository.save(any(Client.class))).thenReturn(client);
//
//        // Act
//        HttpEntity<?> result = clientService.saveClient(clientDTO);
//
//        // Assert
//        assertEquals(ResponseEntity.ok(client), result);
//        verify(clientRepository, times(1)).save(any(Client.class));
    }

    @Test
    void itShouldGetClient() {
        //GIVEN
        //WHEN
        //THEN
    }

    @Test
    void itShouldUpdateClient() {
        UUID clientId = UUID.randomUUID();
        ClientDTO clientDTO = new ClientDTO();
      clientDTO.setCategoryId(categoryRepository.findAll().get(0).getId()); // Set a valid category ID here
        clientDTO.setTerritoryId(territoryRepository.findAll().get(0).getId()); // Set a valid territory ID here

        // Mock the behavior of categoryRepository.findById
//        when(categoryRepository.findById(categoryRepository.findAll().get(0).getId())
//                .thenReturn(Optional.of(new CustomerCategory()));

        // Mock the behavior of territoryRepository.findById
        when(territoryRepository.findById(territoryRepository.findAll().get(0).getId()))
                .thenReturn(Optional.of(new Territory()));

        // Mock the save method of clientRepository
        when(clientRepository.save(any(Client.class))).thenReturn(new Client());

        // Call the method you want to test
        ResponseEntity<?> response = clientService.updateClient(clientId, clientDTO);

        // Add your assertions here to verify the response or other aspects of the test
    }
}
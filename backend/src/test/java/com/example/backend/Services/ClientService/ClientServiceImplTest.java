package com.example.backend.Services.ClientService;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Entity.Client;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import com.example.backend.Repository.ClientRepository;
import com.example.backend.Repository.CustomerCategoryRepository;
import com.example.backend.Repository.TerritoryRepository;
<<<<<<< HEAD
import org.junit.jupiter.api.Assertions;
=======
import com.example.backend.Services.ClientService.ClientServiceImpl;
>>>>>>> 024b48a888cd8b265891f612bb03beb0a08283d9
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.stubbing.Answer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

<<<<<<< HEAD
import java.util.ArrayList;
import java.util.List;
=======
>>>>>>> 024b48a888cd8b265891f612bb03beb0a08283d9
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
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
<<<<<<< HEAD
    void testUpdateClient() {
        UUID clientId = UUID.randomUUID();
        ClientDTO clientDTO = new ClientDTO();
        // Set DTO properties as needed

        // Mock the behavior of findById for category and territory
        when(categoryRepository.findById(clientDTO.getCategoryId())).thenReturn(Optional.of(new CustomerCategory()));
        when(territoryRepository.findById(clientDTO.getTerritoryId())).thenReturn(Optional.of(new Territory()));

        // Mock the behavior of the clientRepository.save method
        when(clientRepository.save(any(Client.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ResponseEntity responseEntity = (ResponseEntity) underTest.updateClient(clientId, clientDTO);

        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Client updated successfully", responseEntity.getBody());

        // Verify interactions
        verify(clientRepository).save(any(Client.class));
        verify(categoryRepository).findById(clientDTO.getCategoryId());
        verify(territoryRepository).findById(clientDTO.getTerritoryId());
    }

    @Test
    void itShouldSaveClient() {
        // Create a sample ClientDTO
        ClientDTO clientDTO = new ClientDTO();
        // Set DTO properties here


        Integer categoryId = 1;
        UUID territoryId = UUID.randomUUID();
        clientDTO.setCategoryId(categoryId);
        clientDTO.setTerritoryId(territoryId);

        // Mock behavior of categoryRepository.findById
        CustomerCategory mockCategory = new CustomerCategory();
        when(categoryRepository.findById(categoryId)).thenReturn(Optional.of(mockCategory));

        // Mock behavior of territoryRepository.findById
        Territory mockTerritory = new Territory();
        when(territoryRepository.findById(territoryId)).thenReturn(Optional.of(mockTerritory));

        // Mock behavior of clientRepository.save
        Client savedClient = new Client();
        when(clientRepository.save(any(Client.class))).thenReturn(savedClient);

        // Call the method
        HttpEntity<?> httpEntity = underTest.saveClient(clientDTO);

        // Verify interactions
        verify(categoryRepository).findById(categoryId);
        verify(territoryRepository).findById(territoryId);
        verify(clientRepository).save(any(Client.class));

        // Check the result
        assertEquals(ResponseEntity.ok(savedClient), httpEntity);
    }


    @Test
    void itShouldGetClient() {
        // Mock behavior of clientRepository.getAllFilteredFields using Answer
        List<Boolean> active = new ArrayList<>();
        active.add(true);
        active.add(false);
        Page<Client> mockClientPage = mock(Page.class);
        when(clientRepository.getAllFilteredFields(anyList(), anyList(), eq(active), anyString(), anyString(), any(Pageable.class)))
                .thenAnswer((Answer<Page<Client>>) invocation -> mockClientPage);

        // Call the method
        HttpEntity<?> httpEntity = underTest.getClient();

        // Verify interactions
        verify(clientRepository).getAllFilteredFields(anyList(), anyList(), eq(active), anyString(), anyString(), any(Pageable.class));

        // Check the result
        ResponseEntity<?> expectedResponseEntity = ResponseEntity.ok(mockClientPage);
        ResponseEntity<?> actualResponseEntity = (ResponseEntity<?>) httpEntity;

        // Compare only the response statuses
        assertEquals(expectedResponseEntity.getStatusCode(), actualResponseEntity.getStatusCode());
        assertEquals(expectedResponseEntity.getHeaders(), actualResponseEntity.getHeaders());
    }





}
=======
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
>>>>>>> 024b48a888cd8b265891f612bb03beb0a08283d9

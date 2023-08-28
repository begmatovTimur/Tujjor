package com.example.backend.Services.ClientService;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Entity.Client;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import com.example.backend.Repository.ClientRepository;
import com.example.backend.Repository.CustomerCategoryRepository;
import com.example.backend.Repository.TerritoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.stubbing.Answer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
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
    @Mock
    private ClientService underTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        underTest = new ClientServiceImpl(clientRepository, categoryRepository, territoryRepository);
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
        assertEquals(ResponseEntity.ok(mockClientPage), httpEntity);
    }
    @Test
    void itShouldUpdateClient() {
        UUID clientId = UUID.randomUUID();
        Integer categoryId = 1;
        UUID territoryId = UUID.randomUUID();

        ClientDTO clientDTO = new ClientDTO();
        clientDTO.setCategoryId(categoryId);
        clientDTO.setTerritoryId(territoryId);

        // Mock behavior of categoryRepository.findById to return a non-empty Optional
        when(categoryRepository.findById(eq(categoryId))).thenReturn(Optional.of(new CustomerCategory()));

        // Mock behavior of territoryRepository.findById to return a non-empty Optional
        when(territoryRepository.findById(eq(territoryId))).thenReturn(Optional.of(new Territory()));

        // Mock behavior of clientRepository.save
        when(clientRepository.save(any(Client.class))).thenReturn(new Client());

        HttpEntity<?> httpEntity = underTest.updateClient(clientId, clientDTO);

        Assertions.assertEquals(httpEntity.getBody(), "Client updated successfully");

        // Verify that the necessary methods were called
        verify(categoryRepository).findById(eq(categoryId));
        verify(territoryRepository).findById(eq(territoryId));
        verify(clientRepository).save(any(Client.class));
    }




}

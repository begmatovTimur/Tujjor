package com.example.backend.Services.TerritoryService;

import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Entity.Territory;
import com.example.backend.Projection.TerritoryProjection;
import com.example.backend.Projection.TerritoryRegionProjection;
import com.example.backend.Repository.TerritoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import static org.mockito.Mockito.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class TerritoryServiceImplTest {
    @Mock
    private TerritoryService underTest;

    @Mock
    private TerritoryRepository territoryRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        underTest = new TerritoryServiceImpl(territoryRepository);
    }

    @Test
    void itShouldAddTerritory() {
        TerritoryDTO territoryDTO = new TerritoryDTO();
        // Set DTO properties here

        Territory generatedTerritory = new Territory();
        when(territoryRepository.save(any(Territory.class))).thenReturn(generatedTerritory);

        Territory result = underTest.addTerritory(territoryDTO);

        verify(territoryRepository).save(any(Territory.class));
        assertEquals(generatedTerritory, result);
    }

    @Test
    void itShouldUpdateTerritory() {
        UUID id = UUID.randomUUID();
        TerritoryDTO territoryDTO = new TerritoryDTO();
        // Set DTO properties here

        Territory territoryData = new Territory();
        when(territoryRepository.findById(id)).thenReturn(Optional.of(territoryData));
        when(territoryRepository.save(any(Territory.class))).thenReturn(territoryData);

        Territory result = underTest.updateTerritory(id, territoryDTO);

        verify(territoryRepository).findById(id);
        verify(territoryRepository).save(any(Territory.class));
        assertEquals(territoryData, result);
    }
    @Test
    void itShouldGetTerritoryRegion() {
        TerritoryRegionProjection region = mock(TerritoryRegionProjection.class);
        when(region.getRegion()).thenReturn("Region1"); // Mocking method behavior

        List<TerritoryRegionProjection> regionList = Collections.singletonList(region);
        when(territoryRepository.findAllRegion()).thenReturn(regionList);

        HttpEntity<?> httpEntity = underTest.getTerritoryRegion();

        assertEquals(ResponseEntity.ok(regionList), httpEntity);
    }




    @Test
    void itShouldGetTerritories() {
        List<Boolean> active = new ArrayList<>();
        active.add(true);
        active.add(false);

        List<TerritoryProjection> mockTerritories = new ArrayList<>();
        // Create some mock TerritoryProjection instances and add them to the list

        Page<TerritoryProjection> mockPage = new PageImpl<>(mockTerritories);

        // Mock the behavior of territoryRepository.getFilteredData
        when(territoryRepository.getFilteredData(eq(""), eq(active), any(Pageable.class)))
                .thenReturn(mockPage);

        HttpEntity<?> httpEntity = underTest.getTerritories();

        int statusCodeValue = ((ResponseEntity<?>) httpEntity).getStatusCodeValue();

        int expectedStatusCode = HttpStatus.OK.value();  // Change this to your expected status code

        Assertions.assertEquals(expectedStatusCode, statusCodeValue);

        // Verify that the necessary methods were called
        verify(territoryRepository).getFilteredData(eq(""), eq(active), any(Pageable.class));
    }







}
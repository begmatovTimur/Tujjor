package com.example.backend.Services.TerritoryService;

import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Entity.Territory;
import com.example.backend.Projection.TerritoryRegionProjection;
import com.example.backend.Repository.TerritoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import static org.mockito.Mockito.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
    void testAddTerritory() {
        TerritoryDTO territoryDTO = new TerritoryDTO();
        // Set DTO properties here

        Territory generatedTerritory = new Territory();
        when(territoryRepository.save(any(Territory.class))).thenReturn(generatedTerritory);

        Territory result = underTest.addTerritory(territoryDTO);

        verify(territoryRepository).save(any(Territory.class));
        assertEquals(generatedTerritory, result);
    }

    @Test
    void testUpdateTerritory() {
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
    void testGetTerritoryRegion() {
        TerritoryRegionProjection region = mock(TerritoryRegionProjection.class);
        when(region.getRegion()).thenReturn("Region1"); // Mocking method behavior

        List<TerritoryRegionProjection> regionList = Collections.singletonList(region);
        when(territoryRepository.findAllRegion()).thenReturn(regionList);

        HttpEntity<?> httpEntity = underTest.getTerritoryRegion();

        assertEquals(ResponseEntity.ok(regionList), httpEntity);
    }

    @Test
    void testGetTerritories() {
        List<Territory> territories = Collections.singletonList(new Territory());
        when(territoryRepository.findAll()).thenReturn(territories);

        HttpEntity<?> httpEntity = underTest.getTerritories();

        assertEquals(ResponseEntity.ok(territories), httpEntity);
    }






}
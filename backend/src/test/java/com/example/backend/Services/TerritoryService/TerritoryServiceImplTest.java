package com.example.backend.Services.TerritoryService;

import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Entity.Territory;
import com.example.backend.Repository.TerritoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class TerritoryServiceImplTest {

    @Mock
    private TerritoryRepository territoryRepository;

    @InjectMocks
    private TerritoryServiceImpl territoryService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetTerritories() {
        // Prepare test data
        Territory mockTerritory = new Territory();
        mockTerritory.setId(UUID.randomUUID());
        mockTerritory.setRegion("Test Region");
        mockTerritory.setTitle("Test Title");
        mockTerritory.setCode("TEST001");
        mockTerritory.setActive(true);
        mockTerritory.setLongitude(10.12345);
        mockTerritory.setLatitude(20.54321);

        when(territoryRepository.findAll()).thenReturn(Collections.singletonList(mockTerritory));

        // Perform the actual test
        List<Territory> territories = territoryService.getTerritories();

        // Assert the result
        assertEquals(1, territories.size());
        assertEquals("Test Region", territories.get(0).getRegion());
        assertEquals("Test Title", territories.get(0).getTitle());
        assertEquals("TEST001", territories.get(0).getCode());
        assertEquals(true, territories.get(0).getActive());
        assertEquals(10.12345, territories.get(0).getLongitude());
        assertEquals(20.54321, territories.get(0).getLatitude());
    }

    @Test
    void testAddTerritory() {
        TerritoryDTO mockTerritory = TerritoryDTO.builder()
                .region("Bukhara")
                .title("Kagan")
                .code("500")
                .active(true)
                .latitude(23.434324142)
                .longitude(54.123123213)
                .build();
        Territory territory = territoryService.addTerritory(mockTerritory);
        System.out.println(territory);
    }

    @Test
    void testUpdateTerritory() {
        // Prepare test data
        UUID mockTerritoryId = UUID.randomUUID();
        TerritoryDTO mockTerritoryDTO = new TerritoryDTO();
        mockTerritoryDTO.setRegion("Updated Region");
        mockTerritoryDTO.setTitle("Updated Title");
        mockTerritoryDTO.setCode("UPDATED001");
        mockTerritoryDTO.setActive(false);
        mockTerritoryDTO.setLongitude(50.12345);
        mockTerritoryDTO.setLatitude(60.54321);

        when(territoryRepository.save(any(Territory.class))).thenReturn(new Territory());

        // Perform the actual test
        Territory resultTerritory = territoryService.updateTerritory(null, mockTerritoryDTO);
        resultTerritory.setId(mockTerritoryId);

        // Assert the result
        assertEquals(mockTerritoryId, resultTerritory.getId());
        assertEquals("Updated Region", resultTerritory.getRegion());
        assertEquals("Updated Title", resultTerritory.getTitle());
        assertEquals("UPDATED001", resultTerritory.getCode());
        assertEquals(false, resultTerritory.getActive());
        assertEquals(50.12345, resultTerritory.getLongitude());
        assertEquals(60.54321, resultTerritory.getLatitude());

        // Verify that territoryRepository.save was called twice (once for setting id and once for saving)
        verify(territoryRepository, times(2)).save(any(Territory.class));
    }
}

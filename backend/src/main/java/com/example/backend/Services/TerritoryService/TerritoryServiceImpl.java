package com.example.backend.Services.TerritoryService;

import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Entity.Territory;
import com.example.backend.Payload.Reaquest.FilterData;
import com.example.backend.Projection.TerritoryProjection;
import com.example.backend.Repository.TerritoryRepository;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TerritoryServiceImpl implements TerritoryService {
    private final TerritoryRepository territoryRepository;
    private final UniversalServiceFilter serviceFilter;



    @Override
    public Territory addTerritory(TerritoryDTO territory) {
        return territoryRepository.save(generateNewTerritory(territory));
    }

    @Override
    public Territory updateTerritory(UUID id, TerritoryDTO territory) {
        Territory territoryData = generateUpdatedTerritory(territory, id);
        assert territoryData != null;
        territoryData.setId(id);
        return territoryRepository.save(territoryData);
    }

    private Territory generateUpdatedTerritory(TerritoryDTO territory, UUID id) {
        return Territory.builder()
                .region(territory.getRegion())
                .name(territory.getName())
                .code(territory.getCode())
                .active(territory.getActive())
                .longitude(territory.getLongitude())
                .latitude(territory.getLatitude())
                .insertionTime(territoryRepository.findById(id).get().getInsertionTime())
                .build();
    }


    private Territory generateNewTerritory(TerritoryDTO territory) {
        return Territory.builder()
                .region(territory.getRegion())
                .name(territory.getName())
                .code(territory.getCode())
                .active(territory.getActive())
                .longitude(territory.getLongitude())
                .latitude(territory.getLatitude())
                .insertionTime(LocalDateTime.now())
                .build();
    }


    @Override
    public HttpEntity<?> getTerritories() {
        List<Territory> territories = territoryRepository.findAll();
        return ResponseEntity.ok(territories);
    }




    @Override
    public HttpEntity<?> getTerritoryRegion() {
        try {
            return ResponseEntity.ok(territoryRepository.findAllRegion());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error has occurred");
        }
    }
}

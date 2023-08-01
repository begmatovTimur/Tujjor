package com.example.backend.Services.TerritoryService;

import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Entity.Territory;
import com.example.backend.Repository.TerritoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TerritoryServiceImpl implements TerritoryService{
    private final TerritoryRepository territoryRepository;

    @Override
    public List<Territory> getTerritories() {
        return territoryRepository.findAll();
    }

    @Override
    public Territory addTerritory(TerritoryDTO territory) {
        return territoryRepository.save(generateNewTerritory(territory));
    }

    @Override
    public Territory updateTerritory(UUID id, TerritoryDTO territory) {
        Territory territoryData = generateNewTerritory(territory);
        territoryData.setId(id);
        territoryRepository.save(territoryData);
        return territoryRepository.save(territoryData);
    }

    private Territory generateNewTerritory(TerritoryDTO territory) {
        return Territory.builder()
                .region(territory.getRegion())
                .title(territory.getTitle())
                .code(territory.getCode())
                .active(territory.getActive())
                .longitude(territory.getLongitude())
                .latitude(territory.getLatitude())
                .build();
    }
}

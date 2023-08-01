package com.example.backend.Services.TerritoryService;

import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Entity.Territory;

import java.util.List;
import java.util.UUID;

public interface TerritoryService {
    List<Territory> getTerritories();
    Territory addTerritory(TerritoryDTO territory);
    Territory updateTerritory(UUID id, TerritoryDTO territory);
}

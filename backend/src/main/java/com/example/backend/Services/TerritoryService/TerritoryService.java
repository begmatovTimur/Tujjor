package com.example.backend.Services.TerritoryService;

import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Entity.Territory;

import java.util.List;
import java.util.UUID;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpEntity;

public interface TerritoryService {
    Territory addTerritory(TerritoryDTO territory);

    Territory updateTerritory(UUID id, TerritoryDTO territory);

    HttpEntity<?> getFilteredTerritory(HttpServletRequest request);

    HttpEntity<?> getTerritories();
}
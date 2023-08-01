package com.example.backend.Services.TerritoryService;

import org.springframework.http.HttpEntity;

public interface TerritoryService {

    HttpEntity<?> getFilteredTerritory(String search, String status);
}

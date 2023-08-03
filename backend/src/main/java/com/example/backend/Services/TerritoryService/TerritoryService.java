package com.example.backend.Services.TerritoryService;

import com.example.backend.DTO.ExcelDTO;
import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Entity.Territory;

import java.io.IOException;
import java.util.UUID;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

public interface TerritoryService {
    Territory addTerritory(TerritoryDTO territory);

    Territory updateTerritory(UUID id, TerritoryDTO territory);

    ResponseEntity<InputStreamResource> downloadExcel(ExcelDTO userPayload);
    HttpEntity<?> getFilteredTerritory(HttpServletRequest request);

    HttpEntity<?> getTerritories();

    HttpEntity<?> pagination(Integer page, Integer limit);

    ResponseEntity<Resource> getExcelFile() throws IOException;

}
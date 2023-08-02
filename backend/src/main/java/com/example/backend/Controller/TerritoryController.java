package com.example.backend.Controller;

import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Services.TerritoryService.TerritoryService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/territory")
public class TerritoryController {
    private final TerritoryService territoryService;

    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    @GetMapping()
    public HttpEntity<?> getFilteredTerritory(HttpServletRequest  request) {
        return territoryService.getFilteredTerritory(request);
    }

    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    @PostMapping()
    public HttpEntity<?> saveTerritory(@RequestBody TerritoryDTO territoryDTO){
        return ResponseEntity.ok(territoryService.addTerritory(territoryDTO));
    }

    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    @PutMapping("{id}")
    public HttpEntity<?> updateTerritory(@PathVariable UUID id, @RequestBody TerritoryDTO territoryDTO){
        return ResponseEntity.ok(territoryService.updateTerritory(id, territoryDTO));
    }
}

package com.example.backend.Controller;

import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Services.TerritoryService.TerritoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/territory")
public class TerritoryController {
    private final TerritoryService territoryService;

    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    @GetMapping
    public HttpEntity<?> getTerritories(){
        return ResponseEntity.ok(territoryService.getTerritories());
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

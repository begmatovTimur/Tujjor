package com.example.backend.Controller;

import com.example.backend.DTO.ExcelDTO;
import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Services.TerritoryService.TerritoryService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.security.PermitAll;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@PermitAll
@RequestMapping("/api/territory")
public class TerritoryController {
    private final TerritoryService territoryService;


    @GetMapping("/pagination")
    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> pagination(@RequestParam Integer page,@RequestParam Integer limit,HttpServletRequest request) {
        return territoryService.pagination(page,limit,request);
    };
    @GetMapping("/excel")
//    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public ResponseEntity<Resource> excel() throws IOException {
        return territoryService.getExcelFile();
    };

    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    @GetMapping()
    public HttpEntity<?> getTerritories() {
        return territoryService.getTerritories();
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

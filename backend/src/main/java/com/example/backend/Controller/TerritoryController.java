package com.example.backend.Controller;

import com.example.backend.DTO.SearchActiveDTO;
import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Services.TerritoryService.TerritoryService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/territory")
public class TerritoryController {
    private final TerritoryService territoryService;


    @GetMapping("/pagination")
    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> pagination(@RequestParam Integer page,@RequestParam Integer limit,HttpServletRequest request) {
        return territoryService.pagination(page,limit,request);
    };


    @GetMapping("/excel")
    public ResponseEntity<Resource> excel(HttpServletRequest request) throws IOException {
        String quickSearch = request.getHeader("quickSearch");
        SearchActiveDTO searchActiveDTO = new SearchActiveDTO();
        searchActiveDTO.setActive(request.getHeader("active"));
        searchActiveDTO.setQuickSearch(quickSearch);
        return territoryService.getExcelFile(searchActiveDTO);
    };

    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    @GetMapping()
    public HttpEntity<?> getTerritories() {
        return territoryService.getTerritories();
    }

    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    @GetMapping("/region")
    public HttpEntity<?> getTerritoryRegion() {
        return territoryService.getTerritoryRegion();
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

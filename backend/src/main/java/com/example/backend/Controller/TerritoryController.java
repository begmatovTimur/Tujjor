package com.example.backend.Controller;

import com.example.backend.Services.TerritoryService.TerritoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/territory")
@RequiredArgsConstructor
public class TerritoryController {

    private final TerritoryService territoryService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping()
    public HttpEntity<?> getFilteredTerritory(@RequestParam(defaultValue = "") String search,@RequestParam(defaultValue = "") String status){
        return territoryService.getFilteredTerritory(search,status);
    }
}

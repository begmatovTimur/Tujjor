package com.example.backend.Services.TerritoryService;

import com.example.backend.Projection.TerritoryProjection;
import com.example.backend.Repository.TerritoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TerritoryServiceImple implements TerritoryService {

    private final TerritoryRepository territoryRepository;

    @Override
    public HttpEntity<?> getFilteredTerritory(String search, String status) {
        try {
            List<TerritoryProjection> territories;
            if(!status.equals("")){
                territories = territoryRepository.findTerritoryByActiveAndRegionName(search, Boolean.parseBoolean(status));
            }else {
                 territories = territoryRepository.findTerritoryByRegionAndName(search);
            }
            return ResponseEntity.ok(territories);
        }catch (Exception e){
            return ResponseEntity.status(404).body("An error has occurred");
        }
    }
}

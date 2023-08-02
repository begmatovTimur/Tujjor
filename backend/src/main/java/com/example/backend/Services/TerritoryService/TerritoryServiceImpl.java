package com.example.backend.Services.TerritoryService;

import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Entity.Territory;
import com.example.backend.Projection.TerritoryProjection;
import com.example.backend.Repository.TerritoryRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TerritoryServiceImpl implements TerritoryService{
    private final TerritoryRepository territoryRepository;


    @Override
    public Territory addTerritory(TerritoryDTO territory) {
        return territoryRepository.save(generateNewTerritory(territory));
    }

    @Override
    public Territory updateTerritory(UUID id, TerritoryDTO territory) {
        Territory territoryData = generateNewTerritory(territory);
        territoryData.setId(id);
        return territoryRepository.save(territoryData);
    }

    @Override
    public HttpEntity<?> getFilteredTerritory(HttpServletRequest request) {
        try {
            JsonNode jsonNode = WrapFromStringToObject(request);
            List<TerritoryProjection> territories;
            if(!jsonNode.get("active").asText().equals("")){
                territories = territoryRepository.findTerritoryByActiveAndRegionName(jsonNode.get("quickSearch").asText(),jsonNode.get("active").asBoolean());
            }else {
                territories = territoryRepository.findTerritoryByRegionAndName(jsonNode.get("quickSearch").asText());
            }
                return ResponseEntity.ok(territories);
        }catch (Exception e){
            return ResponseEntity.status(404).body("An error has occurred");
        }
    }

    private static JsonNode WrapFromStringToObject(HttpServletRequest request) throws JsonProcessingException {
        String value = request.getHeader("searchParam");
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readTree(value);
    }

    private Territory generateNewTerritory(TerritoryDTO territory) {
        return Territory.builder()
                .region(territory.getRegion())
                .name(territory.getName())
                .code(territory.getCode())
                .active(territory.getActive())
                .longitude(territory.getLongitude())
                .latitude(territory.getLatitude())
                .build();
    }
}

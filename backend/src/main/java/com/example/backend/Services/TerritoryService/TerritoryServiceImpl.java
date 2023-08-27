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
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TerritoryServiceImpl implements TerritoryService {
    private final TerritoryRepository territoryRepository;


    @Override
    public Territory addTerritory(TerritoryDTO territory) {
        return territoryRepository.save(generateNewTerritory(territory));
    }

    @Override
    public Territory updateTerritory(UUID id, TerritoryDTO territory) {
        Territory territoryData = generateUpdatedTerritory(territory,id);
        assert territoryData != null;
        territoryData.setId(id);
        return territoryRepository.save(territoryData);
    }

    private Territory generateUpdatedTerritory(TerritoryDTO territory, UUID id) {
        return Territory.builder()
                .region(territory.getRegion())
                .name(territory.getName())
                .code(territory.getCode())
                .active(territory.getActive())
                .longitude(territory.getLongitude())
                .latitude(territory.getLatitude())
                .insertionTime(territoryRepository.findById(id).get().getInsertionTime())
                .build();
    }

    private static JsonNode WrapFromStringToObject(HttpServletRequest request) throws JsonProcessingException {
        String value = request.getHeader("searchParam");
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readTree(value);
    }


    public ResponseEntity<InputStreamResource> downloadExcel(List<?> data, List<String> headers) {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("User Data");
            int rowIdx = 0;

            // Create a header row
            Row headerRow = sheet.createRow(rowIdx++);
            for (int i = 0; i < headers.size(); i++) {
                headerRow.createCell(i).setCellValue(headers.get(i));
            }// Populate the data rows using reflection
            for (Object obj : data) {
                Row dataRow = sheet.createRow(rowIdx++);
                int colIdx = 0;
                for (String header : headers) {
                    Object value = getPropertyValue(obj, header);
                    dataRow.createCell(colIdx++).setCellValue(value == null ? "" : value.toString());
                }
            }

            // Convert the workbook to a byte array
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            workbook.write(baos);
            byte[] bytes = baos.toByteArray();

            // Prepare the response for download
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.add("Content-Disposition", "attachment; filename=user_data.xlsx");

            // Create an InputStreamResource from the byte array
            InputStreamResource inputStreamResource = new InputStreamResource(new ByteArrayInputStream(bytes));

            return ResponseEntity
                    .ok()
                    .headers(responseHeaders)
                    .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                    .body(inputStreamResource);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }


    private Object getPropertyValue(Object obj, String propertyName) {
        try {
            Field field = obj.getClass().getDeclaredField(propertyName);
            field.setAccessible(true);
            return field.get(obj);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    private Territory generateNewTerritory(TerritoryDTO territory) {
        return Territory.builder()
                .region(territory.getRegion())
                .name(territory.getName())
                .code(territory.getCode())
                .active(territory.getActive())
                .longitude(territory.getLongitude())
                .latitude(territory.getLatitude())
                .insertionTime(LocalDateTime.now())
                .build();
    }


    @Override
    public HttpEntity<?> getTerritories() {
        List<Territory> territories = territoryRepository.findAll();
        return ResponseEntity.ok(territories);
    }

    @Override
    public HttpEntity<?> pagination(Integer page, String limit, HttpServletRequest request) {

            try {
                if(limit.equals("All")){
                    List<Territory> territoryRepositoryAll = territoryRepository.findAll();
                    limit = String.valueOf(territoryRepositoryAll.size());
                }
                Pageable pageable = PageRequest.of(page, Integer.parseInt(limit));
                JsonNode jsonNode = WrapFromStringToObject(request);
                Page<TerritoryProjection> territories = territoryRepository.getFilteredData(jsonNode.get("quickSearch").asText(),
                        jsonNode.get("active").asText(), pageable);
                return ResponseEntity.ok(territories);
            } catch (Exception e) {
                return ResponseEntity.status(404).body("An error has occurred");
            }
    }



    @Override
    public HttpEntity<?> getTerritoryRegion() {
        try {
            return ResponseEntity.ok(territoryRepository.findAllRegion());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error has occurred");
        }
    }
}

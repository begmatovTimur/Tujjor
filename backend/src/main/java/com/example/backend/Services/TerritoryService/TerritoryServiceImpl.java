package com.example.backend.Services.TerritoryService;

import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Entity.Territory;
import com.example.backend.Projection.TerritoryProjection;
import com.example.backend.Repository.TerritoryRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.lang.reflect.Field;
import java.net.URLEncoder;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;

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
        Territory territoryData = generateNewTerritory(territory);
        territoryData.setId(id);
        return territoryRepository.save(territoryData);
    }

    @Override
    public HttpEntity<?> getFilteredTerritory(HttpServletRequest request) {
        try {
            JsonNode jsonNode = WrapFromStringToObject(request);
            List<TerritoryProjection> territories;
            if (!jsonNode.get("active").asText().equals("")) {
                territories = territoryRepository.findTerritoryByActiveAndRegionName(jsonNode.get("quickSearch").asText(), jsonNode.get("active").asBoolean());
            } else {
                territories = territoryRepository.findTerritoryByRegionAndName(jsonNode.get("quickSearch").asText());
            }
            return ResponseEntity.ok(territories);
        } catch (Exception e) {
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

    @Override
    public HttpEntity<?> getTerritories() {
        return ResponseEntity.ok(territoryRepository.findAll());
    }

    @Override
    public HttpEntity<?> pagination(Integer page, Integer limit) {
        PageRequest pageable = PageRequest.of(page, limit);
        List<Territory> allTerritories = territoryRepository.findAll(pageable).getContent();

        // Manually set the total count to 1 if there's only one element in the database
        if (allTerritories.isEmpty() && territoryRepository.count() == 1) {
            return ResponseEntity.ok(new PageImpl<>(List.of(territoryRepository.findAll().get(0)), pageable, 1));
        }

        return ResponseEntity.ok(new PageImpl<>(allTerritories, pageable, allTerritories.size()));
    }

    @Override
    public ResponseEntity<Resource> getExcelFile() throws IOException {
        List<Territory> territoryFilter = territoryRepository.findAll();
        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Company info");
        Row row = sheet.createRow(0);
        row.createCell(0).setCellValue("ID");
        row.createCell(1).setCellValue("Region");
        row.createCell(2).setCellValue("Name");
        row.createCell(3).setCellValue("Code");
        row.createCell(4).setCellValue("Active");
        row.createCell(5).setCellValue("Longitude");
        row.createCell(6).setCellValue("Latitude");
        int counter = 1;
        for (Territory territory : territoryFilter) {
            Row dataRow = sheet.createRow(counter);
            counter++;
            dataRow.createCell(0).setCellValue(territory.getId().toString());
            dataRow.createCell(1).setCellValue(territory.getRegion());
            dataRow.createCell(2).setCellValue(territory.getName());
            dataRow.createCell(3).setCellValue(territory.getCode());
            dataRow.createCell(4).setCellValue(territory.getActive());
            dataRow.createCell(5).setCellValue(territory.getLongitude());
            dataRow.createCell(6).setCellValue(territory.getLatitude());
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        ByteArrayResource resource = new ByteArrayResource(outputStream.toByteArray());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=CompanyInfo.xlsx");

        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .body(resource);
    }



}

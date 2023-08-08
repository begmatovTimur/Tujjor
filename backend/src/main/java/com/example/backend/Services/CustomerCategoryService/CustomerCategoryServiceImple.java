package com.example.backend.Services.CustomerCategoryService;

import com.example.backend.DTO.CustomerCategoryDTO;
import com.example.backend.DTO.SearchActiveDTO;
import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import com.example.backend.Projection.CompanyProjection;
import com.example.backend.Projection.CustomerCategoryProjection;
import com.example.backend.Projection.TerritoryProjection;
import com.example.backend.Repository.CompanyRepository;
import com.example.backend.Repository.CustomerCategoryRepository;
import com.example.backend.Services.CompanyService.CompanyService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
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
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CustomerCategoryServiceImple implements CustomerCategoryService {
    private final CustomerCategoryRepository customerCategoryRepository;
    @Override
    public CustomerCategory addCategory(CustomerCategoryDTO categoryDTO) {
        return customerCategoryRepository.save(generateNewTerritory(categoryDTO));
    }

    @Override
    public CustomerCategory updateCategory(Integer id, CustomerCategoryDTO categoryDTO) {
        CustomerCategory territoryData = generateNewTerritory(categoryDTO);
        territoryData.setId(id);
        return customerCategoryRepository.save(territoryData);
    }

    private static JsonNode WrapFromStringToObject(HttpServletRequest request) throws JsonProcessingException {
        String value = request.getHeader("searchParam");
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readTree(value);
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

    private CustomerCategory generateNewTerritory(CustomerCategoryDTO categoryDTO) {
        return CustomerCategory.builder()
                .id(null)
                .code(categoryDTO.getCode())
                .name(categoryDTO.getName())
                .description(categoryDTO.getDescription())
                .region(categoryDTO.getRegion())
                .active(categoryDTO.isActive())
                .build();
    }


    @Override
    public HttpEntity<?> getCategories() {
        List<CustomerCategory> categories = customerCategoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }

    @Override
    public HttpEntity<?> pagination(Integer page, Integer limit, HttpServletRequest request) {
        try {
            Pageable pageable = PageRequest.of(page, limit);
            JsonNode jsonNode = WrapFromStringToObject(request);
            Page<CustomerCategoryProjection> territories;
            if (!jsonNode.get("active").asText().equals("")) {
                territories = customerCategoryRepository.findCustomerCategoryByActiveAndRegionName(jsonNode.get("quickSearch").asText(),
                        jsonNode.get("active").asBoolean(),pageable);
            } else {
                territories = customerCategoryRepository.findCustomerCategoryByRegionAndName(jsonNode.get("quickSearch").asText(), pageable);
            }
            if (territories.isEmpty() && customerCategoryRepository.count() == 1) {
                return ResponseEntity.ok(new PageImpl<>(List.of(customerCategoryRepository.findAll().get(0)), pageable, 1));
            }
            return ResponseEntity.ok(territories);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("An error has occurred");
        }
    }

    @Override
    public ResponseEntity<Resource> getExcelFile(SearchActiveDTO dto) throws IOException {
        List<CustomerCategoryProjection> territoryFilter = null;
        if (dto.getActive().equals("ALL")) {
            territoryFilter = customerCategoryRepository.findByQuickSearchWithoutActive(dto.getQuickSearch());
        } else {
            territoryFilter = customerCategoryRepository.findByQuickSearch(Boolean.valueOf(dto.getActive()),dto.getQuickSearch());
        }
        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Company info");
        Row row = sheet.createRow(0);
        row.createCell(0).setCellValue("ID");
        row.createCell(1).setCellValue("Name");
        row.createCell(2).setCellValue("Email");
        row.createCell(3).setCellValue("Region");
        row.createCell(3).setCellValue("Support Phone");
        row.createCell(3).setCellValue("Address");
        int counter = 1;
        for (CustomerCategoryProjection territory : territoryFilter) {
            Row dataRow = sheet.createRow(counter);
            counter++;
            dataRow.createCell(0).setCellValue(territory.getId().toString());
            dataRow.createCell(1).setCellValue(territory.getCode());
            dataRow.createCell(2).setCellValue(territory.getName());
            dataRow.createCell(3).setCellValue(territory.getDescription());
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

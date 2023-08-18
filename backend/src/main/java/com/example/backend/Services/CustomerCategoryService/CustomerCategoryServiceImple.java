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
import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.*;
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
            return ResponseEntity.ok(territories);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("An error has occurred");
        }
    }

    @Override
    @SneakyThrows
    public ResponseEntity<Resource> getExcelFile(HttpServletRequest request,String columns) throws IOException {
        System.out.println(columns);
        String[] headersStr = columns.split("\\.");
        List<CustomerCategoryProjection> territoryFilter = null;
        JsonNode jsonNode = WrapFromStringToObject(request);
        System.out.println(jsonNode.get("active"));
        System.out.println(jsonNode.get("quickSearch"));
        territoryFilter = customerCategoryRepository.getFilteredDataForExcel(jsonNode.get("active").asText(), jsonNode.get("quickSearch").asText());
        XSSFWorkbook workbook = new XSSFWorkbook();
        int rowIdx = 0;
        Sheet sheet = workbook.createSheet("Company info");
        Row headerRow = sheet.createRow(rowIdx++);
        for (int i = 0; i < headersStr.length; i++) {
            headerRow.createCell(i).setCellValue(headersStr[i]);
        }

        System.err.println(territoryFilter.size());
        for (CustomerCategoryProjection territory : territoryFilter) {
            Row dataRow = sheet.createRow(rowIdx++);
            int columnIndex = 0; // Introduce a separate variable for the column index
            for (int i = 0; i < headersStr.length; i++) {
                System.out.println(headersStr[i].replaceAll("\"", ""));
                switch (headersStr[i].replaceAll("\"", "")) {
                    case "Name":
                        dataRow.createCell(columnIndex++).setCellValue(territory.getName().toString().replaceAll("\"", ""));
                        break;
                    case "Region":
                        dataRow.createCell(columnIndex++).setCellValue(territory.getRegion().toString().replaceAll("\"", ""));
                        break;
                    case "Code":
                        dataRow.createCell(columnIndex++).setCellValue(territory.getCode().toString().replaceAll("\"", ""));
                        break;
                    // Add more cases for other fields as needed
                }
            }
        }
        CellStyle headerCellStyle = workbook.createCellStyle();
        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerCellStyle.setFont(headerFont);

        CellStyle dataCellStyle = workbook.createCellStyle();
        dataCellStyle.setWrapText(true);
        for (Cell cell : headerRow) {
            cell.setCellStyle(headerCellStyle);
            int columnIndex = cell.getColumnIndex();
            sheet.autoSizeColumn(columnIndex);
        }

// Apply styles to data rows and auto-size columns
        for (Row row : sheet) {
            for (Cell cell : row) {
                cell.setCellStyle(dataCellStyle);
                int columnIndex = cell.getColumnIndex();
                sheet.autoSizeColumn(columnIndex);
            }
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

package com.example.backend.Services.ExcelService;

import com.example.backend.Entity.Territory;
import com.example.backend.Payload.Reaquest.FilterData;
import com.example.backend.Projection.ClientProjection;
import com.example.backend.Projection.CustomerCategoryProjection;
import com.example.backend.Projection.ExcelExportable;
import com.example.backend.Projection.TerritoryProjection;
import com.example.backend.Repository.ClientRepository;
import com.example.backend.Repository.CompanyRepository;
import com.example.backend.Repository.CustomerCategoryRepository;
import com.example.backend.Repository.TerritoryRepository;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static com.example.backend.Services.ExcelService.ExcelServiceImpl.generateHeaders;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class ExcelServiceImplTest {
    @Mock
    ExcelService underTest;
    @Mock
    UniversalServiceFilter universalServiceFilter;
    @Mock
    TerritoryRepository territoryRepository;
    @Mock
    CustomerCategoryRepository customerCategoryRepository;
    @Mock
    CompanyRepository companyRepository;
    @Mock
    ClientRepository clientRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        underTest = new ExcelServiceImpl(universalServiceFilter, territoryRepository, customerCategoryRepository, companyRepository, clientRepository);
    }


    @Test
    public void testGenerateHeaders() {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Sheet");
        Row headerRow = sheet.createRow(0);

        String[] headers = {"Header1", "Header2", "Header3"};
        ExcelServiceImpl.generateHeaders(headerRow, headers, workbook, sheet);

        // Verify that the headers are correctly generated
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.getCell(i);
            assertNotNull(cell);
            assertEquals(headers[i], cell.getStringCellValue().replaceAll("\"", ""));
        }

        // Verify that the workbook and sheet are updated accordingly
        assertEquals(3, sheet.getRow(0).getLastCellNum());
    }

    @Test
    public void testGenerateBody() {
        // Create test data
        List<ExcelExportable> testData = new ArrayList<>();
        // Add test objects to testData

        String[] testColumns = {"Column1", "Column2", "Column3"};

        Sheet testSheet = new XSSFWorkbook().createSheet("TestSheet");
        int startRow = 0;

        try {
            ExcelServiceImpl.generateBody(testData, testColumns, startRow, testSheet);
            // Additional assertions or verifications
        } catch (NoSuchFieldException | IllegalAccessException e) {
            // Handle or fail the test based on the exception
        }
    }


        @Test
    void itShouldCapitalizeLetter() {
        String input = "test";
        String capitalizedInputLetter = ExcelServiceImpl.capitalizeFirstLetter(input);
        Assertions.assertEquals(capitalizedInputLetter, "Test");
    }


    @Test
    void itShouldGetFieldByValue() {

        UUID generatedId = UUID.randomUUID();

        Territory territory = Territory.builder()
                .id(generatedId)
                .build();

        Object fieldValue = ExcelServiceImpl.getFieldValue(territory, "id");

        Assertions.assertEquals(fieldValue.toString(), generatedId.toString());
    }

    ;


}
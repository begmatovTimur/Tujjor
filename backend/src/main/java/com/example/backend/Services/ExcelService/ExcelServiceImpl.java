package com.example.backend.Services.ExcelService;

import com.example.backend.Payload.Reaquest.FilterData;
import com.example.backend.Repository.TerritoryRepository;
import com.example.backend.Services.Universal.UniversalService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExcelServiceImpl implements ExcelService {
    private final UniversalService universalService;
    private final TerritoryRepository territoryRepository;

    @Override
    @SneakyThrows
    public ResponseEntity<Resource> getExcel(HttpServletRequest request, String[] headers, String component, HttpServletResponse response) {

        List<Object> bodyOfExcel = new ArrayList<>();

        FilterData filters = universalService.generateFilterDataFromRequest(request);

        if(component.equals("territory")) {
            territoryRepository.getFilteredDataForExcel(filters.getQuickSearch(),filters.getActive().toString());
        }

        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Sheet1");

        // Create a row for headers
        Row headerRow = sheet.createRow(0);

        generateHeaders(headerRow, headers, workbook); // generating headers

        int rowNum = 1; // Start from the second row

        generateBody();

        // Define header values

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ByteArrayResource resource = new ByteArrayResource(outputStream.toByteArray());

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        workbook.write(response.getOutputStream());
        workbook.close();
        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(responseHeaders)
                .body(resource);
    }

    private void generateBody() {

    }


    public Object getFieldValue(Object obj, String fieldName) {
        Class<?> clazz = obj.getClass();

        try {
            Field field = clazz.getDeclaredField(fieldName);
            field.setAccessible(true);
            return field.get(obj);
        } catch (Exception e) {
            e.printStackTrace(); // Handle exceptions appropriately
            return null;
        }
    }


    private void generateHeaders(Row headerRow, String[] headers, Workbook workbook) {
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            // You can also style the header cell if needed
            CellStyle headerCellStyle = workbook.createCellStyle();
            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerCellStyle.setFont(headerFont);
            headerCellStyle.setFillBackgroundColor(IndexedColors.LIGHT_BLUE.getIndex());
            headerCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            cell.setCellStyle(headerCellStyle);
        }
    }
}

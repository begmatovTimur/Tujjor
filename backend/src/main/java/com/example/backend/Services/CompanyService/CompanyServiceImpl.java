package com.example.backend.Services.CompanyService;

import com.example.backend.Entity.Company;
import com.example.backend.Projection.CompanyProjection;
import com.example.backend.Projection.CustomerCategoryProjection;
import com.example.backend.Projection.TerritoryProjection;
import com.example.backend.Repository.CompanyRepository;
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
import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyServiceImpl implements CompanyService {
    private final CompanyRepository companyRepository;

    @Override
    public List<Company> getComapanies() {
        return companyRepository.findAll();
    }

    @Override
    @SneakyThrows
    public ResponseEntity<Resource> getExcel(String columns) {
        String[] headersStr = columns.split("\\.");
        List<Company> all = companyRepository.findAll();
        XSSFWorkbook workbook = new XSSFWorkbook();
        int rowIdx = 0;
        Sheet sheet = workbook.createSheet("Company info");
        Row headerRow = sheet.createRow(rowIdx++);
        for (int i = 0; i < headersStr.length; i++) {
            headerRow.createCell(i).setCellValue(headersStr[i]);
        }

        for (Company territory : all) {
            Row dataRow = sheet.createRow(rowIdx++);
            int columnIndex = 0; // Introduce a separate variable for the column index
            for (int i = 0; i < headersStr.length; i++) {
                System.out.println(headersStr[i].replaceAll("\"", ""));
                switch (headersStr[i].replaceAll("\"", "")) {
                    case "Name":
                        dataRow.createCell(columnIndex++).setCellValue(territory.getCompanyName().replaceAll("\"", ""));
                        break;
                    case "Region":
                        dataRow.createCell(columnIndex++).setCellValue(territory.getRegion().replaceAll("\"", ""));
                        break;
                    case "Phone":
                        dataRow.createCell(columnIndex++).setCellValue(territory.getSupportPhone().replaceAll("\"", ""));
                        break;
                    case "Email @":
                        dataRow.createCell(columnIndex++).setCellValue(territory.getEmail().replaceAll("\"", ""));
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

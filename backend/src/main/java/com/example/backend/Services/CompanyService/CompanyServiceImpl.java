package com.example.backend.Services.CompanyService;

import com.example.backend.Entity.Company;
import com.example.backend.Projection.CompanyProjection;
import com.example.backend.Projection.CustomerCategoryProjection;
import com.example.backend.Repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
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
    public ResponseEntity<Resource> getExcel() {
        List<CompanyProjection> all = companyRepository.findAllExcludingSupervisor();
        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Company info");
        Row row = sheet.createRow(0);
        row.createCell(0).setCellValue("ID");
        row.createCell(1).setCellValue("Name");
        row.createCell(2).setCellValue("Support Phone");
        row.createCell(3).setCellValue("Email");
        row.createCell(4).setCellValue("Region");
        row.createCell(5).setCellValue("Address");
        int counter = 1;
        for (CompanyProjection territory : all) {
            Row dataRow = sheet.createRow(counter);
            counter++;
            dataRow.createCell(0).setCellValue(territory.getId());
            dataRow.createCell(1).setCellValue(territory.getCompanyName());
            dataRow.createCell(2).setCellValue(territory.getSupportPhone());
            dataRow.createCell(3).setCellValue(territory.getEmail());
            dataRow.createCell(4).setCellValue(territory.getRegion());
            dataRow.createCell(5).setCellValue(territory.getAddress());
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

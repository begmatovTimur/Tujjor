package com.example.backend.Controller;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.FileOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.util.List;

@RestController
@RequestMapping("/api/excel")
public class ExcelController {

    @PostMapping
    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public void downloadExcelFile(@RequestBody List<Object> body) {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Sheet1");

            int rowNum = 0;
            for (Object data : body) {
                Row row = sheet.createRow(rowNum++);
                int cellNum = 0;

                // Get the fields of the object using reflection
                Field[] fields = data.getClass().getDeclaredFields();

                for (Field field : fields) {
                    field.setAccessible(true);
                    Object cellValue = field.get(data);
                    Cell cell = row.createCell(cellNum++);
                    cell.setCellValue(cellValue != null ? cellValue.toString() : "");
                }
            }

            try (FileOutputStream outputStream = new FileOutputStream("data.xlsx")) {
                workbook.write(outputStream);
            }
        } catch (IOException | IllegalAccessException e) {
            e.printStackTrace();
            // Handle the exception as needed
        }
    }
}

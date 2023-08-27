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
import com.example.backend.Services.Universal.UniversalService;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExcelServiceImpl implements ExcelService {
    private final UniversalService universalService;
    private final TerritoryRepository territoryRepository;
    private final CustomerCategoryRepository categoryRepository;
    private final CompanyRepository companyRepository;
    private final ClientRepository clientRepository;

    @Override
    public ResponseEntity<Resource> getExcel(HttpServletRequest request, String[] headers, String component, HttpServletResponse response) {

        List<ExcelExportable> dataOfExcel = new ArrayList<>();

        FilterData filters = universalService.generateFilterDataFromRequest(request);

        Pageable pageable = filters.getLimit().equals("All") ? Pageable.unpaged() :
                PageRequest.of(filters.getPage(), Integer.parseInt(filters.getLimit()));

        if (component.equals("territory")) {
            if(filters.getLimit().equals("All")){
                filters.setLimit(String.valueOf(territoryRepository.count()));
            }
            pageable = PageRequest.of(filters.getPage(), Integer.parseInt(filters.getLimit()));
            Page<TerritoryProjection> territories = territoryRepository.getFilteredData(filters.getQuickSearch(),
                    filters.getActive(), pageable);

            dataOfExcel.addAll(territories.getContent());
        }else if(component.equals("customer-category")) {

            Page<CustomerCategoryProjection> categories;

            if (!filters.getActive().equals("")) {
                 categories = categoryRepository.findCustomerCategoryByActiveAndRegionName(filters.getQuickSearch(),
                        Boolean.valueOf(filters.getActive()), pageable);
            } else {
                categories = categoryRepository.findCustomerCategoryByRegionAndName(filters.getQuickSearch(), pageable);
            }

            dataOfExcel.addAll(categories.getContent());
        } else if(component.equals("company-profile")) {
            dataOfExcel.addAll(companyRepository.findAll());
        }else if(component.equals("clients")) {
            Page<ClientProjection> filteredData = clientRepository.getAllFilteredFields(filters.getCities(), filters.getCustomerCategories(), filters.getActive(), filters.getTin(), filters.getQuickSearch(), pageable);
            dataOfExcel.addAll(filteredData.getContent());
        }



        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Sheet");

        // Create a row for headers
        int rowNum = 0;
        Row headerRow = sheet.createRow(rowNum);

        generateHeaders(headerRow, headers,workbook); // generating headers

        try {
            generateBody(dataOfExcel, headers, ++rowNum, sheet);
        } catch (NoSuchFieldException e) {
            e.printStackTrace();
        } catch (IllegalAccessException e) {
            e.printStackTrace();
        }

        // Define header values

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        ByteArrayResource resource = new ByteArrayResource(outputStream.toByteArray());

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        responseHeaders.add("Content-Disposition", "attachment; filename=example.xlsx");

        try {
            workbook.write(response.getOutputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
        try {
            workbook.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(responseHeaders)
                .body(resource);
    }

    public void generateBody(List<?> objects, String[] columns, int rowNum, Sheet sheet) throws NoSuchFieldException, IllegalAccessException {
        for (int i = 0; i < objects.size(); i++) {
            Row row = sheet.createRow(rowNum++);

            Object item = objects.get(i);

            for (int l = 0; l < columns.length; l++) {
                String col = columns[l].replaceAll("\"", "");

                Cell cell = row.createCell(l); // Create cell at the current column index
                Object o = getFieldValue(item, capitalizeFirstLetter(col));
                cell.setCellValue(o.toString());
            }
        }
    }





    public static Object getFieldValue(Object obj, String fieldName) {
        try {
            Method method = obj.getClass().getMethod("get" + capitalizeFirstLetter(fieldName));
            return method.invoke(obj);
        } catch (Exception e) {
            e.printStackTrace(); // Handle exceptions appropriately
            return null;
        }
    }

    public static String capitalizeFirstLetter(String input) {
        return input.substring(0, 1).toUpperCase() + input.substring(1);
    }


    private void generateHeaders(Row headerRow, String[] headers,Workbook workbook) {
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            CellStyle cellStyle = workbook.createCellStyle();
            cellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            cellStyle.setFillBackgroundColor(IndexedColors.GREY_80_PERCENT.getIndex());
            Font font = workbook.createFont();
            font.setColor(IndexedColors.WHITE.getIndex());
            cell.setCellStyle(cellStyle);
            cellStyle.setFont(font);
            cell.setCellValue(headers[i].replaceAll("\"","")); // Set header value to "a"
        }
    }


}

package com.example.backend.Services.ExcelService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

public interface ExcelService {
    ResponseEntity<Resource> getExcel(HttpServletRequest request, String[] headers, String component, HttpServletResponse response);
}

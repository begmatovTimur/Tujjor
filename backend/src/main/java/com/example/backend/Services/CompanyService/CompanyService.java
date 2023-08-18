package com.example.backend.Services.CompanyService;

import com.example.backend.Entity.Company;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CompanyService {
    List<Company> getComapanies();

    ResponseEntity<Resource> getExcel(String columns);
}

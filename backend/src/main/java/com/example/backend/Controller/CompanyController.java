package com.example.backend.Controller;

import com.example.backend.DTO.CompanyProfileDTO;
import com.example.backend.DTO.CustomerCategoryDTO;
import com.example.backend.DTO.SearchActiveDTO;
import com.example.backend.Services.CompanyService.CompanyService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;
    @GetMapping
    HttpEntity<?> getCompanies() {
      return ResponseEntity.ok(companyService.getComapanies());
    };

    @GetMapping("/excel")
    public ResponseEntity<Resource> excel() throws IOException {
        return companyService.getExcel();
    };

}

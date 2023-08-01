package com.example.backend.Controller;

import com.example.backend.Services.CompanyService.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.http.HttpEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @PreAuthorize("isAuthenticated()")
    @GetMapping()
    public HttpEntity<?> getCompany(@RequestParam(defaultValue = "") String search){
        return companyService.getFilteredCompanies(search);
    }
}

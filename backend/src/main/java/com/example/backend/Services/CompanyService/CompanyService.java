package com.example.backend.Services.CompanyService;

import org.springframework.http.HttpEntity;

public interface CompanyService {
    HttpEntity<?> getFilteredCompanies(String value);
}

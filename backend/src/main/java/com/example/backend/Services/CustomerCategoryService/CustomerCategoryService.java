package com.example.backend.Services.CustomerCategoryService;


import org.springframework.http.HttpEntity;

public interface CustomerCategoryService {

    HttpEntity<?> getFilteredCustomerCategory(String search, String status);
}

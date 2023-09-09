package com.example.backend.Services.CustomerCategoryService;


import com.example.backend.DTO.CustomerCategoryDTO;
import com.example.backend.DTO.SearchActiveDTO;
import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.UUID;

public interface CustomerCategoryService {

    CustomerCategory addCategory(CustomerCategoryDTO categoryDTO);

    CustomerCategory updateCategory(Integer id, CustomerCategoryDTO categoryDTO);

    HttpEntity<?> getCategories();


    HttpEntity<?> getCategoriesForTelegram();
}

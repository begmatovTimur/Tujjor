package com.example.backend.Controller;

import com.example.backend.DTO.CustomerCategoryDTO;
import com.example.backend.DTO.SearchActiveDTO;
import com.example.backend.Services.CustomerCategoryService.CustomerCategoryService;
import com.example.backend.Services.Universal.UniversalService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer-category")
public class CustomerCategoryController {

    private final CustomerCategoryService categoryService;
    private final UniversalService universalService;

    @GetMapping("/pagination")
    public HttpEntity<?> pagination(@RequestParam Integer page, @RequestParam String limit, HttpServletRequest request) {
        return universalService.pagination(page, limit, request,"customer_category");
    };

    @GetMapping()
    public HttpEntity<?> getCategories() {
        return categoryService.getCategories();
    }

    @PostMapping()
    public HttpEntity<?> saveCustomerCategory(@RequestBody CustomerCategoryDTO categoryDTO) {
        return ResponseEntity.ok(categoryService.addCategory(categoryDTO));
    }

    @PutMapping("{id}")
    public HttpEntity<?> updateCategory(@PathVariable Integer id, @RequestBody CustomerCategoryDTO categoryDTO) {
        return ResponseEntity.ok(categoryService.updateCategory(id, categoryDTO));
    }
}

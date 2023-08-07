package com.example.backend.Controller;

import com.example.backend.Services.CustomerCategoryService.CustomerCategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customerCategory")
public class CustomerCategoryController {

    private final CustomerCategoryService categoryService;


//    @PreAuthorize("isAuthenticated()")
    @GetMapping("/pagination")
    public HttpEntity<?> getFilteredCategories(@RequestParam(defaultValue = "") String search, @RequestParam(defaultValue = "") String status){
        return categoryService.getFilteredCustomerCategory(search,status);
    }

//    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public HttpEntity<?> getCategories(){
        return categoryService.getCategories();
    }
}

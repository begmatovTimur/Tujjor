package com.example.backend.Services.CustomerCategoryService;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Projection.CompanyProjection;
import com.example.backend.Projection.CustomerCategoryProjection;
import com.example.backend.Projection.TerritoryProjection;
import com.example.backend.Repository.CompanyRepository;
import com.example.backend.Repository.CustomerCategoryRepository;
import com.example.backend.Services.CompanyService.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerCategoryServiceImple implements CustomerCategoryService {
    private final CustomerCategoryRepository customerCategoryRepository;

    @Override
    public HttpEntity<?> getFilteredCustomerCategory(String search, String status) {
        try {
            List<CustomerCategoryProjection> categories;
            if(!status.equals("")){
                categories = customerCategoryRepository.findCustomerCategoryByActiveAndRegionName(search, Boolean.parseBoolean(status));
            }else {
                categories = customerCategoryRepository.findCustomerCategoryByRegionAndName(search);
            }
            return ResponseEntity.ok(categories);
        }catch (Exception e){
            return ResponseEntity.status(500).body("An error has occurred");
        }
    }

    @Override
    public HttpEntity<?> getCategories() {
        try {
            List<CustomerCategory> categories = customerCategoryRepository.findAll();
            return ResponseEntity.ok(categories);
        }catch (Exception e){
            return ResponseEntity.status(500).body("An error has occurred");
        }
    }
}

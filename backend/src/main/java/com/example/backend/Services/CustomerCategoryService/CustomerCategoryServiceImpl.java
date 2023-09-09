package com.example.backend.Services.CustomerCategoryService;

import com.example.backend.DTO.CustomerCategoryDTO;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Repository.CustomerCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerCategoryServiceImpl implements CustomerCategoryService {
    private final CustomerCategoryRepository customerCategoryRepository;

    @Override
    public CustomerCategory addCategory(CustomerCategoryDTO categoryDTO) {
        return customerCategoryRepository.save(generateNewCustomerCategory(categoryDTO));
    }

    @Override
    public CustomerCategory updateCategory(Integer id, CustomerCategoryDTO categoryDTO) {
        CustomerCategory customerCategory = generateNewCustomerCategory(categoryDTO);
        customerCategory.setId(id);
        return customerCategoryRepository.save(customerCategory);
    }



    private CustomerCategory generateNewCustomerCategory(CustomerCategoryDTO categoryDTO) {
        return CustomerCategory.builder()
                .id(null)
                .code(categoryDTO.getCode())
                .name(categoryDTO.getName())
                .description(categoryDTO.getDescription())
                .region(categoryDTO.getRegion())
                .active(categoryDTO.isActive())
                .photoId(categoryDTO.getPhotoId())
                .build();
    }


    @Override
    public HttpEntity<?> getCategories() {
        List<Boolean> active = new ArrayList<>();
        active.add(true);
        active.add(false);
        return ResponseEntity.ok(customerCategoryRepository.findCustomerCategoryByActiveAndRegionName("",active,Pageable.unpaged()).getContent());
    }

    @Override
    public HttpEntity<?> getCategoriesForTelegram() {
        List<Boolean> active = new ArrayList<>();
        active.add(true);
        return ResponseEntity.ok(customerCategoryRepository.findCustomerCategoryByActiveAndRegionName("",active,Pageable.unpaged()).getContent());
    }


}

package com.example.backend.Services.CustomerCategoryService;

import com.example.backend.DTO.CustomerCategoryDTO;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import com.example.backend.Payload.Reaquest.FilterData;
import com.example.backend.Projection.CustomerCategoryProjection;
import com.example.backend.Projection.TerritoryProjection;
import com.example.backend.Repository.CustomerCategoryRepository;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.lang.reflect.Field;
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
        CustomerCategory territoryData = generateNewCustomerCategory(categoryDTO);
        territoryData.setId(id);
        return customerCategoryRepository.save(territoryData);
    }



    private CustomerCategory generateNewCustomerCategory(CustomerCategoryDTO categoryDTO) {
        return CustomerCategory.builder()
                .id(null)
                .code(categoryDTO.getCode())
                .name(categoryDTO.getName())
                .description(categoryDTO.getDescription())
                .region(categoryDTO.getRegion())
                .active(categoryDTO.isActive())
                .build();
    }


    @Override
    public HttpEntity<?> getCategories() {
        List<Boolean> active = new ArrayList<>();
        active.add(true);
        active.add(false);
        return ResponseEntity.ok(customerCategoryRepository.findCustomerCategoryByActiveAndRegionName("",active,Pageable.unpaged()).getContent());
    }


}

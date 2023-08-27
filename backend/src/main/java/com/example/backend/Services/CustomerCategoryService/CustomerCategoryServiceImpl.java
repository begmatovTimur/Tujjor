package com.example.backend.Services.CustomerCategoryService;

import com.example.backend.DTO.CustomerCategoryDTO;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Payload.Reaquest.FilterData;
import com.example.backend.Projection.CustomerCategoryProjection;
import com.example.backend.Repository.CustomerCategoryRepository;
import com.example.backend.Services.Universal.UniversalService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerCategoryServiceImpl implements CustomerCategoryService {
    private final CustomerCategoryRepository customerCategoryRepository;
    private final UniversalService universalService;

    @Override
    public CustomerCategory addCategory(CustomerCategoryDTO categoryDTO) {
        return customerCategoryRepository.save(generateNewTerritory(categoryDTO));
    }

    @Override
    public CustomerCategory updateCategory(Integer id, CustomerCategoryDTO categoryDTO) {
        CustomerCategory territoryData = generateNewTerritory(categoryDTO);
        territoryData.setId(id);
        return customerCategoryRepository.save(territoryData);
    }


    private CustomerCategory generateNewTerritory(CustomerCategoryDTO categoryDTO) {
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
        List<CustomerCategory> categories = customerCategoryRepository.findAll();
        return ResponseEntity.ok(categories);
    }

    @Override
    public HttpEntity<?> pagination(Integer page, String limit, HttpServletRequest request) {
        if (universalService.validateParams(page, limit)) {
            return ResponseEntity.badRequest().body("Invalid page or limit value");
        }

        Pageable pageable = limit.equals("All") ? Pageable.unpaged() :
                PageRequest.of(page, Integer.parseInt(limit));

        FilterData filterData = universalService.generateFilterDataFromRequest(request);

        Page<CustomerCategoryProjection> territories;

        if (!filterData.getActive().equals("")) {
            territories = customerCategoryRepository.findCustomerCategoryByActiveAndRegionName(filterData.getQuickSearch(),
                    Boolean.valueOf(filterData.getActive()), pageable);
        } else {
            territories = customerCategoryRepository.findCustomerCategoryByRegionAndName(filterData.getQuickSearch(), pageable);
        }

        return ResponseEntity.ok(territories);
    }

}

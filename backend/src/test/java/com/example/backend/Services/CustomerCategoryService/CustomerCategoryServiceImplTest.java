package com.example.backend.Services.CustomerCategoryService;

import com.example.backend.DTO.CustomerCategoryDTO;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Projection.CustomerCategoryProjection;
import com.example.backend.Repository.CustomerCategoryRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.eq;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.*;

;

class CustomerCategoryServiceImplTest {

    @Mock
    CustomerCategoryService underTest;

    @Mock
    CustomerCategoryRepository customerCategoryRepository;


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        underTest = new CustomerCategoryServiceImpl(customerCategoryRepository);
    };

    @Test
    void itShouldAddCategory() {
        CustomerCategoryDTO categoryDTO = new CustomerCategoryDTO(); // Create a DTO as needed

        CustomerCategory generatedCategory = new CustomerCategory(); // Create a CustomerCategory object
        // Set properties of generatedCategory based on categoryDTO
        // ...

        when(customerCategoryRepository.save(any(CustomerCategory.class))).thenReturn(generatedCategory);

        CustomerCategory addedCategory = underTest.addCategory(categoryDTO);

        // Assertions
        assertNotNull(addedCategory);
        // You can add more assertions based on your actual implementation
    }


    @Test
    void testUpdateCategory() {
        Integer categoryId = 1;
        CustomerCategoryDTO categoryDTO = new CustomerCategoryDTO();
        // Set DTO properties as needed

        CustomerCategory generatedCategory = new CustomerCategory();
        // Set properties of generatedCategory based on categoryDTO
        // ...

        // Set the id for the generated category
        generatedCategory.setId(categoryId);

        when(customerCategoryRepository.save(any(CustomerCategory.class))).thenReturn(generatedCategory);

        CustomerCategory updatedCategory = underTest.updateCategory(categoryId, categoryDTO);

        assertNotNull(updatedCategory);
        assertEquals(categoryId, updatedCategory.getId());
        // You can add more assertions based on your actual implementation
    }



    @Test
    void itShouldGetCategories() {
        List<Boolean> active = new ArrayList<>();
        active.add(true);
        active.add(false);

        List<CustomerCategoryProjection> categoryList = new ArrayList<>(); // Create your list of projections here

        Page<CustomerCategoryProjection> categoryPage = new PageImpl<>(categoryList); // Create a mock Page

        when(customerCategoryRepository.findCustomerCategoryByActiveAndRegionName(anyString(), eq(active), any(Pageable.class)))
                .thenReturn(categoryPage);

        ResponseEntity content = (ResponseEntity) underTest.getCategories();

        // Assertions
        assertEquals(HttpStatus.OK, content.getStatusCode());
    }
}
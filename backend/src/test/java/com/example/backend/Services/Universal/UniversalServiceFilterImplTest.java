package com.example.backend.Services.Universal;

import com.example.backend.Payload.Reaquest.FilterData;
import com.example.backend.Projection.TerritoryProjection;
import com.example.backend.Repository.ClientRepository;
import com.example.backend.Repository.CustomerCategoryRepository;
import com.example.backend.Repository.TerritoryRepository;
import com.example.backend.Services.Universal.PaginationConfig;
import com.example.backend.Services.Universal.UniversalServiceFilterImpl;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class UniversalServiceFilterImplTest {

    @Mock
    private ClientRepository clientRepository;

    @Mock
    private TerritoryRepository territoryRepository;

    @Mock
    private CustomerCategoryRepository customerCategoryRepository;

    @Mock
    private HttpServletRequest request;

    private UniversalServiceFilterImpl underTest;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        underTest =     new UniversalServiceFilterImpl(clientRepository, territoryRepository, customerCategoryRepository);
    }


    @Test
    void testGenerateComponentDataForTerritory() {
        PaginationConfig paginationConfig = PaginationConfig.builder()
                .component("territory")
                .pageable(Pageable.unpaged())
                .filterData(FilterData.builder().build())
                .pagination(Page.empty())
                .build();

        Page<TerritoryProjection> expectedData = Page.empty();
        when(territoryRepository.getFilteredData(any(), any(), any())).thenReturn(expectedData);

        underTest.generateComponentData(paginationConfig);

        verify(territoryRepository).getFilteredData(any(), any(), any());

        assertEquals(expectedData, paginationConfig.getPagination());
    }

    @Test
    void testGenerateFilterDataFromRequest() throws Exception {
        // Mock the behavior of the request.getHeader method
        when(request.getHeader("searchParam")).thenReturn("{\"city\": [\"6a68131a-45ce-47f5-9531-43e4d47f54a7\", \"5991093f-e7e1-4ef9-b59b-5ba0d18f774a\"], \"active\": [true, false], \"customerCategories\": [1, 2], \"tin\": \"123\", \"quickSearch\": \"search\", \"limit\": \"10\", \"page\": 2}");

        FilterData result = underTest.generateFilterDataFromRequest(request);

        FilterData expected = FilterData.builder()
                .tin("123")
                .active(List.of(true, false))
                .cities(List.of(UUID.fromString("6a68131a-45ce-47f5-9531-43e4d47f54a7"), UUID.fromString("5991093f-e7e1-4ef9-b59b-5ba0d18f774a")))
                .quickSearch("search")
                .page(1)
                .customerCategories(List.of(1, 2))
                .limit("10")
                .build();

        assertEquals(expected, result);
    }
    @Test
    void testWrapToObject() throws Exception {

        // Mock the behavior of the request.getHeader method
        when(request.getHeader("searchParam")).thenReturn("{\"param\": \"value\"}");

        JsonNode result = underTest.wrapToObject(request);

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode expected = objectMapper.readTree("{\"param\": \"value\"}");

        assertEquals(expected, result);
    }




    @Test
    void testPagination() {
        when(request.getHeader("searchParam")).thenReturn("{\"city\": [], \"active\": [], \"customerCategories\": [], \"tin\": \"\", \"quickSearch\": \"\", \"limit\": \"10\", \"page\": 1}");

        Pageable pageable = PageRequest.of(1, 10);

        PaginationConfig paginationConfig = PaginationConfig.builder()
                .component("clients")
                .pageable(pageable)
                .filterData(FilterData.builder().build())
                .pagination(Page.empty())
                .build();

        when(clientRepository.getAllFilteredFields(any(), any(), any(), any(), any(), any())).thenReturn(Page.empty());

        ResponseEntity<?> expectedResult = ResponseEntity.ok(Page.empty());

        HttpEntity<?> result = underTest.pagination(1, "10", request, "clients");

        assertEquals(expectedResult, result);
    }

}

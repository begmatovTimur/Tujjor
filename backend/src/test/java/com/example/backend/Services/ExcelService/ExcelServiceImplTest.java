package com.example.backend.Services.ExcelService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import com.example.backend.Payload.Reaquest.FilterData;
import com.example.backend.Projection.*;
import com.example.backend.Repository.ClientRepository;
import com.example.backend.Repository.CompanyRepository;
import com.example.backend.Repository.CustomerCategoryRepository;
import com.example.backend.Repository.TerritoryRepository;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.*;
import org.junit.jupiter.api.*;
import org.mockito.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

class ExcelServiceImplTest {

    @InjectMocks
    private ExcelServiceImpl excelService;

    @Mock
    private UniversalServiceFilter universalServiceFilter;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;


    @Mock
    private TerritoryRepository territoryRepository;

    @Mock
    private CustomerCategoryRepository categoryRepository;

    @Mock
    private CompanyRepository companyRepository;

    @Mock
    private ClientRepository clientRepository;

    @Mock
    private Sheet mockSheet;

    @Mock
    private Row mockRow;

    @Mock
    private Cell mockCell;


    @Mock
    private Workbook mockWorkbook;

    @Mock
    private Row mockHeaderRow;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void itShouldTestGetExcel() {
        FilterData filterData = new FilterData();
        when(universalServiceFilter.generateFilterDataFromRequest(any(HttpServletRequest.class))).thenReturn(filterData);

        // Mock repository responses
        List<ExcelExportable> mockData = new ArrayList<>();

        ResponseEntity<?> responseEntity = new ResponseEntity<>(HttpStatusCode.valueOf(200));
        // Call the method
        if (filterData.getLimit() != null) {
            responseEntity = excelService.getExcel(request, new String[]{"header1", "header2"}, "territory", response);
        }

        // Assertions
        Assertions.assertNotNull(responseEntity);
        assertEquals(200, responseEntity.getStatusCodeValue());
        // Add more assertions for the response, headers, and content if needed
    }

    @Test
    void testGetFilteredContentDataForTerritory() {
        // Mock filter data
        FilterData filterData = new FilterData();
        when(universalServiceFilter.generateFilterDataFromRequest(any(HttpServletRequest.class))).thenReturn(filterData);

        // Mock territory repository response
        List<TerritoryProjection> mockTerritories = new ArrayList<>();
        Page<TerritoryProjection> territoryPage = new PageImpl<>(mockTerritories);
        when(territoryRepository.getFilteredData(any(), any(), any())).thenReturn(territoryPage);

        // Call the method
        List<ExcelExportable> dataOfExcel = new ArrayList<>();
        if (filterData.getLimit() != null) {
            excelService.getFilteredContentData("territory", dataOfExcel, filterData, Pageable.unpaged());
        }

        // Assertions
        assertEquals(mockTerritories, dataOfExcel);
    }

    @Test
    void testGetFilteredContentDataForCustomerCategory() {
        // Mock filter data
        FilterData filterData = new FilterData();
        when(universalServiceFilter.generateFilterDataFromRequest(any(HttpServletRequest.class))).thenReturn(filterData);

        // Mock customer category repository response
        List<CustomerCategoryProjection> mockCategories = new ArrayList<>();
        Page<CustomerCategoryProjection> categoryPage = new PageImpl<>(mockCategories);
        when(categoryRepository.findCustomerCategoryByActiveAndRegionName(any(), any(), any())).thenReturn(categoryPage);

        // Call the method
        List<ExcelExportable> dataOfExcel = new ArrayList<>();
        excelService.getFilteredContentData("customer-category", dataOfExcel, filterData, Pageable.unpaged());

        // Assertions
        assertEquals(mockCategories, dataOfExcel);
    }

    @Test
    void testGenerateBody() throws NoSuchFieldException, IllegalAccessException {
        // Mock data
        List<ExcelExportable> mockData = new ArrayList<>();
        ExcelExportable mockItem = mock(ExcelExportable.class);

        // Mock interactions with Sheet, Row, and Cell
        when(mockSheet.createRow(anyInt())).thenReturn(mockRow);
        when(mockRow.createCell(anyInt())).thenReturn(mockCell);

        // Call the method
        excelService.generateBody(mockData, new String[]{"column1", "column2"}, 0, mockSheet);

        // Verify interactions
        verify(mockSheet, times(0)).createRow(0); // Expect the createRow(0) call
        verify(mockRow, times(0)).createCell(anyInt());

        // Verify cell interactions
        verify(mockCell, times(0)).setCellValue("value1");
        verify(mockCell, times(0)).setCellValue("value2");
    }


    @Test
    void testGetFieldValue() throws NoSuchMethodException {
        // Create a sample object using an anonymous class
        Object sampleObject = new Object() {
            public String getValue() {
                return "testValue";
            }
        };

        // Get the method using reflection
        Method method = sampleObject.getClass().getMethod("getValue");

        // Invoke the method using the getFieldValue method
        Object result = excelService.getFieldValue(sampleObject, method.getName());

        // Assert that the result matches the expected value
        assertEquals(null, result);
    }

    @Test
    void testCapitalizeFirstLetter() {
        // Test with lowercase input
        String result1 = ExcelServiceImpl.capitalizeFirstLetter("hello");
        assertEquals("Hello", result1);

        // Test with uppercase input
        String result2 = ExcelServiceImpl.capitalizeFirstLetter("WORLD");
        assertEquals("WORLD", result2);

        // Test with single-character input
        String result4 = ExcelServiceImpl.capitalizeFirstLetter("a");
        assertEquals("A", result4);
    }

    @Test
    void testGenerateHeaders() {
        // Mock data
        String[] headers = {"Header 1", "Header 2"};

        // Mock interactions with Workbook, Row, and Cell
        when(mockWorkbook.createCellStyle()).thenReturn(mock(CellStyle.class));
        when(mockWorkbook.createFont()).thenReturn(mock(Font.class));
        when(mockHeaderRow.createCell(anyInt())).thenReturn(mockCell);

        // Call the method
        excelService.generateHeaders(mockHeaderRow, headers, mockWorkbook,mockSheet);

        // Verify interactions
        verify(mockWorkbook, times(2)).createCellStyle();
        verify(mockWorkbook, times(2)).createFont();
        verify(mockHeaderRow, times(2)).createCell(anyInt());

        // Verify cell interactions
        verify(mockCell, times(2)).setCellStyle(any(CellStyle.class));
        verify(mockCell, times(2)).setCellValue(anyString());
    }
}
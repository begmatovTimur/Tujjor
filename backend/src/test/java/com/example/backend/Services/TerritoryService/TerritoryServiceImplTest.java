package com.example.backend.Services.TerritoryService;

import com.example.backend.DTO.SearchActiveDTO;
import com.example.backend.DTO.TerritoryDTO;
import com.example.backend.Entity.Territory;
import com.example.backend.Projection.TerritoryProjection;
import com.example.backend.Repository.TerritoryRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TerritoryServiceImplTest {

    @Mock
    private TerritoryRepository territoryRepository;

    private TerritoryServiceImpl underTest;

    @Mock
    private HttpServletRequest request;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        underTest = new TerritoryServiceImpl(territoryRepository);
    }

    @Test
    void testGetTerritories() {
        Territory territory = new Territory();
        Territory territory2 = new Territory();
        List<Territory> territories = Arrays.asList(territory2, territory);
        when(territoryRepository.findAll()).thenReturn(territories);
        HttpEntity<?> response = underTest.getTerritories();
        verify(territoryRepository, times(1)).findAll();
        assertEquals(territories, response.getBody());
    }

    // TerritoryServiceImplTest.java

    @Test
    void testAddTerritory() {
<<<<<<< HEAD
        TerritoryDTO mockTerritory = TerritoryDTO.builder()
                .region("Bukhara")
                .name("Kagan")
                .code("500")
                .active(true)
                .latitude(23.434324142)
                .longitude(54.123123213)
                .build();
        Territory territory = underTest.addTerritory(mockTerritory);
        System.out.println(territory);
=======
        // Prepare test data
        TerritoryDTO mockTerritoryDTO = new TerritoryDTO();
        mockTerritoryDTO.setRegion("Test Region");
        mockTerritoryDTO.setTitle("Test Title");
        mockTerritoryDTO.setCode("TEST001");
        mockTerritoryDTO.setActive(true);
        mockTerritoryDTO.setLongitude(10.12345);
        mockTerritoryDTO.setLatitude(20.54321);
        when(territoryRepository.save(any(Territory.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Territory resultTerritory = territoryService.addTerritory(mockTerritoryDTO);
        assertEquals("Test Region", resultTerritory.getRegion()); // Line 76: NullPointerException occurs here
>>>>>>> a465415d03b8004afc48154de9526a19f2a1f499
    }

    @Test
    void testUpdateTerritory() {
<<<<<<< HEAD
//        UUID id = UUID.randomUUID();
//        TerritoryDTO territoryDTO = new TerritoryDTO();
//        territoryDTO.setRegion("Sample Region");
//        territoryDTO.setName("Sample Territory");
//        territoryDTO.setCode("SAMPLE");
//        territoryDTO.setActive(true);
//        territoryDTO.setLongitude(1.2345);
//        territoryDTO.setLatitude(5.6789);
//
//        Territory savedTerritory = new Territory();
//        savedTerritory.setId(id);
//        when(territoryRepository.save(any(Territory.class))).thenReturn(savedTerritory);
//
//        Territory updatedTerritory = underTest.updateTerritory(id, territoryDTO);
//
//        assertNotNull(updatedTerritory);
//        assertEquals(id, updatedTerritory.getId());
//        assertEquals(territoryDTO.getRegion(), updatedTerritory.getRegion());
//        assertEquals(territoryDTO.getName(), updatedTerritory.getName());
//        assertEquals(territoryDTO.getCode(), updatedTerritory.getCode());
//        assertEquals(territoryDTO.getActive(), updatedTerritory.getActive());
//        assertEquals(territoryDTO.getLongitude(), updatedTerritory.getLongitude(), 0.001); // Double comparison with delta
//        assertEquals(territoryDTO.getLatitude(), updatedTerritory.getLatitude(), 0.001);
//        verify(territoryRepository, times(1)).save(any(Territory.class));
    }

    @Test
    void testPagination() {
        // Mock request data
        String json = "{\"quickSearch\":\"SearchTerm\",\"active\":true}";
        when(request.getHeader("searchParam")).thenReturn(json);

        // Mock the repository response with non-empty territories
        Page<TerritoryProjection> pageResult = mock(Page.class);
        when(pageResult.isEmpty()).thenReturn(false);

        // Mock a sample TerritoryProjection object
        TerritoryProjection territoryProjection = mock(TerritoryProjection.class);
        when(territoryProjection.getId()).thenReturn(UUID.randomUUID());
        when(territoryProjection.getRegion()).thenReturn("Region1");
        when(territoryProjection.getName()).thenReturn("Territory1");
        when(territoryProjection.getActive()).thenReturn(true);
        when(territoryProjection.getLatitude()).thenReturn(10.12345);
        when(territoryProjection.getLongitude()).thenReturn(20.98765);
        when(territoryProjection.getCode()).thenReturn("TERR-001");

        // Add the TerritoryProjection object to the pageResult
        when(pageResult.getContent()).thenReturn(Collections.singletonList(territoryProjection));
        when(territoryRepository.findTerritoryByActiveAndRegionName(any(), anyBoolean(), any()))
                .thenReturn(pageResult);

        // Call the pagination method
        HttpEntity<?> response = underTest.pagination(0, 10, request);

        // Verify that the repository method was called
        verify(territoryRepository, times(1))
                .findTerritoryByActiveAndRegionName(eq("SearchTerm"), eq(true), any());

        // Verify the response status code and content
        assertTrue(response.hasBody());
        assertTrue(response.getBody() instanceof Page<?>);
    }

    // User class for testing
    private static class User {
        private String name;
        private int age;
        private String email;

        public User(String name, int age, String email) {
            this.name = name;
            this.age = age;
            this.email = email;
        }

        // Getters and setters (if required)
    }

    @Test
    void downloadExcelTest() {
        // Mock data and headers
        List<String> headers = Arrays.asList("Name", "Age", "Email");
        List<User> data = Arrays.asList(
                new User("John", 30, "john@example.com"),
                new User("Jane", 25, "jane@example.com")
                // Add more users as needed...
        );

        // Call the downloadExcel method
        ResponseEntity<InputStreamResource> response = underTest.downloadExcel(data, headers);

        // Verify the response
        assertNotNull(response);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());

        HttpHeaders responseHeaders = response.getHeaders();
        assertNotNull(responseHeaders);
        assertEquals("attachment; filename=user_data.xlsx", responseHeaders.getFirst(HttpHeaders.CONTENT_DISPOSITION));
        assertEquals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", responseHeaders.getFirst(HttpHeaders.CONTENT_TYPE));

        // TODO: Additional verification of the response content can be done if required.
    }

    @Test
    void getExcelFileTest() throws IOException {
        // Mock the repository response
        List<Territory> territories = Arrays.asList(
                new Territory(UUID.randomUUID(), "Region1", "Territory1", "TERR-001", true, 10.123, 20.987),
                new Territory(UUID.randomUUID(), "Region2", "Territory2", "TERR-002", false, 15.456, 25.789)
                // Add more territories as needed...
        );
        when(territoryRepository.findAll()).thenReturn(territories);

        // Call the getExcelFile method
        ResponseEntity<Resource> response = underTest.getExcelFile(new SearchActiveDTO());

        // Verify the response
        assertEquals(HttpStatus.OK, response.getStatusCode());

        HttpHeaders headers = response.getHeaders();
        assertEquals(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"),
                headers.getContentType());
        assertEquals("attachment; filename=CompanyInfo.xlsx", headers.getFirst(HttpHeaders.CONTENT_DISPOSITION));

        ByteArrayResource resource = (ByteArrayResource) response.getBody();
        assertNotNull(resource);

        // Validate the content of the workbook
        byte[] fileContent = resource.getByteArray();
        try (XSSFWorkbook workbook = new XSSFWorkbook(new ByteArrayInputStream(fileContent))) {
            // Verify the header row
            assertNotNull(workbook);
            assertEquals(1, workbook.getNumberOfSheets());
            assertNotNull(workbook.getSheet("Company info"));

            // TODO: Additional validation of the workbook content can be done if needed.
        }
    }
    }


=======
        // Prepare test data
        UUID mockTerritoryId = UUID.randomUUID();
        TerritoryDTO mockTerritoryDTO = new TerritoryDTO();
        mockTerritoryDTO.setRegion("Updated Region");
        mockTerritoryDTO.setTitle("Updated Title");
        mockTerritoryDTO.setCode("UPDATED001");
        mockTerritoryDTO.setActive(false);
        mockTerritoryDTO.setLongitude(50.12345);
        mockTerritoryDTO.setLatitude(60.54321);

        // Mock behavior of repository save method
        when(territoryRepository.save(any(Territory.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // Save the territory first
        Territory savedTerritory = territoryService.addTerritory(mockTerritoryDTO);
        UUID savedTerritoryId = savedTerritory.getId();

        // Perform the actual test
        Territory resultTerritory = territoryService.updateTerritory(savedTerritoryId, mockTerritoryDTO);

        // Assert the result
        assertEquals(savedTerritoryId, resultTerritory.getId());
        assertEquals("Updated Region", resultTerritory.getRegion());
        assertEquals("Updated Title", resultTerritory.getTitle());
        assertEquals("UPDATED001", resultTerritory.getCode());
        assertEquals(false, resultTerritory.getActive());
        assertEquals(50.12345, resultTerritory.getLongitude());
        assertEquals(60.54321, resultTerritory.getLatitude());

        // Verify that territoryRepository.save was called twice (once for setting id and once for updating)
        verify(territoryRepository, times(2)).save(any(Territory.class));
    }

}
>>>>>>> a465415d03b8004afc48154de9526a19f2a1f499

package com.example.backend.Services.CompanyService;

import com.example.backend.Entity.Company;
import com.example.backend.Repository.CompanyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class CompanyServiceImplTest {
    @Mock
    CompanyRepository repository;
    @Mock
    CompanyService underTest;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        underTest = new CompanyServiceImpl(repository);
    }
    @Test
    void testGetCompanies() {
        // Create some example company data
        List<Company> mockCompanies = new ArrayList<>();
        mockCompanies.add(new Company());
        mockCompanies.add(new Company());

        // Mock the behavior of the companyRepository
        when(repository.findAll()).thenReturn(mockCompanies);

        // Call the method you want to test
        List<Company> companies = underTest.getCompanies();

        // Assert the returned list size and content
        assertEquals(mockCompanies.size(), companies.size());
        assertEquals(mockCompanies.get(0).getCompanyName(), companies.get(0).getCompanyName());
        assertEquals(mockCompanies.get(1).getCompanyName(), companies.get(1).getCompanyName());

        // Verify interactions with mock objects
        verify(repository, times(1)).findAll();
    }

}
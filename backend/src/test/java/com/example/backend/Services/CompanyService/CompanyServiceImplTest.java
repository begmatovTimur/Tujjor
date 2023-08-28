package com.example.backend.Services.CompanyService;

import com.example.backend.Repository.CompanyRepository;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.Mock;

import static org.junit.jupiter.api.Assertions.*;

class CompanyServiceImplTest {
    @Mock
    CompanyRepository repository;
    @Mock
    CompanyService underTest;
    @BeforeEach
    void setUp() {
    }

}
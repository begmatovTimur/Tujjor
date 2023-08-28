package com.example.backend.Repository;

import com.example.backend.Entity.Company;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class CompanyRepositoryTest {
    @Autowired
    CompanyRepository companyRepository;

    @BeforeEach
    void setUp() {
        companyRepository.save(generateCompany());
    }

    private static Company generateCompany() {
        return Company
                .builder()
                .address("Buk")
                .companyName("Shift")
                .email("gmail")
                .id(1)
                .supportPhone("9")
                .region("Bu")
                .build();
    }

    @Test
    void itShouldFindByCompanyName() {
        Company shift = companyRepository.findByCompanyName("Shift");
        assertEquals("Shift", shift.getCompanyName());
    }
}
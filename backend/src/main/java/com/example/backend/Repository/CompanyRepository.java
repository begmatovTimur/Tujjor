package com.example.backend.Repository;

import com.example.backend.Entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CompanyRepository extends JpaRepository<Company, Integer> {
    Company findByCompanyName(String companyName);
}

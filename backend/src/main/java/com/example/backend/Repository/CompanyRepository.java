package com.example.backend.Repository;

import com.example.backend.Entity.Company;
import com.example.backend.Projection.CompanyProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CompanyRepository extends JpaRepository<Company,Integer> {
    Company findByCompanyName(String name);
}
package com.example.backend.Services.CompanyService;

import com.example.backend.Entity.Company;
import com.example.backend.Projection.CompanyProjection;
import com.example.backend.Repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyServiceImple implements CompanyService {
    private final CompanyRepository companyRepository;

    @Override
    public HttpEntity<?> getFilteredCompanies(String value) {
        try {
            List<CompanyProjection> companies;
            if(value.equals("")){
                companies = companyRepository.findAllCompany();
            }else {
                companies = companyRepository.findSearchedCompany(value);
            }
            return ResponseEntity.ok(companies);
        }catch (Exception e){
            return ResponseEntity.status(404).body("An error has occurred");
        }
    }
}

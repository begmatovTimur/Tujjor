package com.example.backend.Repository;

import com.example.backend.Entity.Company;
import com.example.backend.Projection.CompanyProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface CompanyRepository extends JpaRepository<Company, Integer> {


    Company findByCompanyName(String companyName);

    @Query(nativeQuery = true, value = "select c.id, c.region, u.username, c.company_name, c.support_phone, c.email, a as address\n" +
            "from company c\n" +
            "         left join users u on c.super_visor_id = u.id\n" +
            "         left join address a on a.id = c.address_id\n" +
            "where lower(COALESCE(c.region, '') || ' ' || COALESCE(c.email, '') || ' ' || COALESCE(c.company_name, '') || ' ' || COALESCE(u.username, '') || ' ' || COALESCE(c.support_phone, '') || ' ' ||\n" +
            "            COALESCE(a.street, '') || ' ' || COALESCE(a.district, '') ||' ' || COALESCE(a.house, '')) like lower(concat('%',:search,'%'))")
    List<CompanyProjection> findSearchedCompany(String search);

    @Query(nativeQuery = true, value = "select c.id, c.region, u.username, c.company_name, c.support_phone, c.email, a as address\n" +
            "from company c\n" +
            "         left join users u on c.super_visor_id = u.id\n" +
            "         left join address a on a.id = c.address_id\n")
    List<CompanyProjection> findAllCompany();
}

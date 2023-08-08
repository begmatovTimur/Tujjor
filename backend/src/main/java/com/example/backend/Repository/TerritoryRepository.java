package com.example.backend.Repository;

import com.example.backend.DTO.SearchActiveDTO;
import com.example.backend.Entity.Territory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

import com.example.backend.Entity.Company;
import com.example.backend.Entity.Territory;
import com.example.backend.Projection.CompanyProjection;
import com.example.backend.Projection.TerritoryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TerritoryRepository extends JpaRepository<Territory, UUID> {


    @Query(value = "select id,region,name,code,longitude,latitude,active from territory t where t.active = :status and lower(COALESCE(t.region, '') || ' ' || COALESCE(t.name, '')) like lower(concat('%',:search,'%')) order by id",nativeQuery = true)
    Page<TerritoryProjection> findTerritoryByActiveAndRegionName(String search, Boolean status, Pageable pageable);


    @Query(value = "select id,region,name,code,longitude,latitude,active from territory t where lower(COALESCE(t.region, '') || ' ' || COALESCE(t.name, '')) like lower(concat('%',:search,'%')) order by id", nativeQuery = true)
    Page<TerritoryProjection> findTerritoryByRegionAndName(String search, Pageable pageable);
    @Query(value = """
    SELECT * FROM territory t
    WHERE t.active = :active
      AND (LOWER(t.region) LIKE LOWER(CONCAT('%', :quickSearch, '%'))
        OR LOWER(t.code) LIKE LOWER(CONCAT('%', :quickSearch, '%'))
        OR LOWER(t.name) LIKE LOWER(CONCAT('%', :quickSearch, '%')))
""", nativeQuery = true)
    List<TerritoryProjection> findByQuickSearch(Boolean active, String quickSearch);
    @Query(value = """
    SELECT * FROM territory t
      where (LOWER(t.region) LIKE LOWER(CONCAT('%', :quickSearch, '%'))
        OR LOWER(t.code) LIKE LOWER(CONCAT('%', :quickSearch, '%'))
        OR LOWER(t.name) LIKE LOWER(CONCAT('%', :quickSearch, '%')))
""", nativeQuery = true)
    List<TerritoryProjection> findByQuickSearchWithoutActive(String quickSearch);
}

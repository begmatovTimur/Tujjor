package com.example.backend.Repository;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Projection.CustomerCategoryProjection;
import com.example.backend.Projection.TerritoryProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface CustomerCategoryRepository extends JpaRepository<CustomerCategory, Integer> {

    @Query(value = "select c.id,c.region,c.code,c.name,c.description,c.active from customer_category c where c.active = :status and lower(COALESCE(c.region, '') || ' ' || COALESCE(c.name, '')) like lower(concat('%',:search,'%')) order by id DESC", nativeQuery = true)
    Page<CustomerCategoryProjection> findCustomerCategoryByActiveAndRegionName(String search, Boolean status, Pageable pageable);


    @Query(value = "select c.id,c.region,c.code,c.name,c.description,c.active from customer_category c where lower(COALESCE(c.region, '') || ' ' || COALESCE(c.name, '')) like lower(concat('%',:search,'%')) order by id DESC", nativeQuery = true)
    Page<CustomerCategoryProjection> findCustomerCategoryByRegionAndName(String search, Pageable pageable);

    @Query(value = """
                SELECT c.id,c.code,c.region,c.name,c.description,c.active FROM customer_category c
                WHERE c.active = :active
                  AND (LOWER(c.region) LIKE LOWER(CONCAT('%', :quickSearch, '%'))
                    OR LOWER(c.code) LIKE LOWER(CONCAT('%', :quickSearch, '%'))
                    OR LOWER(c.name) LIKE LOWER(CONCAT('%', :quickSearch, '%'))) order by id desc
            """, nativeQuery = true)
    List<CustomerCategoryProjection> findByQuickSearch(Boolean active, String quickSearch);

    @Query(value = """
                SELECT c.id,c.code,c.region,c.name,c.description,c.active FROM customer_category c
                  where (LOWER(c.region) LIKE LOWER(CONCAT('%', :quickSearch, '%'))
                    OR LOWER(c.code) LIKE LOWER(CONCAT('%', :quickSearch, '%'))
                    OR LOWER(c.name) LIKE LOWER(CONCAT('%', :quickSearch, '%'))) order by id desc
            """, nativeQuery = true)
    List<CustomerCategoryProjection> findByQuickSearchWithoutActive(String quickSearch);
}

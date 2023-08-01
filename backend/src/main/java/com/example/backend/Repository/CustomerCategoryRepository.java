package com.example.backend.Repository;

import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Projection.CustomerCategoryProjection;
import com.example.backend.Projection.TerritoryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface CustomerCategoryRepository extends JpaRepository<CustomerCategory, Integer> {

    @Query(value = "select id,code,name,description from customer_category c where c.active = :status and lower(COALESCE(c.code, '') || ' ' || COALESCE(c.name, '') || ' ' || COALESCE(c.description, '')) like lower(concat('%',:search,'%'))",nativeQuery = true)
    List<CustomerCategoryProjection> findCustomerCategoryByActiveAndRegionName(String search, Boolean status);

    @Query(value = "select id,code,name,description from customer_category c where lower(COALESCE(c.code, '') || ' ' || COALESCE(c.name, '') || ' ' || COALESCE(c.description, '')) like lower(concat('%',:search,'%'))",nativeQuery = true)
    List<CustomerCategoryProjection> findCustomerCategoryByRegionAndName(String search);
}

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

<<<<<<< HEAD
    @Query(value = "select c.id,c.region,c.code,c.name,c.description,c.active from customer_category c where c.active IN :status OR :status IS NULL and lower(COALESCE(c.region, '') || ' ' || COALESCE(c.name, '') || ' ' || COALESCE(c.description, '')) like lower(concat('%',:search,'%')) order by id DESC", nativeQuery = true)
    Page<CustomerCategoryProjection> findCustomerCategoryByActiveAndRegionName(String search, List<Boolean> status, Pageable pageable);


    @Query(value = "select c.id,c.region,c.code,c.name,c.description,c.active from customer_category c where lower(COALESCE(c.region, '') || ' ' || COALESCE(c.name, '') || ' ' || COALESCE(c.description, '')  ) like lower(concat('%',:search,'%')) order by id DESC", nativeQuery = true)
    Page<CustomerCategoryProjection> findCustomerCategoryByRegionAndName(String search, Pageable pageable);

>>>>>>> 85d94df00daf3ebe2d137bcfa3a0358db63c9a2f
}

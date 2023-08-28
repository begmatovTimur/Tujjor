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


    @Query(value = "SELECT\n" +
            "    c.id,\n" +
            "    c.region,\n" +
            "    c.code,\n" +
            "    c.name,\n" +
            "    c.description,\n" +
            "    c.active\n" +
            "FROM\n" +
            "    customer_category c\n" +
            "WHERE\n" +
            "        c.active IN :status OR :status IS NULL\n" +
            "    AND LOWER(COALESCE(c.region, '') || ' ' || COALESCE(c.name, '') || ' ' || COALESCE(c.description, '')) LIKE LOWER(CONCAT('%', :search, '%'))\n" +
            "ORDER BY\n" +
            "    id DESC", nativeQuery = true)
    Page<CustomerCategoryProjection> findCustomerCategoryByActiveAndRegionName(String search, List<Boolean> status, Pageable pageable);


}

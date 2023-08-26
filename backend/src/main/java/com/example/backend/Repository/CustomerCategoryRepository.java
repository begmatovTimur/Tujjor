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

    @Query(value = "select c.id,c.region,c.code,c.name,c.description,c.active from customer_category c where c.active = :status and lower(COALESCE(c.region, '') || ' ' || COALESCE(c.name, '') || ' ' || COALESCE(c.description, '')) like lower(concat('%',:search,'%')) order by id DESC", nativeQuery = true)
    Page<CustomerCategoryProjection> findCustomerCategoryByActiveAndRegionName(String search, Boolean status, Pageable pageable);


    @Query(value = "select c.id,c.region,c.code,c.name,c.description,c.active from customer_category c where lower(COALESCE(c.region, '') || ' ' || COALESCE(c.name, '') || ' ' || COALESCE(c.description, '')  ) like lower(concat('%',:search,'%')) order by id DESC", nativeQuery = true)
    Page<CustomerCategoryProjection> findCustomerCategoryByRegionAndName(String search, Pageable pageable);

    @Query(value = "SELECT ct.id,\n" +
            "       ct.region,\n" +
            "       ct.name,\n" +
            "       ct.code,\n" +
            "       ct.active,\n" +
            "       ct.description\n" +
            "FROM customer_category ct\n" +
            "WHERE ct.active IS NOT NULL\n" +
            "  AND CASE\n" +
            "          WHEN :status = 'true' THEN ct.active = true\n" +
            "          WHEN :status = 'false' THEN ct.active = false\n" +
            "          ELSE true END\n" +
            "  AND (LOWER(COALESCE(ct.region, '')) || ' ' || LOWER(COALESCE(ct.description, '')) || ' ' || LOWER(COALESCE(ct.name, '')) || ' ' || LOWER(COALESCE(ct.code, '')) LIKE\n" +
            "      LOWER(CONCAT('%', :search, '%'))) order by ct.id desc ", nativeQuery = true)
    List<CustomerCategoryProjection> getFilteredDataForExcel(String search, String status);
}

package com.example.backend.Repository;


import com.example.backend.Entity.Client;
import com.example.backend.Projection.ClientProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ClientRepository extends JpaRepository<Client,UUID> {


    @Query(nativeQuery = true,value = "SELECT\n" +
            "    c.id,\n" +
            "    c.name,\n" +
            "    c.company_name AS companyName,\n" +
            "    c.phone,\n" +
            "    c.latitude,\n" +
            "    c.longitude,\n" +
            "    c.address,\n" +
            "    c.active,\n" +
            "    c.registration_date AS registrationDate,\n" +
            "    t.region AS city,\n" +
            "    cc.name as categoryName\n" +
            "FROM\n" +
            "    client c\n" +
            "        LEFT JOIN\n" +
            "    territory t ON c.territory_id = t.id\n" +
            "left join customer_category cc on cc.id = c.category_id\n" +
            "WHERE\n" +
            "( t.id IN :city OR :city IS NULL) and " +
            "(cc.id IN :category OR :category IS NULL)" +
            "  AND (\n" +
            "            LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%'))\n" +
            "        OR LOWER(c.phone) LIKE LOWER(CONCAT('%', :search, '%'))\n" +
            "        OR LOWER(c.company_name) LIKE LOWER(CONCAT('%', :search, '%'))\n" +
            "    )\n" +
            "ORDER BY\n" +
            "    c.id")
    Page<ClientProjection> filterWithoutActive(List<UUID> city, List<Integer> category, String search, Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT\n" +
            "    c.id,\n" +
            "    c.name,\n" +
            "    c.company_name AS companyName,\n" +
            "    c.phone,\n" +
            "    c.latitude,\n" +
            "    c.longitude,\n" +
            "    c.address,\n" +
            "    c.active,\n" +
            "    c.registration_date AS registrationDate,\n" +
            "    t.region AS city,\n" +
            "    cc.name as categoryName\n" +
            "FROM\n" +
            "    client c\n" +
            "        LEFT JOIN\n" +
            "    territory t ON c.territory_id = t.id\n" +
            "left join customer_category cc on cc.id = c.category_id\n" +
            "WHERE\n" +
            "(t.id IN :city OR :city IS NULL) and " +
            "(cc.id IN :category OR :category IS NULL) and " +
            "c.active = :active " +
            "  AND (\n" +
            "            LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%'))\n" +
            "        OR LOWER(c.phone) LIKE LOWER(CONCAT('%', :search, '%'))\n" +
            "        OR LOWER(c.company_name) LIKE LOWER(CONCAT('%', :search, '%'))\n" +
            "    )\n" +
            "ORDER BY\n" +
            "    c.id")
    Page<ClientProjection> getAllFilteredFields(List<UUID> city, List<Integer> category, Boolean active, String search, Pageable pageable);

}

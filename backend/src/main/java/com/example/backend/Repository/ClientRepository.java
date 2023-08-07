package com.example.backend.Repository;


import com.example.backend.Entity.Client;
import com.example.backend.Projection.ClientProjection;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ClientRepository extends JpaRepository<Client,UUID> {


    @Query(nativeQuery = true,value = "SELECT c.id,c.name,c.company_name as companyName,c.phone,c.latitude,c.longitude, c.address,c.active,c.registration_date as registrationDate, t.region as city\n" +
            "FROM client c\n" +
            "left join territory t on c.territory_id = t.id\n" +
            "WHERE LOWER(COALESCE(c.address, '')) like LOWER(CONCAT('%', :city , '%'))\n" +
            "  and LOWER(COALESCE(c.name, '') || ' ' || COALESCE(c.phone, '') || ' ' ||\n" +
            "            COALESCE(c.company_name, '') || ' ' || COALESCE(c.tin, '') || ' ' || COALESCE(c.address, '')) LIKE\n" +
            "      LOWER(CONCAT('%', :search, '%')) order by c.id")
    Page<ClientProjection> filterWithoutActive(String city,String search, Pageable pageable);

    @Query(nativeQuery = true, value = "\n" +
            "SELECT\n" +
            "    c.id,\n" +
            "    c.name,\n" +
            "    c.company_name AS companyName,\n" +
            "    c.phone,\n" +
            "    c.latitude,\n" +
            "    c.longitude,\n" +
            "    c.address,\n" +
            "    c.active,\n" +
            "    c.registration_date AS registrationDate,\n" +
            "    t.region AS city\n" +
            "FROM\n" +
            "    client c\n" +
            "        LEFT JOIN\n" +
            "    territory t ON c.territory_id = t.id\n" +
            "WHERE\n" +
            "c.active  = :active and" +
            "   LOWER(COALESCE(c.address, '')) LIKE LOWER(CONCAT('%', :city , '%'))\n" +
            "  AND (\n" +
            "            LOWER(c.name) LIKE LOWER(CONCAT('%', :search, '%'))\n" +
            "        OR LOWER(c.phone) LIKE LOWER(CONCAT('%', :search, '%'))\n" +
            "        OR LOWER(c.company_name) LIKE LOWER(CONCAT('%', :search, '%'))\n" +
            "    )\n" +
            "ORDER BY\n" +
            "    c.id")
    Page<ClientProjection> getAllFilteredFields(String city, boolean active, String search, Pageable pageable);

}

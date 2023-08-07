package com.example.backend.Repository;


import com.example.backend.Entity.Client;
import org.springframework.boot.context.properties.bind.DefaultValue;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ClientRepository extends JpaRepository<Client,UUID> {


    @Query(nativeQuery = true,value = "SELECT * FROM client c WHERE LOWER(COALESCE(c.address, '')) like LOWER(CONCAT('%', :city, '%')) and LOWER(COALESCE(c.name, '') || ' ' || COALESCE(c.phone, '') || ' ' ||\n" +
            "                                   COALESCE(c.company_name, '') || ' ' || COALESCE(c.tin, '')  || ' ' || COALESCE(c.address, '')) LIKE\n" +
            "                             LOWER(CONCAT('%', :search, '%'))")
    Page<Client> filterWithoutActive(String city, Pageable pageable);

    @Query(nativeQuery = true,value = "SELECT * FROM client c WHERE c.active = :active and LOWER(COALESCE(c.address, '')) like  LOWER(CONCAT('%', :city, '%')) and LOWER(COALESCE(c.name, '') || ' ' || COALESCE(c.phone, '') || ' ' ||\n" +
            "                                   COALESCE(c.company_name, '') || ' ' || COALESCE(c.tin, '')) LIKE\n" +
            "                             LOWER(CONCAT('%', :search, '%'))")
        Page<Client> getAllFilteredFields(String city, boolean active, Pageable pageable);
}

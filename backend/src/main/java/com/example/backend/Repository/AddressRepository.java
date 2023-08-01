package com.example.backend.Repository;

import com.example.backend.Entity.Address;
import com.example.backend.Entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AddressRepository extends JpaRepository<Address, UUID> {
}

package com.example.backend.Repository;

import com.example.backend.Entity.ClientPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ClientPlaneRepository extends JpaRepository<ClientPlan, UUID> {

    List<ClientPlan> findAllByClientIdOrderByCreatedDate(UUID clientId);
}

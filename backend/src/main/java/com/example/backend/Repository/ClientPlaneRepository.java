package com.example.backend.Repository;

import com.example.backend.Entity.ClientPlan;
import com.example.backend.Projection.ClientPlaneProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ClientPlaneRepository extends JpaRepository<ClientPlan, UUID> {

    List<ClientPlaneProjection> findAllByClientIdOrderByCreatedDateDesc(UUID clientId);
    @Query(value = "select * from client_plan where client_id = :clientId order by created_date desc limit 1", nativeQuery = true)
    List<ClientPlaneProjection> getPlaneForMap(UUID clientId);
}

package com.example.backend.Repository;

import com.example.backend.Entity.Agent;
import com.example.backend.Projection.AgentProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.UUID;

public interface AgentRepository extends JpaRepository<Agent, UUID> {
    @Query(value = """
        SELECT a.id as agent_id, u.id as user_id, a.username, u.phone
        FROM agents a
                 JOIN users u ON u.id = a.user_id
        WHERE (a.username LIKE '%' || :search || '%')
           OR (u.phone LIKE '%' || :search || '%')""", nativeQuery = true)
    Page<AgentProjection> findAllByPagination(String search, Pageable pageable);
    Agent findByTelegramId(UUID telegramId);
    Agent findByUserPhone(String user_phone);
}

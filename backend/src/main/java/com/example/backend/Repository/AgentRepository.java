package com.example.backend.Repository;

import com.example.backend.Entity.Agent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface AgentRepository extends JpaRepository<Agent, UUID> {
    @Query(nativeQuery = true, value = "SELECT * FROM agents a\n" +
            "WHERE\n" +
            "    (a.username LIKE '%' || :search || '%')\n" +
            "   OR (a.phone LIKE '%' || :search || '%')\n")
    Page<Agent> findAllByPagination(String search, Pageable pageable);
}

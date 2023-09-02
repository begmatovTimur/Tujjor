package com.example.backend.Repository;

import com.example.backend.Entity.Bots;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BotsRepository extends JpaRepository<Bots, UUID> {

}

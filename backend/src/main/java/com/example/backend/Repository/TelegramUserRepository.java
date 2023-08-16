package com.example.backend.Repository;

import com.example.backend.Entity.TelegramUser;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface TelegramUserRepository extends JpaRepository<TelegramUser, UUID> {
    Optional<TelegramUser> findByChatId(Long chatId);

    @Query(value = "SELECT c.* FROM Client c LEFT JOIN telegram_user tu ON c.id = tu.client_id WHERE tu.client_id IS NULL", nativeQuery = true)
    List<TelegramUser> findAll();
}

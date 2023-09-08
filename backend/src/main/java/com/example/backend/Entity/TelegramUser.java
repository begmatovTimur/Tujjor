package com.example.backend.Entity;

import com.example.backend.Enums.BotState;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TelegramUser {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(nullable = false, unique = true)
    private Long chatId;
    @Enumerated(EnumType.STRING)
    private BotState state;
    private String phone;
    private String password;
    private Integer messageId;

    public TelegramUser(Long chatId, BotState state) {
        this.chatId = chatId;
        this.state = state;
    }

}

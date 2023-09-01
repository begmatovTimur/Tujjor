package com.example.backend.Bot;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "telegram_user")
@Builder
public class TelegramUser {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private Long chatId;
    private BotConstant step = BotConstant.START;


}

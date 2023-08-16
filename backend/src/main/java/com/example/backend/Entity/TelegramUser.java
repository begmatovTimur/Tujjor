package com.example.backend.Entity;

import com.example.backend.TelegramBotsApi.contants.STEP;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

import static jakarta.persistence.FetchType.EAGER;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TelegramUser {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String step;
    private Long chatId;
    @ManyToOne(fetch = EAGER,cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    private Client client;
}

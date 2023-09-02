package com.example.backend.Entity;

import com.example.backend.TelegramBotsApi.contants.STEP;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
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
    private String phone;
    private String name;
    private String address;
    private Integer category;
    private UUID territory;
    private String INN;
    private double longitude;
    private double latitude;
    @OneToMany(cascade = {CascadeType.ALL},fetch = EAGER)
    private List<Bots> bot;
}

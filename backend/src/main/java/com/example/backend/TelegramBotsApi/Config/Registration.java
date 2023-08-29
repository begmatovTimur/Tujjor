package com.example.backend.TelegramBotsApi.Config;

import com.example.backend.Entity.Bots;
import com.example.backend.Repository.BotsRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.meta.TelegramBotsApi;

import java.util.List;

@Component
@RequiredArgsConstructor
public class Registration implements CommandLineRunner {
    private final BotsRepository botsRepository;
    private final TelegramBotsApi botsApi;
    @SneakyThrows
    void registerBots() {
        List<Bots> all = botsRepository.findAll();
        for (Bots bot : all) {
            botsApi.registerBot(bot);
        }
    }











    @Override
    public void run(String... args) throws Exception {
        registerBots();
    }
}

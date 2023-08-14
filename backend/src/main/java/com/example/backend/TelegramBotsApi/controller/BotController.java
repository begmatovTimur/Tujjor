package com.example.backend.TelegramBotsApi.controller;

import com.example.backend.TelegramBotsApi.services.TelegramBot.TelegramWebhookBot;
import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.telegram.telegrambots.meta.api.objects.Update;

@RestController
@RequestMapping("/api/bot")
@RequiredArgsConstructor
public class BotController {
    private final TelegramWebhookBot bot;
    @PostMapping
    public void onUpdateReceived(@RequestBody Update update) throws InterruptedException {
        bot.onUpdateReceived(update);
    }
}

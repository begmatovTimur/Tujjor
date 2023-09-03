package com.example.backend.TelegramBotsApi.Services;

import org.telegram.telegrambots.meta.api.objects.Update;

public interface TelegramBotService {
    String getToken();
    String getUsername();
}

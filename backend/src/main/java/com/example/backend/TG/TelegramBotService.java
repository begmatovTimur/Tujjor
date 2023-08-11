package com.example.backend.TG;

public interface TelegramBotService {
    void registerBotAndSetWebhook();
    String getTOKEN();
    String getWebHookURL();
}

package com.example.backend.Entity;

import com.example.backend.TelegramBotsApi.Services.TelegramBotService;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.Update;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
public class Bots extends TelegramLongPollingBot implements TelegramBotService {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    @Transient
    List<TelegramUser> users = new ArrayList<>();
    private String token;

    @Override
    public String getUsername() {
        return name;
    }

    @SneakyThrows
    @Override
    public void onUpdateReceived(Update updates) {
        SendMessage sendMessage = new SendMessage();
        sendMessage.setText("Assalomu Alekum <b>"+updates.getMessage().getFrom().getUserName()+"</b> Sizni Botiz @tujjor_original_bot boti boshqaruvi ostida!");
        sendMessage.enableHtml(true);
        sendMessage.setChatId(updates.getMessage().getChatId().toString());
        execute(sendMessage);
    }

    @Override
    public String getToken() {
        return token;
    }

    @Override
    public String getBotUsername() {
        return getUsername();
    }

    @Override
    public String getBotToken() {
        return token;
    }

    @SneakyThrows
    public void sendMessage(String s, String chatId) {
        SendMessage sendMessage = new SendMessage();
        sendMessage.setText(s);
        sendMessage.setChatId(chatId);
        execute(sendMessage);
    }
}

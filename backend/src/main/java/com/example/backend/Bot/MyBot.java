package com.example.backend.Bot;

import com.example.backend.Repository.TelegramUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;
@Component
@RequiredArgsConstructor
public class MyBot extends TelegramLongPollingBot {


    private final TelegramUserRepository telegramUserRepository;
    TelegramUser telegramUser = null;


    @SneakyThrows
    @Override
    public void onUpdateReceived(Update update) {
        System.out.println("swwswww");
        if(update.hasMessage()){
            Message message = update.getMessage();
            Long chatId =message.getChatId();
            this.telegramUser = findUserByChatId(chatId);
        }
    }

    private TelegramUser findUserByChatId(Long chatId) {
        telegramUser = telegramUserRepository.findByChatId(chatId).orElseThrow(null);
        if(telegramUser==null){
            telegramUser = TelegramUser.builder()
                    .chatId(chatId)
                    .build();
        }
        System.out.println(telegramUser);
        return telegramUser;
    }

    @Override
    public String getBotUsername() {
        return "@tujjorbotforclient_bot";
    }

    @Override
    public String getBotToken() {
        return "6358984982:AAHX7aOq6MOYWdJ47avpw-x_SeMiuS6ufDM";
    }

}
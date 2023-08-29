package com.example.backend.TelegramBotsApi;

import com.example.backend.Entity.Bots;
import com.example.backend.Entity.TelegramUser;
import com.example.backend.Repository.*;
import com.example.backend.TelegramBotsApi.contants.STEP;
import jakarta.annotation.PostConstruct;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.objects.CallbackQuery;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class MyBot extends TelegramLongPollingBot {
    private final TelegramUserRepository repository;
    private final TerritoryRepository territoryRepository;
    private final CustomerCategoryRepository customerCategoryRepository;
    private final ClientRepository clientRepository;
    private Integer previousMessageId;
    private Integer previousPage = 0;
    private final BotsRepository botsRepository;
    private final TelegramBotsApi api;
    private String username = "@tujjor_original_bot";
    private String TOKEN = "6306656986:AAHfpfVfSSDbG_EmjLEeTkdnlljXblEmAYg";
    private TelegramUser currentUser = null;
    private static final Logger logger = LoggerFactory.getLogger(MyBot.class);

    @Autowired
    public MyBot(TelegramBotsApi api, TelegramUserRepository telegramUserRepository, TerritoryRepository territoryRepository,
                 CustomerCategoryRepository customerCategoryRepository, ClientRepository clientRepository, BotsRepository botsRepository) throws TelegramApiException {
        this.repository = telegramUserRepository;
        this.territoryRepository = territoryRepository;
        this.customerCategoryRepository = customerCategoryRepository;
        this.api = api;
        this.clientRepository = clientRepository;
        this.botsRepository = botsRepository;
        api.registerBot(this);
    }


    @PostConstruct
    public void start() {
        logger.info("username: {}, token: {}", username, TOKEN);
    }

    @SneakyThrows
    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage()) {

            Message message = update.getMessage();
            String chatId = message.getChatId().toString();

            currentUser = registerUser(update);

            if (message.hasText()) {
                String text = message.getText();
                textLogic(message);
            }

        }
    }

    @SneakyThrows
    private void textLogic(Message message) {
        String chatId = message.getChatId().toString();
        if (currentUser.getStep().equals(STEP.START.name())) {
            SendMessage sendMessage = new SendMessage();
            sendMessage.setText("Bot Name You Want To Create:");
            sendMessage.setChatId(chatId);
            execute(sendMessage);
            updateStep(STEP.BOT_NAME_CREATE);
        } else if (currentUser.getStep().equals(STEP.BOT_NAME_CREATE.name())) {
            String botName = message.getText();
            List<Bots> bots = new ArrayList<>();
            bots.add(botsRepository.save(new Bots(null,botName,new ArrayList<>(),"")));
            SendMessage sendMessage = new SendMessage();
            sendMessage.setText("Great! Now send me token of bot!");
            sendMessage.setChatId(chatId);
            execute(sendMessage);
            currentUser.setBot(bots);
            updateStep(STEP.BOT_TOKEN_CREATE);
        }else if(currentUser.getStep().equals(STEP.BOT_TOKEN_CREATE.name())) {
            String botToken = message.getText();
            currentUser.getBot().get(0).setToken(botToken);
            SendMessage sendMessage = new SendMessage();
            sendMessage.setText("Great! Now send me token of bot!");
            sendMessage.setChatId(chatId);
            execute(sendMessage);
            updateStep(STEP.START);
            registerBots(currentUser.getBot().get(currentUser.getBot().size()-1));
        }
        ;
    }

    private void updateStep(STEP updatingSTEP) {
        currentUser.setStep(updatingSTEP.name());
        TelegramUser save = repository.save(currentUser);
    }

    @SneakyThrows
    void registerBots(Bots bot) {
        api.registerBot(bot);
        bot.sendMessage("Assalomu Alekum Muvaffaqiyatli Ro'yxatdan O'tdiz", currentUser.getChatId().toString());
    }

    private TelegramUser registerUser(Update update) throws InterruptedException {
        Message message = update.getMessage();
        CallbackQuery callbackQuery = update.getCallbackQuery();


        Long chatId;

        if (update.hasCallbackQuery()) {
            chatId = callbackQuery.getMessage().getChatId();
        } else {
            chatId = message.getChatId();
        }

        Optional<TelegramUser> user = repository.findByChatId(chatId);
        return user.orElseGet(() -> repository.save(TelegramUser.builder()
                .id(null)
                .step(STEP.START.name())
                .chatId(chatId)
                .build()));
    }

    @Override
    public String getBotUsername() {
        return username;
    }

    @Override
    public String getBotToken() {
        return TOKEN;
    }
}

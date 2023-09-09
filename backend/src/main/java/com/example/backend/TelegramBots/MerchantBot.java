package com.example.backend.TelegramBots;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Entity.Agent;
import com.example.backend.Entity.Client;
import com.example.backend.Entity.TelegramUser;
import com.example.backend.Enums.BotState;
import com.example.backend.Repository.*;
import com.example.backend.Services.JwtService.JwtService;
import com.google.gson.Gson;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Component;
import org.telegram.telegrambots.bots.TelegramLongPollingBot;
import org.telegram.telegrambots.meta.TelegramBotsApi;
import org.telegram.telegrambots.meta.api.methods.ParseMode;
import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
import org.telegram.telegrambots.meta.api.methods.updatingmessages.DeleteMessage;
import org.telegram.telegrambots.meta.api.objects.Contact;
import org.telegram.telegrambots.meta.api.objects.Message;
import org.telegram.telegrambots.meta.api.objects.Update;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboard;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;
import org.telegram.telegrambots.meta.api.objects.webapp.WebAppData;
import org.telegram.telegrambots.meta.api.objects.webapp.WebAppInfo;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

//@Component
public class MerchantBot extends TelegramLongPollingBot {
    private TelegramUser telegramUser;
    private final TelegramUserRepository telegramUserRepository;
    private final TerritoryRepository territoryRepository;
    private final JwtService jwtService;
    private final AgentRepository agentRepository;
    private final AuthenticationManager authenticationManager;
    private final CustomerCategoryRepository customerCategoryRepository;
    private final ClientRepository clientRepository;
    private String webAppUrl = "https://c3a5-213-230-92-156.ngrok-free.app";

    @SneakyThrows
    @Autowired
    public MerchantBot(TelegramBotsApi api, TelegramUserRepository telegramUserRepository, TerritoryRepository territoryRepository, JwtService jwtService, AgentRepository agentRepository, AuthenticationManager authenticationManager, CustomerCategoryRepository customerCategoryRepository, ClientRepository clientRepository) {
        api.registerBot(this);
        this.telegramUserRepository = telegramUserRepository;
        this.territoryRepository = territoryRepository;
        this.jwtService = jwtService;
        this.agentRepository = agentRepository;
        this.authenticationManager = authenticationManager;
        this.customerCategoryRepository = customerCategoryRepository;
        this.clientRepository = clientRepository;
    }

    @Override
    public String getBotUsername() {
        return "@tujjoradminbot";
    }

    @Override
    public String getBotToken() {
        return "6612611510:AAEsHCZ4cbkmtAwAod4jNQsMADR9Bl1RD-A";
    }

    private TelegramUser getUserByChatId(Long chatId) {
        TelegramUser byChatId = telegramUserRepository.findByChatId(chatId);
        return Objects.requireNonNullElseGet(byChatId, () -> telegramUserRepository.save(new TelegramUser(
                chatId,
                BotState.START
        )));
    }

    @SneakyThrows
    @Override
    public void onUpdateReceived(Update update) {
        if (update.hasMessage()) {
            Message message = update.getMessage();
            Long chatId = message.getChatId();
            telegramUser = getUserByChatId(chatId);
            if (message.hasText()) {
                String text = message.getText();
                if (text.equalsIgnoreCase("/start")) {
                    if (!checkAgent()) {
                        Message execute = execute(SendMessage.builder()
                                .chatId(chatId)
                                .text("Salom \uD83D\uDC4B\uD83C\uDFFB <b>" + message.getFrom().getFirstName() + "</b>")
                                .parseMode(ParseMode.HTML)
                                .replyMarkup(generateShareContactButton())
                                .build());
                        telegramUser.setMessageId(execute.getMessageId());
                        telegramUser.setState(BotState.SHARE_CONTACT);
                        telegramUserRepository.save(telegramUser);
                    } else {
                        botLogin(chatId);
                    }
                } else if (telegramUser.getState().equals(BotState.ENTER_PASSWORD)) {
                    telegramUser.setPassword(text);
                    telegramUserRepository.save(telegramUser);
                    Agent agent = agentRepository.findByUserPhone(telegramUser.getPhone());
                    if (agent == null) {
                        execute(SendMessage.builder()
                                .chatId(chatId)
                                .text("Siz agentlar ro'yxatida mavjud emassiz ❌")
                                .build());
                    } else {
                        try {
                            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(telegramUser.getPhone(), telegramUser.getPassword()));
                            agent.setTelegramId(telegramUser.getId());
                            agentRepository.save(agent);
                            botLogin(chatId);
                        } catch (BadCredentialsException e) {
                            execute(SendMessage.builder()
                                    .chatId(chatId)
                                    .text("Iltimos parolni to'g'ri kiriting!")
                                    .build());
                        }
                    }
                }
            } else if (message.hasContact() && telegramUser.getState().equals(BotState.SHARE_CONTACT)) {
                execute(DeleteMessage.builder()
                        .chatId(chatId)
                        .messageId(telegramUser.getMessageId())
                        .build());
                Contact contact = message.getContact();
                telegramUser.setPhone(contact.getPhoneNumber());
                telegramUser.setState(BotState.ENTER_PASSWORD);
                telegramUserRepository.save(telegramUser);
                execute(SendMessage.builder()
                        .chatId(chatId)
                        .text("Iltimos super admindan parolni oling va botga yuboring ✅")
                        .build());
            } else {
                WebAppData webAppData = message.getWebAppData();
                String data = webAppData.getData();
                Gson gson = new Gson();
                ClientDTO clientDTO = gson.fromJson(data, ClientDTO.class);
                clientRepository.save(Client.
                        builder()
                        .territory(territoryRepository.findById(clientDTO.getTerritoryId()).orElseThrow())
                        .category(customerCategoryRepository.findById(clientDTO.getCategoryId()).orElseThrow())
                        .phone(clientDTO.getPhone())
                        .name(clientDTO.getName())
                        .companyName(clientDTO.getCompanyName())
                        .address(clientDTO.getAddress())
                        .active(true)
                        .tin(clientDTO.getTin())
                        .longitude(clientDTO.getLongitude())
                        .latitude(clientDTO.getLatitude())
                        .build());
            }
        }
    }

    private void botLogin(Long chatId) throws TelegramApiException {
        execute(SendMessage.builder()
                .chatId(chatId)
                .text("<b>Siz muvaffaqiyatli ro'yxatdan o'tdingiz ✅</b>")
                .replyMarkup(generateMainMenu())
                .parseMode(ParseMode.HTML)
                .build());
        telegramUser.setState(BotState.SELECT_MENU);
    }

    private ReplyKeyboard generateMainMenu() {
        String token = jwtService.generateTelegramToken(agentRepository.findByTelegramId(telegramUser.getId()).getUser());
        ReplyKeyboardMarkup keyboardMarkup = new ReplyKeyboardMarkup();
        List<KeyboardRow> rows = new ArrayList<>();
        KeyboardRow row = new KeyboardRow();
        KeyboardRow second = new KeyboardRow();
        KeyboardRow third = new KeyboardRow();
        KeyboardButton button = new KeyboardButton();
        button.setText("Yangi mijoz qo'shish");
        button.setWebApp(new WebAppInfo(webAppUrl + "/telegram/add-client/" + token));
        KeyboardButton clients = new KeyboardButton();
        clients.setText("Mijozlar");
        clients.setWebApp(new WebAppInfo(webAppUrl + "/telegram/clients/" + token));
        KeyboardButton clientsOnTheMap = new KeyboardButton();
        clientsOnTheMap.setText("Mijozlar xaritada");
        clientsOnTheMap.setWebApp(new WebAppInfo(webAppUrl + "/telegram/clients-on-the-map/" + token));
        third.add(clientsOnTheMap);
        second.add(clients);
        row.add(button);
        rows.add(row);
        rows.add(second);
        rows.add(third);
        keyboardMarkup.setKeyboard(rows);
        keyboardMarkup.setResizeKeyboard(true);
        return keyboardMarkup;
    }

    private Boolean checkAgent() {
        Agent agent = agentRepository.findByTelegramId(telegramUser.getId());
        return agent != null;
    }

    private ReplyKeyboard generateShareContactButton() {
        ReplyKeyboardMarkup replyKeyboardMarkup = new ReplyKeyboardMarkup();
        replyKeyboardMarkup.setResizeKeyboard(true);
        List<KeyboardRow> rows = new ArrayList<>();
        KeyboardRow row = new KeyboardRow();
        KeyboardButton button = new KeyboardButton();
        button.setRequestContact(true);
        button.setText("Raqamni jo'natish \uD83D\uDCDE");
        row.add(button);
        rows.add(row);
        replyKeyboardMarkup.setKeyboard(rows);
        return replyKeyboardMarkup;
    }
}

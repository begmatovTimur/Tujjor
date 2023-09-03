package com.example.backend.TelegramBotsApi;

import com.example.backend.Entity.Agent;
import com.example.backend.Entity.TelegramUser;
import com.example.backend.Repository.AgentRepository;
import com.example.backend.Repository.TelegramUserRepository;
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
import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.ReplyKeyboardMarkup;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardButton;
import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.KeyboardRow;
import org.telegram.telegrambots.meta.api.objects.webapp.WebAppInfo;
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.util.*;

@Component
public class MyBot extends TelegramLongPollingBot {
    private final TelegramBotsApi api;
    private String username = "@tujjor_original_bot";
    private String TOKEN = "6306656986:AAHfpfVfSSDbG_EmjLEeTkdnlljXblEmAYg";
    private String baseUrl = "https://b300-213-230-92-212.ngrok-free.app";
    private final AgentRepository agentRepository;
    private TelegramUser currentUser = null;
    private static final Logger logger = LoggerFactory.getLogger(MyBot.class);
    private TelegramUserRepository repository;

    @Autowired
    public MyBot(TelegramBotsApi api, AgentRepository agentRepository, TelegramUserRepository repository) throws TelegramApiException {
        this.agentRepository = agentRepository;
        this.repository = repository;
        this.api = api;
        api.registerBot(this);
    }


    @PostConstruct
    public void start() {
        logger.info("username: {}, token: {}", username, TOKEN);
    }

    @SneakyThrows
    @Override
    public void onUpdateReceived(Update update) {

        currentUser = registerUser(update);
        if (update.hasMessage()) {
            Message message = update.getMessage();
            Long chatId = message.getChatId();
            SendMessage sendMessage = new SendMessage();
            sendMessage.setChatId(chatId.toString());

            if (message.hasText()) {
                String text = message.getText();
                sendMessage.enableHtml(true);
                if (currentUser.getStep().equals(STEP.START.name())) {
                    sendMessage.setText("Waiting For Contact...");
                    ReplyKeyboardMarkup replyKeyboardMarkup = new ReplyKeyboardMarkup();
                    replyKeyboardMarkup.setResizeKeyboard(true);
                    replyKeyboardMarkup.setSelective(true);

                    List<KeyboardRow> rows = new ArrayList<>();

                    KeyboardRow row = new KeyboardRow();

                    KeyboardButton button = new KeyboardButton();
                    button.setRequestContact(true);
                    button.setText("Share Contact");
                    row.add(button);

                    rows.add(row);

                    replyKeyboardMarkup.setKeyboard(rows);
                    sendMessage.setReplyMarkup(replyKeyboardMarkup);
                    updateStep(STEP.SHARING_CONTACT);
                } else if (currentUser.getStep().equals(STEP.SHARING_PASSWORD.name())) {
                    if (text.equals("root123")) {
                        sendMessage.setText("Great ✅ <b>" + message.getFrom().getFirstName() + "</b> You're Welcome \uD83D\uDC4B!");
                        generateStartMenu(sendMessage, message);
                        updateStep(STEP.VERIFICATED_AGENT);
                    } else {
                        sendMessage.setText("❌ Wrong Password,Try Again!!");
                        updateStep(STEP.SHARING_PASSWORD);
                    }
                } else if (currentUser.getStep().equals(STEP.VERIFICATED_AGENT.name())) {
                    generateStartMenu(sendMessage, message);
                }
            } else if (message.hasContact()) {
                if (currentUser.getStep().equals(STEP.SHARING_CONTACT.name())) {
                    sendMessage.setText("Is That Correct Contact?");

                    Map<String, String> buttons = new HashMap<>();
                    buttons.put("YES", "Yes ✅");
                    buttons.put("NO", "No ❌");
                    currentUser.setPhone(message.getContact().getPhoneNumber());
                    sendMessage.setReplyMarkup(generateInlineKeyboardButtons(buttons, 2));
                    updateStep(STEP.SHARING_CONTACT_VERIFICATION);
                }
            }
            execute(sendMessage);
        } else if (update.hasCallbackQuery()) {

            String data = update.getCallbackQuery().getData();

            SendMessage sendMessage = new SendMessage();
            sendMessage.setChatId(update.getCallbackQuery().getMessage().getChatId().toString());

            if (currentUser.getStep().equals(STEP.SHARING_CONTACT_VERIFICATION.name())) {
                if (data.equals("YES")) {
                    Boolean allowed = agentPhoneVerification(currentUser.getPhone());
                    if (allowed) {
                        sendMessage.setText("Great ✅ Now Send Password!");
                        updateStep(STEP.SHARING_PASSWORD);
                    } else {


                        ReplyKeyboardMarkup replyKeyboardMarkup = new ReplyKeyboardMarkup();
                        replyKeyboardMarkup.setResizeKeyboard(true);
                        replyKeyboardMarkup.setSelective(true);

                        List<KeyboardRow> rows = new ArrayList<>();

                        KeyboardRow row = new KeyboardRow();

                        KeyboardButton button = new KeyboardButton();
                        button.setRequestContact(true);
                        button.setText("Share Contact");
                        row.add(button);

                        rows.add(row);

                        replyKeyboardMarkup.setKeyboard(rows);
                        sendMessage.setReplyMarkup(replyKeyboardMarkup);
                        System.out.println(currentUser.getPhone());
                        sendMessage.setText("Can't Find Phone Number Which adapts to yours Try Again! ❌");
                        updateStep(STEP.SHARING_CONTACT);
                    }
                } else if (data.equals("NO")) {
                    sendMessage.setText("Please Send Correct  Contact!");
                    ReplyKeyboardMarkup replyKeyboardMarkup = new ReplyKeyboardMarkup();
                    replyKeyboardMarkup.setResizeKeyboard(true);
                    replyKeyboardMarkup.setSelective(true);

                    List<KeyboardRow> rows = new ArrayList<>();

                    KeyboardRow row = new KeyboardRow();

                    KeyboardButton button = new KeyboardButton();
                    button.setRequestContact(true);
                    button.setText("Share Contact");
                    row.add(button);

                    rows.add(row);

                    replyKeyboardMarkup.setKeyboard(rows);
                    sendMessage.setReplyMarkup(replyKeyboardMarkup);
                    updateStep(STEP.SHARING_CONTACT);
                }
            }

            execute(sendMessage);
        }
    }

    private Boolean agentPhoneVerification(String phone) {
        List<Agent> all = agentRepository.findAll();

        Boolean allowed = false;

        for (Agent agent : all) {
            if (agent.getPhone().equals(phone)) {
                allowed = true;
            }
        }

        return allowed;
    }

    private void generateStartMenu(SendMessage sendMessage, Message message) {
        if (currentUser.getStep().equals(STEP.VERIFICATED_AGENT.name())) {
            sendMessage.setText("Hello <b>" + message.getFrom().getFirstName() + "</b> ✋ Glad to see you again in our bot!");

            Map<String, String> addClientsButton = new HashMap<>();
            addClientsButton.put("title", "Add Clients");
            addClientsButton.put("url", baseUrl+"/web-bot-client-add");
            Map<String, String> clientsOnTheMapButton = new HashMap<>();
            clientsOnTheMapButton.put("title", "Clients On The Map");
            clientsOnTheMapButton.put("url", baseUrl+"/web-bot-clients-on-the-map");
            Map<String, String> clientsButton = new HashMap<>();
            clientsButton.put("title", "Clients");
            clientsButton.put("url", baseUrl+"/web-bot-client");
            List<Map> buttons = new ArrayList<>();
            buttons.add(addClientsButton);
            buttons.add(clientsOnTheMapButton);
            buttons.add(clientsButton);
            sendMessage.setReplyMarkup(generateKeyboardButtons(buttons));

        }
    }

    private InlineKeyboardMarkup generateInlineKeyboardButtons(Map<String, String> buttonTexts, int buttonsPerRow) {

        InlineKeyboardMarkup markup = new InlineKeyboardMarkup();
        List<List<InlineKeyboardButton>> keyboardRows = new ArrayList<>();

        int count = 0;
        List<String> keys = new ArrayList<>(buttonTexts.keySet());

        for (String key : keys) {
            if (count % buttonsPerRow == 0) {
                // Start a new row
                keyboardRows.add(new ArrayList<>());
            }

            InlineKeyboardButton button = new InlineKeyboardButton();
            button.setText(buttonTexts.get(key));
            button.setCallbackData(key);

            keyboardRows.get(keyboardRows.size() - 1).add(button);

            count++;
        }

        markup.setKeyboard(keyboardRows);
        return markup;
    }

    private ReplyKeyboardMarkup generateKeyboardButtons(List<Map> buttons) {
        ReplyKeyboardMarkup markup = new ReplyKeyboardMarkup();
        List<KeyboardRow> keyboardRows = new ArrayList<>();

        for (Map button : buttons) {
            KeyboardRow row = new KeyboardRow();
            KeyboardButton keyboardButton = new KeyboardButton();
            keyboardButton.setText(button.get("title").toString());
            keyboardButton.setWebApp(new WebAppInfo(button.get("url").toString()));
            row.add(keyboardButton);
            keyboardRows.add(row);
        }

        markup.setKeyboard(keyboardRows);
//        markup.setOneTimeKeyboard(true);
        markup.setResizeKeyboard(true);
        return markup;
    }


    private void updateStep(STEP updatingSTEP) {
        currentUser.setStep(updatingSTEP.name());
        TelegramUser save = repository.save(currentUser);
    }


    private TelegramUser registerUser(Update update) {
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

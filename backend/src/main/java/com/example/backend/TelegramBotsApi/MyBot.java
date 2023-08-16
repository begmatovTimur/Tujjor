package com.example.backend.TelegramBotsApi;

import com.example.backend.Entity.Client;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.TelegramUser;
import com.example.backend.Entity.Territory;
import com.example.backend.Repository.ClientRepository;
import com.example.backend.Repository.CustomerCategoryRepository;
import com.example.backend.Repository.TelegramUserRepository;
import com.example.backend.Repository.TerritoryRepository;
import com.example.backend.TelegramBotsApi.contants.STEP;
import com.example.backend.TelegramBotsApi.services.Pagination.PaginationConfig;
import jakarta.annotation.PostConstruct;
import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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
import org.telegram.telegrambots.meta.exceptions.TelegramApiException;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

import static com.example.backend.TelegramBotsApi.services.Pagination.Pagination.doPagination;

@Component

public class MyBot extends TelegramLongPollingBot {
    private final TelegramUserRepository repository;
    private final TerritoryRepository territoryRepository;
    private final CustomerCategoryRepository customerCategoryRepository;
    private final ClientRepository clientRepository;
    private Integer previousMessageId;
    private Integer previousPage = 0;
    private String username = "@tujjor_original_bot";
    private String TOKEN = "6306656986:AAH4qjSkX6bJDKYriR13XHqPo2ndCROXWns";
    private TelegramUser currentUser = null;
    private static final Logger logger = LoggerFactory.getLogger(MyBot.class);

    @Autowired
    public MyBot(TelegramBotsApi api, TelegramUserRepository telegramUserRepository, TerritoryRepository territoryRepository,
                 CustomerCategoryRepository customerCategoryRepository, ClientRepository clientRepository) throws TelegramApiException {
        this.repository = telegramUserRepository;
        this.territoryRepository = territoryRepository;
        this.customerCategoryRepository = customerCategoryRepository;
        this.clientRepository = clientRepository;
        api.registerBot(this);
    }


    @PostConstruct
    public void start() {
        logger.info("username: {}, token: {}", username, TOKEN);
    }

    @SneakyThrows
    @Override
    public void onUpdateReceived(Update update) {

        Message message = update.getMessage();

        this.currentUser = registerUser(update);
        String chatId = currentUser.getChatId().toString(); // Getting chatId Of Current User
        String step = currentUser.getStep();    //Getting STEP Of Current User

        if (update.hasMessage()) {
            if (message.hasText()) {
                SendMessage sendMessage = new SendMessage();
                sendMessage.enableHtml(true);
                sendMessage.setChatId(chatId);

                String text = message.getText(); // getting Text Of Message
                if (text.equals("/start") || step.equals(STEP.START.name())) { // START
                    sendMessage.setChatId(chatId);
                    generateStartMenu(sendMessage, "Assalomu Alekum <b>" + message.getFrom().getFirstName() + "</b> Botimizga Xush kelibsiz \uD83D\uDC4B");
                    updateStep(STEP.START_MENU_WAITING);

                } else if (step.equals(STEP.START_MENU_WAITING.name()) // Adding Client If
                        || step.equals(STEP.ADDING_FIO_WAITING.name()) || step.equals(STEP.ADDING_TERRITORY.name())
                        || step.equals(STEP.ADDING_ADDRESS.name()) || step.equals(STEP.ADDING_INN.name())
                        || step.equals(STEP.ADDING_PHONE_CONFIRMATION.name())) {


                    if (step.equals(STEP.ADDING_PHONE_CONFIRMATION.name())) { // Phone Of Adding Client Typed
                        currentUser.setPhone(text);
                        sendMessage.setChatId(chatId);
                        sendMessage.setText("To'g'ri Telefon Raqam kiritdizmi❓❓");
                        Map<String, String> buttons = new HashMap<>();
                        buttons.put("YES", "Ha ✅");
                        buttons.put("NO", "Yoq ❌");

                        sendMessage.setReplyMarkup(generateInlineKeyboardButtons(buttons, 2));
                        execute(sendMessage);
                        repository.save(currentUser);
                    } else if (step.equals(STEP.ADDING_FIO_WAITING.name())) {
                        currentUser.setName(text);
                        sendMessage.setChatId(chatId);
                        sendMessage.setText("\uD83D\uDCCD Mijoz addressini yozing:\n" +
                                "<i>Namuna:Qayerdadir Qayer 47</i>");
                        execute(sendMessage);
                        updateStep(STEP.ADDING_ADDRESS);
                    } else if (step.equals(STEP.ADDING_ADDRESS.name())) {
                        currentUser.setAddress(text);
                        sendMessage.setChatId(chatId);
                        sendMessage.setText("\uD83D\uDCDE Mijoz telefon raqamini kiriting:\n" +
                                "<i>Namuna:+998997213466</i>");
                        execute(sendMessage);
                        updateStep(STEP.ADDING_PHONE_CONFIRMATION);
                    } else if (step.equals(STEP.ADDING_INN.name())) {
                        currentUser.setINN(text);
                        requestLocationWithText("Mijoz locationini yuboring!", chatId);
                        updateStep(STEP.ADD_ADDRESS_CONFIRM);
                    } else if (text.equals("➕Yangi mijoz qo’shish")) { // Adding Client Button Clicked
                        sendMessage.setChatId(chatId);
                        previousPage = 0;
                        sendMessage.setText("Mijoz faoliyat turini kiriting:");
                        sendMessage.setChatId(chatId);
                        List<CustomerCategory> categories = customerCategoryRepository.findAll();
                        Map<String, String> categoryMap = categories.stream()
                                .collect(Collectors.toMap(category -> category.getId().toString(), CustomerCategory::getName));
                        sendMessage.setReplyMarkup(generateInlineKeyboardButtons(categoryMap, 2));
                        execute(sendMessage);
                        updateStep(STEP.ADDING_CATEGORY);
                    }
//                    else if (text.equals("\uD83D\uDCDD Mijoz ma’lumotlari")) {
//                        previousMessageId = doPagination(PaginationConfig.of(
//                                clientRepository.findAll(PageRequest.of(0,10)), List.of("name", "territory.name"), previousMessageId, 1, chatId, false, 1
//                        )).getResult().getMessageId();
//                        updateStep(STEP.PAGINATION_WAITING);
//                    }
                }
                ;

            } else if (message.hasLocation()) {

                if (step.equals(STEP.ADD_ADDRESS_CONFIRM.name())) {
                    Double latitude = update.getMessage().getLocation().getLatitude();
                    Double longitude = update.getMessage().getLocation().getLongitude();
                    currentUser.setLatitude(latitude);
                    currentUser.setLongitude(longitude);
                    SendMessage sendMessage = new SendMessage();
                    sendMessage.setText("To'g'ri Location kiritdizmi❓❓");
                    sendMessage.setChatId(chatId);

                    Map<String, String> buttons = new HashMap<>();
                    buttons.put("YES", "Ha ✅");
                    buttons.put("NO", "Yoq ❌");

                    sendMessage.setReplyMarkup(generateInlineKeyboardButtons(buttons, 2));
                    execute(sendMessage);
                    repository.save(currentUser);
                }
            }


        } else if (update.hasCallbackQuery()) {

            String data = update.getCallbackQuery().getData();


            if (step.equals(STEP.ADDING_TERRITORY.name())) {
                Optional<Territory> byId = null;
                try {
                    byId = territoryRepository.findById(UUID.fromString(data));
                } catch (IllegalArgumentException e) {
                }
                if (byId.isPresent()) {
                    currentUser.setTerritory(byId.get().getId());
                    SendMessage sendMessage = SendMessage.builder()
                            .text("\uD83D\uDC64 Mijoz ism,familyasini kiriting:\n" +
                                    "<i>Namuna:Abdulla Abdullayev</i>")
                            .chatId(chatId)
                            .build();
                    sendMessage.enableHtml(true);
                    execute(sendMessage);
                    updateStep(STEP.ADDING_FIO_WAITING);
                } else {
                    execute(SendMessage.builder()
                            .text("Territory Topilmadi! ❌")
                            .chatId(chatId)
                            .build());
                }
            } else if (step.equals(STEP.ADDING_CATEGORY.name())) {
                List<CustomerCategory> list = customerCategoryRepository.findAll();
                if (data.equals("previous") && list.size() >= previousPage) {
                    doPagination(PaginationConfig.of(customerCategoryRepository.findAll(PageRequest.of(previousPage - 1, 10)), List.of("name", "region"), previousMessageId, --previousPage, chatId, true, "Mijoz faoliyat turini kiriting:", 1));
                } else if (data.equals("next") && list.size() >= previousPage) {
                    doPagination(PaginationConfig.of(customerCategoryRepository.findAll(PageRequest.of(previousPage + 1, 10)), List.of("name", "region"), previousMessageId, ++previousPage, chatId, true, "Mijoz faoliyat turini kiriting:", 1));
                } else if (data.equals("cancel")) {
                    updateStep(STEP.START_MENU_WAITING);
                } else {

                    Optional<CustomerCategory> byId = null;
                    try {
                        byId = customerCategoryRepository.findById(Integer.parseInt(data));
                    } catch (NumberFormatException e) {
                    }
                    ;

                    if (byId.isPresent()) {
                        currentUser.setCategory(byId.get().getId());
                        List<Territory> territories = territoryRepository.findAll();

                        Map<String, String> territoryMap = territories.stream()
                                .collect(Collectors.toMap(territory -> territory.getId().toString(), Territory::getName));
                        SendMessage sendMessage = SendMessage.builder()
                                .text("\uD83C\uDFD8 <b>Mijozuchun hududni tanlang</b>:")
                                .replyMarkup(generateInlineKeyboardButtons(territoryMap, 2))
                                .chatId(chatId)
                                .build();
                        sendMessage.enableHtml(true);
                        execute(sendMessage);
                        updateStep(STEP.ADDING_TERRITORY);

                    } else {
                        execute(SendMessage.builder()
                                .text("Faoliyat Turi Topilmadi! ❌")
                                .chatId(chatId)
                                .build());
                    }
                }

            } else if (step.equals(STEP.ADD_ADDRESS_CONFIRM.name())) {
                if (data.equals("NO")) {
                    currentUser.setLatitude(0.0);
                    currentUser.setLongitude(0.0);
                    requestLocationWithText("Iltimos Locationni Qayta Yuboring!", chatId);
                } else {

                    SendMessage sendMessage = new SendMessage();
                    sendMessage.setChatId(chatId);
                    clientRepository.save(Client.builder()
                                    .longitude(currentUser.getLongitude())
                                    .latitude(currentUser.getLatitude())
                                    .category(customerCategoryRepository.findById(currentUser.getCategory()).get())
                                    .territory(territoryRepository.findById(currentUser.getTerritory()).get())
                                    .insertionTime(LocalDateTime.now())
                                    .phone(currentUser.getPhone())
                                    .name(currentUser.getName())
                                    .address(currentUser.getAddress())
                                    .active(false)
                                    .tin(currentUser.getINN())
                            .build());
                    generateStartMenu(sendMessage, "✅ Mijoz muvaffaqiyatli ro'yxatga olindi!");
                    updateStep(STEP.START_MENU_WAITING);
                }
            } else if (step.equals(STEP.ADDING_PHONE_CONFIRMATION.name())) {
                if (data.equals("NO")) {
                    SendMessage sendMessage = new SendMessage();
                    sendMessage.setText("Iltimos Telefon Raqamni Qayta Yuboring!");
                    sendMessage.setChatId(chatId);
                    execute(sendMessage);
                } else {
                    SendMessage sendMessage = new SendMessage();
                    sendMessage.setChatId(chatId);
                    sendMessage.enableHtml(true);
                    sendMessage.setText("\uD83D\uDCC4 Mijoz INNsini kiriting:\n" +
                            "<i>Namuna:1234567</i>");
                    execute(sendMessage);
                    updateStep(STEP.ADDING_INN);
                }
            } else if (step.equals(STEP.PAGINATION_WAITING.name())) {
                System.out.println(data);
                if (data.equals("cancel")) {

                } else if (data.equals("previous")) {
                    doPagination(PaginationConfig.of(clientRepository.findAll(PageRequest.of(previousPage - 1, 10)), List.of("name", "territory.name"), previousMessageId, --previousPage, chatId, true, 1));
                } else if (data.equals("next")) {
                    doPagination(PaginationConfig.of(clientRepository.findAll(PageRequest.of(previousPage + 1, 10)), List.of("name", "territory.name"), previousMessageId, ++previousPage, chatId, true, 1));
                } else {
                    previousPage = Integer.parseInt(data);
                    doPagination(PaginationConfig.of(clientRepository.findAll(PageRequest.of(previousPage, 10)), List.of("name", "territory.name"), previousMessageId, previousPage, chatId, true, 1));
                }
            }
            ;
        }
    }


    private InlineKeyboardMarkup generateInlineKeyboardButtons(Map<String, String> buttonsArr, int columns, int currentPage, int totalPages) {
        InlineKeyboardMarkup markup = new InlineKeyboardMarkup();
        List<List<InlineKeyboardButton>> keyboard = new ArrayList<>();

        for (Map.Entry<String, String> entry : buttonsArr.entrySet()) {
            List<InlineKeyboardButton> row = new ArrayList<>();
            InlineKeyboardButton button = new InlineKeyboardButton();
            button.setText(entry.getValue());
            button.setCallbackData(entry.getKey());
            row.add(button);
            keyboard.add(row);
        }

        List<InlineKeyboardButton> navigationRow = new ArrayList<>();
        if (currentPage > 1) {
            InlineKeyboardButton button = new InlineKeyboardButton();
            button.setText("previous");
            button.setCallbackData("Previous");
            navigationRow.add(button);
        }
        if (currentPage < totalPages) {
            InlineKeyboardButton button = new InlineKeyboardButton();
            button.setText("next");
            button.setCallbackData("Next");
            navigationRow.add(button);
        }
        keyboard.add(navigationRow);

        markup.setKeyboard(keyboard);
        return markup;
    }


    @SneakyThrows
    private void generateStartMenu(SendMessage sendMessage, String text) {
        ReplyKeyboardMarkup markup = generateKeyboardButtons(
                "➕Yangi mijoz qo’shish",
                "\uD83D\uDCDD Mijoz ma’lumotlari",
                "✏\uFE0F Mijozni taxrirlash",
                " \uD83D\uDD0E Mijozni qidirish");
        sendMessage.setReplyMarkup(markup);

        sendMessage.setText(text);
        execute(sendMessage);
    }


    @SneakyThrows
    void requestLocationWithText(String text, String chatId) {
        SendMessage sendMessage = new SendMessage();
        sendMessage.setText(text);
        sendMessage.setChatId(chatId);

        ReplyKeyboardMarkup replyKeyboardMarkup = new ReplyKeyboardMarkup();
        replyKeyboardMarkup.setResizeKeyboard(true);
        KeyboardRow row = new KeyboardRow();

        KeyboardButton button = new KeyboardButton();
        button.setText("Locationni Yuborish!");
        button.setRequestLocation(true);

        row.add(button);


        replyKeyboardMarkup.setKeyboard(List.of(row));

        sendMessage.setReplyMarkup(replyKeyboardMarkup);
        execute(sendMessage);
    }

    private void updateStep(STEP updatingSTEP) {
        currentUser.setStep(updatingSTEP.name());
        TelegramUser save = repository.save(currentUser);
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

    private ReplyKeyboardMarkup generateKeyboardButtons(String... buttonTexts) {
        ReplyKeyboardMarkup markup = new ReplyKeyboardMarkup();
        List<KeyboardRow> keyboardRows = new ArrayList<>();

        int buttonsPerRow = 2; // Number of buttons in each row

        for (int i = 0; i < buttonTexts.length; i += buttonsPerRow) {
            KeyboardRow row = new KeyboardRow();

            if (i + buttonsPerRow <= buttonTexts.length) {
                // Add two buttons in this row
                row.add(buttonTexts[i]);
                row.add(buttonTexts[i + 1]);
            } else {
                // Add the last button if it's an odd count
                row.add(buttonTexts[i]);
            }

            keyboardRows.add(row);
        }

        markup.setKeyboard(keyboardRows);
        markup.setOneTimeKeyboard(true);
        markup.setResizeKeyboard(true);
        return markup;
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


    @Override
    public String getBotUsername() {
        return username;
    }

    @Override
    public String getBotToken() {
        return TOKEN;
    }
}

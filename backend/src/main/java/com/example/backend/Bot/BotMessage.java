package com.example.backend.Bot;

public enum BotMessage {
    SHARE_YOUR_CONTACT_MSG("Iltimos ma'lumotingizni ulashing"),
    ENTER_PHONE_NUMBER_MSG("Отправьте или введите свой номер телефона \uD83D\uDC47  в виде:\n+998  * ****");

    private final String message;

    BotMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}

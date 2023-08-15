//    package com.example.backend.TG;
//
//    import org.springframework.stereotype.Service;
//    import org.telegram.telegrambots.meta.api.methods.send.SendMessage;
//    import org.telegram.telegrambots.meta.api.objects.Message;
//    import org.telegram.telegrambots.meta.api.objects.Update;
//    import org.telegram.telegrambots.meta.api.objects.replykeyboard.InlineKeyboardMarkup;
//    import org.telegram.telegrambots.meta.api.objects.replykeyboard.buttons.InlineKeyboardButton;
//    import org.telegram.telegrambots.meta.api.objects.webapp.WebAppInfo;
//
//    import java.util.ArrayList;
//    import java.util.List;
//
//    @Service
//    public class Bot implements TelegramBotService{
//        private final String TOKEN = "6602647648:AAF6u5AZ_HNmmCLnRpf-CRapPQ08vg9izsk";
//        private final String webHookUrl = "https://6499-31-40-25-33.ngrok-free.app";
//
//        public void onUpdateReceived(Update update) {
//            Message message = update.getMessage();
//            SendMessage sendMessage = new SendMessage();
//            sendMessage.setChatId(message.getChatId());
//
//
//            InlineKeyboardMarkup inlineKeyboardMarkup = new InlineKeyboardMarkup();
//
//
//            List<InlineKeyboardButton> inlineKeyboardButtons  = new ArrayList<>();
//
//            InlineKeyboardButton webAppbutton = new InlineKeyboardButton();
//
//            webAppbutton.setText("Web App");
//            webAppbutton.setWebApp(WebAppInfo.builder()
//                            .url("https://41b5-31-40-25-33.ngrok-free.app/"+message.getChatId())
//                    .build());
//
//            inlineKeyboardButtons.add(webAppbutton);
//
//            inlineKeyboardMarkup.setKeyboard(List.of(inlineKeyboardButtons));
//
//
//            sendMessage.setReplyMarkup(inlineKeyboardMarkup);
//
//
//            sendMessage.setText(message.getText());
//            WebhookService.execute(sendMessage);
//        }
//
//        @Override
//        public String getTOKEN() {
//            return TOKEN;
//        }
//
//        @Override
//        public String getWebHookURL() {
//            return webHookUrl;
//        }
//    }

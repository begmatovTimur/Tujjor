//package com.example.backend.TelegramBotsApi.config;
//
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//import org.springframework.web.client.RestTemplate;
//import org.telegram.telegrambots.meta.api.methods.updates.SetWebhook;
//import org.telegram.telegrambots.meta.generics.BotSession;
//
//@Component
//public class RegisterBot implements CommandLineRunner {
//
//
//
//    @Override
//    public void run(String... args) throws Exception {
//
////        if (!BotConfig.DOMAIN.startsWith("https://")) {
////            throw new RuntimeException("Your domain must be HTTPS");
////        }
////        if (BotConfig.DOMAIN.isEmpty()) {
////            throw new RuntimeException("Please enter your personal domain");
////        }
////        if (BotConfig.DOMAIN.isEmpty()) {
////            throw new RuntimeException("Please enter your telegram bot token");
////        }
////        RestTemplate restTemplate = new RestTemplate();
////        Object forObject = restTemplate.getForObject(BotConfig.API_TELEGRAM+ "/setwebhook?url=" + BotConfig.DOMAIN + "/api/bot", Object.class);
////        System.out.println(forObject);
//    }
//}

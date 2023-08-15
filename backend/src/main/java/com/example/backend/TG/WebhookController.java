//package com.example.backend.TG;
//
//import org.springframework.web.bind.annotation.*;
//import org.telegram.telegrambots.meta.api.objects.Update;
//
//@RequestMapping("/api/bot")
//@RestController
//@CrossOrigin
//public  class WebhookController {
//    private final Bot bot;
//
//    public WebhookController(Bot bot) {
//        this.bot = bot;
//    }
//
//    @PostMapping
//    public void onUpdateReceived(@RequestBody Update update) {
//        bot.onUpdateReceived(update);
//    }
//}

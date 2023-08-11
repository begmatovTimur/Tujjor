//package com.example.backend.TG;
//
//import org.springframework.http.HttpEntity;
//import org.springframework.web.client.RestTemplate;
//
//
//public  class  WebhookService {
//
//
//    public static void execute(Object object) {
//        HttpEntity<Object> request = new HttpEntity<>(object);
//        try {
//            RestTemplate restTemplate = new RestTemplate();
//            restTemplate.postForObject(
//                    "https://api.telegram.org/bot"+BOT_TOKEN+"/"+object.getClass().getSimpleName(),
//                    request,
//                    Object.class
//            );
//        }catch (Exception e) {
//        }
//    }
//}

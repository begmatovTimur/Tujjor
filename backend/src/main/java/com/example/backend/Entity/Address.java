package com.example.backend.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

    @AllArgsConstructor
    @NoArgsConstructor
    @Data
    @Entity
    @Builder
    public class Address {
        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        private UUID id;
        private Double longitude;
        private Double latitude;
        private String city;
        private String district;
        private String street;
        private String house;
    }

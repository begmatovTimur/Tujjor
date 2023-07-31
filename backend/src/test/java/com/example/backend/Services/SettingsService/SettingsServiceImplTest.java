package com.example.backend.Services.SettingsService;

import com.example.backend.Entity.Settings;
import com.example.backend.Repository.SettingsRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class SettingsServiceImplTest {
    @Autowired
    SettingsRepository settingsRepository;

    @Test
    void itShouldGetAllSettings() {

        List<Settings> settings  =new ArrayList<>();
        settings.add(new Settings(null,"ASDADS","ADSA"));
        settings.add(new Settings(null,"ASDAADS","ADPSA"));
        settings.add(new Settings(null,"ASDFADS","AGDSA"));
        settings.add(new Settings(null,"ASDBADS","AADSA"));

        settingsRepository.saveAll(settings);

        Assertions.assertNotEquals(settingsRepository.findAll().size(),0);
    }
}
package com.example.backend.Services.SettingsService;

import com.example.backend.Entity.Settings;
import com.example.backend.Repository.SettingsRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class SettingsServiceImplTest {

    @InjectMocks
    private SettingsServiceImpl underTest;

    @Mock
    private SettingsRepository settingsRepository;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void itShouldGetAllTests() {
        // Create a sample list of settings for testing
        List<Settings> sampleSettingsList = Collections.singletonList(new Settings(UUID.randomUUID(),"Example","Example"));

        // Mock the behavior of the settingsRepository to return the sample settings list
        when(settingsRepository.findAll()).thenReturn(sampleSettingsList);

        // Call the getAllSettings method
        HttpEntity<?> result = underTest.getAllSettings();

        // Verify that the repository method was called
        verify(settingsRepository, times(1)).findAll();

        // Verify that the result is as expected
        ResponseEntity<?> expectedResponse = ResponseEntity.ok(sampleSettingsList);
        assertEquals(expectedResponse, result);
    }
}

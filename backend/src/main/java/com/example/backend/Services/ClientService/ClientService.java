package com.example.backend.Services.ClientService;

import com.example.backend.DTO.ClientDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface ClientService {
    HttpEntity saveClient(ClientDTO clientDTO);

    HttpEntity<?> getClient();

    HttpEntity<?> updateClient(UUID clientId, ClientDTO clientDTO);

    HttpEntity<?> getFilteredClients(Integer page, Integer limit, HttpServletRequest request) throws JsonProcessingException;

    HttpEntity<?> getTeritoriesForClients();
}

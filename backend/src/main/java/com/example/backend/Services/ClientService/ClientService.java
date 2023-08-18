package com.example.backend.Services.ClientService;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.DTO.ExcelDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

public interface ClientService {
    HttpEntity saveClient(ClientDTO clientDTO);

    HttpEntity<?> getClient();

    HttpEntity<?> updateClient(UUID clientId, ClientDTO clientDTO);

    HttpEntity<?> getFilteredClients(Integer page, Integer limit, HttpServletRequest request) throws JsonProcessingException;

    HttpEntity<?> getTeritoriesForClients();

    ResponseEntity<Resource> getExcel(HttpServletRequest request,String[] headers) throws IOException;
    HttpEntity<?> getAllLocation();
}

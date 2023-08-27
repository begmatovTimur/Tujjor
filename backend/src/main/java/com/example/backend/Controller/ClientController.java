package com.example.backend.Controller;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.DTO.ExcelDTO;
import com.example.backend.Repository.ClientRepository;
import com.example.backend.Services.ClientService.ClientService;
import com.example.backend.Services.Universal.UniversalService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/client")
public class ClientController {
    private final ClientService clientService;
    private final UniversalService universalService;
    @PostMapping
    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> saveClient(@RequestBody ClientDTO clientDTO){
        return clientService.saveClient(clientDTO);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> getClient(){
        return clientService.getClient();
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> updateClient(@RequestParam(defaultValue = "") UUID clientId, @RequestBody ClientDTO clientDTO){
        return clientService.updateClient(clientId,clientDTO);
    }

    @GetMapping("/pagination")
    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> pagination(@RequestParam Integer page,@RequestParam String limit, HttpServletRequest request) throws JsonProcessingException {
        return universalService.pagination(page,limit,request,"clients");
    }
    @GetMapping("/teritoriesForClients")
    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> getTerritoryForClients() {
        return clientService.getTerritoriesForClients();
    }


    @GetMapping("/clientsLocation")
    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> clientsLocation() {
        return clientService.getAllLocation();
    }

}

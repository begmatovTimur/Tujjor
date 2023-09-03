package com.example.backend.Controller;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Services.ClientService.ClientService;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/client")
public class ClientController {
    private final ClientService clientService;
    private final UniversalServiceFilter universalService;
    @PostMapping
    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> saveClient(@Valid @RequestBody ClientDTO clientDTO){
        return clientService.saveClient(clientDTO);
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> getClient(){
        System.out.println("salom");
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
}

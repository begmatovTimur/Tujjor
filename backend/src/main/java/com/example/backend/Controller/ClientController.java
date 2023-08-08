package com.example.backend.Controller;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Services.ClientService.ClientService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/client")
public class ClientController {

    private final ClientService clientService;

    @PostMapping
//    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> saveClient(@RequestBody ClientDTO clientDTO){
        System.out.println("Client keldi va ana: "+clientDTO);
        return clientService.saveClient(clientDTO);
    }

    @GetMapping
//    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> getClient(){
        return clientService.getClient();
    }

    @PutMapping
//    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> updateClient(@RequestParam(defaultValue = "") UUID clientId, @RequestBody ClientDTO clientDTO){
        System.out.println("client Yangilandi");
        return clientService.updateClient(clientId,clientDTO);
    }

    @GetMapping("/pagination")
//    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> getFilteredClients(@RequestParam Integer page,@RequestParam Integer limit, HttpServletRequest request) throws JsonProcessingException {
        return clientService.getFilteredClients(page,limit,request);
    }
}

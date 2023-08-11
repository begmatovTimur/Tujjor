package com.example.backend.Controller;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Repository.ClientRepository;
import com.example.backend.Services.ClientService.ClientService;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.awt.print.Pageable;
import java.io.IOException;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/client")
public class ClientController {

    private final ClientService clientService;
    private final ClientRepository repository;

    @PostMapping
    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> saveClient(@RequestBody ClientDTO clientDTO){
        System.out.println("Client keldi va ana: "+clientDTO);
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
        System.out.println("client Yangilandi");
        return clientService.updateClient(clientId,clientDTO);
    }

    @GetMapping("/pagination")
    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> getFilteredClients(@RequestParam Integer page,@RequestParam Integer limit, HttpServletRequest request) throws JsonProcessingException {
        return ResponseEntity.ok(repository.findAll(PageRequest.of(page,limit)));
    }
    @GetMapping("/teritoriesForClients")
    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    public HttpEntity<?> getTeritoryForClients() {
        return clientService.getTeritoriesForClients();
    }

    @GetMapping("/excel")
    public ResponseEntity<Resource> excel() throws IOException {
        return clientService.getExcel();
    }
}

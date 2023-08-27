package com.example.backend.Services.ClientService;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Entity.Client;
import com.example.backend.Payload.Reaquest.FilterData;
import com.example.backend.Projection.ClientProjection;
import com.example.backend.Repository.ClientRepository;
import com.example.backend.Repository.CustomerCategoryRepository;
import com.example.backend.Repository.TerritoryRepository;
import com.example.backend.Services.Universal.UniversalServiceFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final CustomerCategoryRepository categoryRepository;
    private final TerritoryRepository territoryRepository;
    private final UniversalServiceFilter serviceFilter;

    @Override
    public HttpEntity<?> saveClient(ClientDTO clientDTO) {
        Client save = clientRepository.save(generateClient(UUID.randomUUID(),clientDTO));
        return ResponseEntity.ok(save);
    }

    @Override
    public HttpEntity<?> getClient() {
            return ResponseEntity.ok(clientRepository.findAllByOrderByInsertionTime());
    }

    @Override
    public HttpEntity<?> getFilteredClients(Integer page, String limit, HttpServletRequest request) {
        if (validateParams(page, limit)) {
            return ResponseEntity.badRequest().body("Invalid page or limit value");
        }
        Pageable pageable = limit.equals("All") ? Pageable.unpaged() :
                PageRequest.of(page, Integer.parseInt(limit));
        FilterData params = serviceFilter.generateFilterDataFromRequest(request);
        Page<ClientProjection> clients = clientRepository.getAllFilteredFields(params.getCities(), params.getCustomerCategories(), params.getActive(), params.getTin(), params.getQuickSearch(), pageable);
        return ResponseEntity.ok(clients);
    }



    private static boolean validateParams(Integer page, String limit) {
        return !(limit.equals("All")) && (page == null || limit == null || page < 0 || Integer.parseInt(limit) < 1);
    }



    @Override
    @Transactional
    public ResponseEntity<?> updateClient(UUID clientId, ClientDTO clientDTO) {
        Client generatedClient = generateClient(clientId, clientDTO);
        clientRepository.save(generatedClient);
        return ResponseEntity.ok("Client updated successfully");
    }

    private Client generateClient(UUID id, ClientDTO clientDTO) {
        return Client.builder()
                .id(id)
                .active(clientDTO.getActive())
                .phone(clientDTO.getPhone())
                .category(categoryRepository.findById(clientDTO.getCategoryId()).orElseThrow())
                .tin(clientDTO.getTin())
                .companyName(clientDTO.getCompanyName())
                .address(clientDTO.getAddress())
                .territory(territoryRepository.findById(clientDTO.getTerritoryId()).orElseThrow())
                .name(clientDTO.getName())
                .longitude(clientDTO.getLongitude())
                .latitude(clientDTO.getLatitude())
                .insertionTime(LocalDateTime.now())
                .build();
    }
}

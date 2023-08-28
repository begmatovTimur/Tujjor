package com.example.backend.Services.ClientService;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Entity.Client;
import com.example.backend.Repository.ClientRepository;
import com.example.backend.Repository.CustomerCategoryRepository;
import com.example.backend.Repository.TerritoryRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    private final ClientRepository clientRepository;
    private final CustomerCategoryRepository categoryRepository;
    private final TerritoryRepository territoryRepository;

    @Override
    public HttpEntity<?> saveClient(ClientDTO clientDTO) {
        Client save = clientRepository.save(generateClient(UUID.randomUUID(), clientDTO));
        return ResponseEntity.ok(save);
    }

    @Override
    public HttpEntity<?> getClient() {
        List<Boolean> active = new ArrayList<>();
        active.add(true);
        active.add(false);
        return ResponseEntity.ok(clientRepository.getAllFilteredFields(new ArrayList<>(), new ArrayList<>(),active,"","", Pageable.unpaged()));
    }


    @Override
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

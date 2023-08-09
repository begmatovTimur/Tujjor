package com.example.backend.Services.ClientService;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.Entity.Client;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import com.example.backend.Projection.ClientProjection;
import com.example.backend.Projection.TerritoryClientProjection;
import com.example.backend.Repository.ClientRepository;
import com.example.backend.Repository.CustomerCategoryRepository;
import com.example.backend.Repository.TerritoryRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClientServiceImple implements ClientService {

    private final ClientRepository clientRepository;
    private final CustomerCategoryRepository categoryRepository;
    private final TerritoryRepository territoryRepository;

    @Override
    public HttpEntity<?> saveClient(ClientDTO clientDTO) {
        try {
            ResponseEntity<String> body = ifExistInputs(clientDTO);
            if (body != null) return body;
            Client save = clientRepository.save(generateClient(clientDTO));
            return ResponseEntity.ok(save);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error has occurred");
        }
    }

    @Override
    public HttpEntity<?> getClient() {
        try {
           return ResponseEntity.ok(clientRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error has occurred");
        }
    }

    @Override
    public HttpEntity<?> getFilteredClients(Integer page, Integer limit,HttpServletRequest request) throws JsonProcessingException {
        try {
            if (page == null || limit == null || page < 0 || limit < 1) {
                return ResponseEntity.badRequest().body("Invalid page or limit value");
            }
            JsonNode jsonNode = wrapToObject(request);
//            if (jsonNode == null || !jsonNode.has("city") || !jsonNode.has("category") || !jsonNode.has("day") ||
//                    !jsonNode.has("weeks") || !jsonNode.has("quickSearch") || !jsonNode.has("tin")) {
//                return ResponseEntity.badRequest().body("Invalid JSON input");
//            }
            boolean activeFilter = jsonNode.has("active") && jsonNode.get("active").isBoolean();
            Pageable pageable = PageRequest.of(page,limit);
            Page<ClientProjection> clients;
            if(!activeFilter){
                clients = clientRepository.filterWithoutActive(jsonNode.get("city").asText(),jsonNode.get("quickSearch").asText(),pageable);
            }else{
                clients = clientRepository.getAllFilteredFields(jsonNode.get("city").asText(),jsonNode.get("active").isBoolean(),jsonNode.get("quickSearch").asText(),pageable);
            }
            if (clients.isEmpty()) {
                return ResponseEntity.ok(new PageImpl<>(Collections.emptyList(), pageable, 0));
            }
            return ResponseEntity.ok(clients);
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error has occurred");
        }
    }

    private static JsonNode wrapToObject(HttpServletRequest request) throws JsonProcessingException {
        String searchParam = request.getHeader("searchParam");
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readTree(searchParam);
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateClient(UUID clientId, ClientDTO clientDTO) {
        try {
            ResponseEntity<String> body = ifExistInputs(clientDTO);
            if (body != null) return body;
            Client client = clientRepository.findById(clientId).orElseThrow(() -> new EntityNotFoundException("Client not found"));
            CustomerCategory category = categoryRepository.findById(clientDTO.getCategoryId()).orElseThrow(() -> new EntityNotFoundException("Category not found"));
            Territory territory = territoryRepository.findById(clientDTO.getTerritoryId()).orElseThrow(() -> new EntityNotFoundException("Territory not found"));
            client.setCategory(category);
            client.setName(clientDTO.getName());
            client.setAddress(clientDTO.getAddress());
            client.setTin(clientDTO.getTin());
            client.setRegistrationDate(clientDTO.getRegistrationDate());
            client.setLatitude(clientDTO.getLatitude());
            client.setLongitude(clientDTO.getLongitude());
            client.setPhone(clientDTO.getPhone());
            client.setTerritory(territory);
            client.setActive(clientDTO.getActive());
            client.setCompanyName(clientDTO.getCompanyName());
            clientRepository.save(client);
            return ResponseEntity.ok("Client updated successfully");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error has occurred");
        }
    }


    private static ResponseEntity<String> ifExistInputs(ClientDTO clientDTO) {
        if (clientDTO.getTerritoryId() == null || clientDTO.getAddress() == null || clientDTO.getPhone() == null || clientDTO.getTin() == null
                || clientDTO.getTerritoryId().toString().isEmpty()
                || clientDTO.getPhone().isEmpty() || clientDTO.getTin().isEmpty()) {
            return ResponseEntity.status(404).body("Fill the gaps!");
        }
        return null;
    }

    private Client generateClient(ClientDTO clientDTO) {
        UUID clientId = UUID.randomUUID();
        return Client.builder()
                .id(clientId)
                .registrationDate(clientDTO.getRegistrationDate())
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
                .build();
    }

    @Override
    public HttpEntity<?> getTeritoriesForClients() {
        System.out.println("kirdi");
        List<TerritoryClientProjection> allteritoryForCliens = territoryRepository.getAllteritoryForCliens();
        return ResponseEntity.ok(allteritoryForCliens);
    }
}

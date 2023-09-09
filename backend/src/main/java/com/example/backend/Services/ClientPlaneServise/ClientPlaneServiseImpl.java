package com.example.backend.Services.ClientPlaneServise;

import com.example.backend.DTO.ClientPlanDTO;
import com.example.backend.Entity.Client;
import com.example.backend.Entity.ClientPlan;
import com.example.backend.Projection.ClientPlaneProjection;
import com.example.backend.Repository.ClientPlaneRepository;
import com.example.backend.Repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClientPlaneServiseImpl implements ClientPlaneServise{
    private final ClientPlaneRepository clientPlaneRepository;
    private final ClientRepository clientRepository;

    @Override
    public HttpEntity<?> getPlansById(UUID clientId) {
        List<ClientPlaneProjection> allClientPlaneByID = clientPlaneRepository.findAllByClientIdOrderByCreatedDateDesc(clientId);
        return ResponseEntity.ok(allClientPlaneByID);
    }

    @Override
    public HttpEntity<?> addNewPlane(ClientPlanDTO clientPlanDTO) {
        Client client = clientRepository.findById(clientPlanDTO.getClientId()).get();
        ClientPlan newClientPlan = new ClientPlan(
                UUID.randomUUID(),
                client,
                clientPlanDTO.getAmount(),
                clientPlanDTO.getDate(),
                LocalDateTime.now()
        );
        clientPlaneRepository.save(newClientPlan);
        return ResponseEntity.ok("Plan added successfully");
    }

    @Override
    public void editePlane(ClientPlanDTO clientPlanDTO, UUID planeId) {
        Client client = clientRepository.findById(clientPlanDTO.getClientId()).get();
        ClientPlan byId = clientPlaneRepository.findById(planeId).get();
        ClientPlan clientPlan = new ClientPlan(
                planeId,
                client,
                clientPlanDTO.getAmount(),
                clientPlanDTO.getDate(),
                byId.getCreatedDate()
        );
        clientPlaneRepository.save(clientPlan);
    }

    @Override
    public HttpEntity<?> getPlanForMap(UUID clientId) {
        List<ClientPlaneProjection> planeForMap = clientPlaneRepository.getPlaneForMap(clientId);
        return ResponseEntity.ok(planeForMap);
    }
}

package com.example.backend.Services.ClientPlaneServise;

import com.example.backend.DTO.ClientPlanDTO;
import com.example.backend.Entity.Client;
import com.example.backend.Entity.ClientPlan;
import com.example.backend.Payload.ResPlans;
import com.example.backend.Repository.ClientPlaneRepository;
import com.example.backend.Repository.ClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ClientPlaneServiseImpl implements ClientPlaneServise{
    private final ClientPlaneRepository clientPlaneRepository;
    private final ClientRepository clientRepository;

    @Override
    public HttpEntity<?> getPlansById(UUID clientId) {
        List<ClientPlan> clientPlans = clientPlaneRepository.findAllByClientIdOrderByCreatedDate(clientId);
        List<ResPlans> result = new ArrayList<>();
        DateTimeFormatter monthFormat = DateTimeFormatter.ofPattern("MM");
        for (ClientPlan clientPlan : clientPlans) {
            result.add(new ResPlans(
                    clientPlan.getId(),
                    clientPlan.getAmount(),
                    clientPlan.getDate(),
                    clientPlan.getCreatedDate().format(monthFormat).equals(LocalDate.now().format(monthFormat))
                    )
            );
        }
        return ResponseEntity.ok(result);
    }

    @Override
    public void addNewPlane(ClientPlanDTO clientPlanDTO) {
        Client client = clientRepository.findById(clientPlanDTO.getClientId()).get();
        ClientPlan clientPlan = new ClientPlan(
                UUID.randomUUID(),
                client,
                clientPlanDTO.getAmount(),
                clientPlanDTO.getDate(),
                LocalDate.now()
        );
        clientPlaneRepository.save(clientPlan);
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
}

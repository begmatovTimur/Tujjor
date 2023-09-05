package com.example.backend.Services.ClientPlaneServise;

import com.example.backend.DTO.ClientPlanDTO;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface ClientPlaneServise {
    HttpEntity<?> getPlansById(UUID clientId);

    void addNewPlane(ClientPlanDTO clientPlanDTO);

    void editePlane(ClientPlanDTO clientPlanDTO, UUID planeId);
}

package com.example.backend.Controller;

import com.example.backend.DTO.ClientPlanDTO;
import com.example.backend.Services.ClientPlaneServise.ClientPlaneServise;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/plane")
@RequiredArgsConstructor
public class ClientPlaneController {
    private final ClientPlaneServise clientPlaneServise;
    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    @GetMapping
    public HttpEntity<?> getPlane(@RequestParam(defaultValue = "") UUID clientId) {
        return clientPlaneServise.getPlansById(clientId);
    }
    @PostMapping
    public void addPlane(@RequestBody ClientPlanDTO clientPlanDTO) {
        clientPlaneServise.addNewPlane(clientPlanDTO);
    }
    @PutMapping
    public void editePlane(@RequestBody ClientPlanDTO clientPlanDTO, @RequestParam UUID planeId) {
        clientPlaneServise.editePlane(clientPlanDTO, planeId);
    }
}

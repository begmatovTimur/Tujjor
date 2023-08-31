package com.example.backend.Services.AgentsService;

import com.example.backend.DTO.AgentDTO;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface AgentsService {
    HttpEntity<?> getAgents();

    HttpEntity<?> postAgent(AgentDTO agentDto);

    HttpEntity<?> putAgent(UUID id, AgentDTO agentDto);

    void deleteAgent(UUID id);
}

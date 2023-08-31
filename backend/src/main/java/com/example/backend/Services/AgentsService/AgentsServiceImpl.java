package com.example.backend.Services.AgentsService;

import com.example.backend.DTO.AgentDTO;
import com.example.backend.Entity.Agent;
import com.example.backend.Repository.AgentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AgentsServiceImpl implements AgentsService{
    private final AgentRepository agentRepository;
    @Override
    public HttpEntity<?> getAgents() {
        return ResponseEntity.ok(agentRepository.findAllByPagination("", Pageable.unpaged()));
    }

    @Override
    public HttpEntity<?> postAgent(AgentDTO agentDto) {
        Agent agent = new Agent(UUID.randomUUID(), agentDto.getUsername(), agentDto.getPhone(), agentDto.getPassword());
        Agent saved = agentRepository.save(agent);
        return ResponseEntity.ok(saved);
    }


    @Override
    public HttpEntity<?> putAgent(UUID id, AgentDTO agentDto) {
        Agent agent = agentRepository.findById(id).get();
        agent.setUsername(agentDto.getUsername());
        agent.setPhone(agentDto.getPhone());
        agent.setPassword(agentDto.getPassword());
        Agent edited = agentRepository.save(agent);
        return ResponseEntity.ok(edited);
    }

    @Override
    public void deleteAgent(UUID id) {
      agentRepository.deleteById(id);
    }
}

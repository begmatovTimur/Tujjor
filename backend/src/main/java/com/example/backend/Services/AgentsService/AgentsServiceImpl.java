package com.example.backend.Services.AgentsService;

import com.example.backend.DTO.AgentDTO;
import com.example.backend.Entity.Agent;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Enums.RoleEnum;
import com.example.backend.Repository.AgentRepository;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AgentsServiceImpl implements AgentsService {
    private final AgentRepository agentRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
private final UsersRepository usersRepository;
    @Override
    public HttpEntity<?> getAgents() {
        return ResponseEntity.ok(agentRepository.findAllByPagination("" ,Pageable.unpaged()));
    }

    @Override
    public HttpEntity<?> postAgent(AgentDTO agentDto) {
        List<Role> roles = List.of(
                roleRepository.findByRoleName(RoleEnum.ROLE_AGENT.name())
        );
        User user = User.builder()
                .phone(agentDto.getPhone())
                .password(passwordEncoder.encode(agentDto.getPassword()))
                .roles(roles)
                .username(agentDto.getUsername())
                .build();
        User save = usersRepository.save(user);
        agentRepository.save(Agent.builder()
                .user(save)
                .username(agentDto.getUsername())
                .build());
        return ResponseEntity.ok("saved");
    }


    @Override
    public HttpEntity<?> putAgent(UUID id, AgentDTO agentDto) {
        Agent agent = agentRepository.findById(id).get();
        agent.setUsername(agentDto.getUsername());
//        agent.setPhone(agentDto.getPhone());
//        agent.setPassword(agentDto.getPassword());
        Agent edited = agentRepository.save(agent);
        return ResponseEntity.ok(edited);
    }

    @Override
    public void deleteAgent(UUID id) {
        agentRepository.deleteById(id);
    }
}

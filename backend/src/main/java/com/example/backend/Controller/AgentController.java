package com.example.backend.Controller;

import com.example.backend.DTO.AgentDTO;
import com.example.backend.DTO.UserDTO;
import com.example.backend.Services.AgentsService.AgentsService;
import com.example.backend.Services.Universal.UniversalServiceFilterImpl;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/agent")
@RequiredArgsConstructor
public class AgentController {
    private final UniversalServiceFilterImpl universalServiceFilter;
    private final AgentsService agentsService;
    @GetMapping
    public HttpEntity<?> getAgents(HttpServletRequest request){
         return agentsService.getAgents();
    }

    @GetMapping("/pagination")
    public HttpEntity<?> pagination(HttpServletRequest request,@RequestParam Integer page,@RequestParam String limit) {
      return universalServiceFilter.pagination(page,limit,request,"agents");
    };
    @PostMapping
    public HttpEntity<?> postAgent(@RequestBody AgentDTO agentDto){
        return agentsService.postAgent(agentDto);
    }
    @PutMapping("/{id}")
    public HttpEntity<?> putAgent(@PathVariable UUID id, @RequestBody AgentDTO agentDto){
        return agentsService.putAgent(id,agentDto);
    }
    @DeleteMapping("/{id}")
    public void deleteAgent(@PathVariable UUID id){
        agentsService.deleteAgent(id);
    }
}

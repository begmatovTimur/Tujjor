package com.example.backend.Projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface AgentProjection extends ExcelExportable{
    @Value("#{target.agent_id}")
    UUID agentId();

    @Value("#{target.user_id}")
    UUID userId();

    String getUsername();

    String getPhone();

}

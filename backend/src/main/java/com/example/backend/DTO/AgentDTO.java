package com.example.backend.DTO;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AgentDTO  {
    private String username;
    private String phone;
    private String password;
}

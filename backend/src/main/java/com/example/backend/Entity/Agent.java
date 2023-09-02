package com.example.backend.Entity;


import com.example.backend.Projection.ExcelExportable;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "agents")
@AllArgsConstructor
@Data
@NoArgsConstructor
public class Agent implements ExcelExportable {
    @Id
    @GeneratedValue
    private UUID id;
    private String username;
    @Column(nullable = false)
    private String phone;
    @Column(nullable = false)
    private String password;
}

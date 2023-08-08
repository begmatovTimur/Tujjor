package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Builder
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @OneToOne
    private Territory territory;
    private String name;
    private String address;
    private String phone;
    private String tin;
    private String companyName;
    private String referencePoint;
    private double longitude;
    private double latitude;
    private Boolean active;
    private LocalDate registrationDate;
    @ManyToOne
    private CustomerCategory category;
}

package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
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

    @ManyToOne
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
    @CreationTimestamp
    private Timestamp registrationDate;
    private LocalDateTime insertionTime;
    @ManyToOne(fetch = FetchType.EAGER)
    private CustomerCategory category;
}

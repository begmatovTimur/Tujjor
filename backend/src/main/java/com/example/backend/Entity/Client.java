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
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.EAGER)
    private Territory territory;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private String phone;
    private String tin;
    @Column(nullable = false)
    private String companyName;
    @Column(nullable = false)
    private String referencePoint;
    @Column(nullable = false)
    private double longitude;
    @Column(nullable = false)
    private double latitude;
    private Boolean active;
    @CreationTimestamp
    private Timestamp registrationDate;
    private LocalDateTime insertionTime;
    @ManyToOne(fetch = FetchType.EAGER)
    private CustomerCategory category;
}

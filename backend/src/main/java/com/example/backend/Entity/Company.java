package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.EnableMBeanExport;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "company")
@Builder
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String companyName;
    @OneToOne(fetch = FetchType.EAGER)
    private User superVisor;
    @Column(nullable = false)
    private String supportPhone;
    @Column(nullable = false)
    private String email;
    @Column(nullable = false)
    private String region;
    @Column(nullable = false)
    private String address;
}

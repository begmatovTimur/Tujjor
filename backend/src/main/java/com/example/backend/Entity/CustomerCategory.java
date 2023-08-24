package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.glassfish.grizzly.http.util.TimeStamp;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@Data
@Table(name = "customer_category")
@Entity
@Builder
@NoArgsConstructor
public class CustomerCategory {
    public CustomerCategory(Integer id, String region, String code, String name, String description, Boolean active) {
        this.id = id;
        this.region = region;
        this.code = code;
        this.name = name;
        this.description = description;
        this.active = active;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String region;
    private  String code;
    private String  name;
    private String description;
    private Boolean active;
    @CreationTimestamp
    private LocalDateTime insertion_time;
}

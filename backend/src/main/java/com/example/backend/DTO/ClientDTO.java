package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientDTO {
    private UUID territoryId;
    private Integer categoryId;
    private String name;
    private String companyName;
    private String referencePoint;;
    private String address;
    private String phone;
    private Boolean active;
    private LocalDate registrationDate;
    private String tin;
    private double longitude;
    private double latitude;
}

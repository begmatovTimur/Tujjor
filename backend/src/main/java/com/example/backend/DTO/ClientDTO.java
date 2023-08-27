package com.example.backend.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    @NotNull(message = "TerritoryId Not Should Be Null!")
    @NotBlank(message = "TerritoryId Should Not Be Empty!")
    private UUID territoryId;
    private Integer categoryId;
    private String name;
    private String companyName;
    private String referencePoint;;
    @NotNull(message = "Address Should Not Be Null!")
    private String address;
    @NotNull(message = "Phone Should Not Be Null!")
    @NotBlank(message = "Phone Should Not Be Empty!")
    private String phone;
    private Boolean active;
    private LocalDate registrationDate;
    private String tin;
    private double longitude;
    private double latitude;
}

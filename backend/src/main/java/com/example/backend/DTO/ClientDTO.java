package com.example.backend.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.annotation.Nullable;
import java.time.LocalDate;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientDTO {

    @NotBlank(message = "territory is empty!")
    private UUID territoryId;
    private Integer categoryId;
    private String name;
    private String companyName;
    private String referencePoint;
    @NotBlank(message = "address is empty!")
    @NotNull(message = "address should not be null")
    private String address;
    @NotBlank(message = "phone is empty!")
    @NotNull(message = "phone should not be null")
    private String phone;
    private Boolean active;
    private LocalDate registrationDate;
    private String tin;
    private double longitude;
    private double latitude;
}

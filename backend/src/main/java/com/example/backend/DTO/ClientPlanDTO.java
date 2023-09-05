package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.checkerframework.checker.units.qual.A;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientPlanDTO {
    private UUID clientId;
    private Integer amount;
    private LocalDate date;
}

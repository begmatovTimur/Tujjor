package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TerritoryDTO {
    private String region;
    private String title;
    private String code;
    private Boolean active;
    private double longitude;
    private double latitude;
}

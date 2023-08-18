package com.example.backend.Payload.Respons;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResClientsTerritories {
    private String name;
    private List<Double> territories;
    private Boolean active;
}

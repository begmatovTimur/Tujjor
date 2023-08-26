package com.example.backend.Payload.Reaquest;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class FilterData {
    private List<UUID> cities;
    private List<Integer> customerCategories;

    private String active;

    private String tin;

    private String quickSearch;
}

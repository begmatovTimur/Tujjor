package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ClientSearchDTO {
    private List<UUID> city;
    private List<Integer> category;
    private Boolean active;
    private String search;
    private Integer page;
    private Integer limit;
}

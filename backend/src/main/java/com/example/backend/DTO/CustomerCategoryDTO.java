package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerCategoryDTO {
    private String region;
    private  String code;
    private String  name;
    private String description;
    private boolean active;
}

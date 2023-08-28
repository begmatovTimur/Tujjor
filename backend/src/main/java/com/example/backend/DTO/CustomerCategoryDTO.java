package com.example.backend.DTO;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerCategoryDTO {
    @NotNull(message = "region cannot be null")
    @NotBlank(message = "region cannot be empty!")
    private String region;
    @NotNull(message = "code cannot be null")
    @NotBlank(message = "code cannot be empty")
    private  String code;
    @NotNull(message = "name cannot be null")
    @NotBlank(message = "name cannot be null")
    private String  name;
    private String description;
    @NotNull(message = "active cannot be null")
    private boolean active;
}

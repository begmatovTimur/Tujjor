package com.example.backend.Services.Universal;

import com.example.backend.Payload.Reaquest.FilterData;
import com.example.backend.Projection.ExcelExportable;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NotBlank
@Builder
public class PaginationConfig {
    private String component;
    private Page pagination;
    private FilterData filterData;
    private Pageable pageable;

}

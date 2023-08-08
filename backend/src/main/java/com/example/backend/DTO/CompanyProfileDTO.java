package com.example.backend.DTO;

import com.example.backend.Entity.Address;
import com.example.backend.Entity.User;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyProfileDTO {
    private String companyName;
    private User superVisor;
    private String supportPhone;
    private String email;
    private String region;
    private Address address;
}

package com.example.backend.Projection;


import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;
import java.util.UUID;

public interface ClientProjection {

     UUID getId();

     @Value("#{target.name}")
     String getClientName();
     @Value("#{target.company_name}")
     String getCompanyName();
     @Value("#{target.phone}")
     Boolean getTelephone();

     Double getLatitude();

     Double getLongitude();
     @Value("#{target.city}")
     String getRegion();

     String getAddress();

     @Value("#{target.categoryName}")
     String getCategoryName();

     Boolean getActive();

     @Value("#{target.registration_date}")
     LocalDate getRegistrationDate();
}

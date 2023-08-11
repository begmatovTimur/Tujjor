package com.example.backend.Projection;


import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDate;
import java.util.UUID;

public interface ClientProjection {

     UUID getId();
     
     @Value("#{target.name}")
     String getClientName();
     @Value("#{target.companyName}")
     String getCompanyName();
     @Value("#{target.categoryName}")
     String getCategoryName();
     @Value("#{target.phone}")
     String getTelephone();

     @Value("#{target.territoryId}")
     String getTerritoryId();

     @Value("#{target.categoryId}")
     String getCategoryId();

     Double getLatitude();

     Double getLongitude();
     @Value("#{target.city}")
     String getRegion();


     String getAddress();

     @Value("#{target.active}")
     Boolean getActive();

     @Value("#{target.registrationDate}")
     LocalDate getRegistrationDate();
}

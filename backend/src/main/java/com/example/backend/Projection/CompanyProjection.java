package com.example.backend.Projection;

import org.springframework.beans.factory.annotation.Value;

import java.sql.Timestamp;
import java.util.UUID;

public interface CompanyProjection {

Integer getId();
String getRegion();

@Value("#{target.company_name}")
String getCompanyName();
@Value("#{target.support_phone}")
String getSupportPhone();
String getEmail();
String getAddress();
}

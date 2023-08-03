package com.example.backend.Projection;


import java.util.UUID;

public interface TerritoryProjection {

UUID getId();
String getRegion();
String getName();
Boolean getActive();
Double getLatitude();
Double getLongitude();
String getCode();

}

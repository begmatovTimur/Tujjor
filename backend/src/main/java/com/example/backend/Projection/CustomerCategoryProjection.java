package com.example.backend.Projection;

public interface CustomerCategoryProjection extends ExcelExportable{

Integer getId();
String getCode();
String getName();
String getDescription();
String getRegion();
Boolean getActive();
}

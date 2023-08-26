package com.example.backend.Services.Universal;

import com.example.backend.Payload.Reaquest.FilterData;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.servlet.http.HttpServletRequest;

public interface UniversalServiceFilter {
    FilterData generateFilterDataFromRequest(HttpServletRequest request);
    JsonNode wrapToObject(HttpServletRequest request);
}

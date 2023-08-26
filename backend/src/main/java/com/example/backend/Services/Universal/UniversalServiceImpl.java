package com.example.backend.Services.Universal;

import com.example.backend.Payload.Reaquest.FilterData;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.Filter;
import jakarta.servlet.http.HttpServletRequest;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Service
public class UniversalServiceImpl implements UniversalService {
    @SneakyThrows
    @Override
    public  JsonNode wrapToObject(HttpServletRequest request)  {
        String searchParam = request.getHeader("searchParam");
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readTree(searchParam);
    }
    @SneakyThrows
    public FilterData generateFilterDataFromRequest(HttpServletRequest request)  {
        FilterData filterData = new FilterData();
        JsonNode jsonNode = wrapToObject(request);
        JsonNode cityArrayNode = jsonNode.get("city");
        JsonNode jsonNodeActive = jsonNode.get("active");
        JsonNode jsonNodeLimit = jsonNode.get("limit");
        JsonNode jsonNodeCurrentPage = jsonNode.get("page");
        List<UUID> cities = new ArrayList<>();
        for (JsonNode cityNode : cityArrayNode) {
            UUID cityId = UUID.fromString(cityNode.asText());
            cities.add(cityId);
        }
        filterData.setCities(cities);
        JsonNode categoryArray = jsonNode.get("customerCategories");
        List<Integer> customerCategoriesParam = new ArrayList<>();
        for (JsonNode cityNode : categoryArray) {
            customerCategoriesParam.add(cityNode.asInt());
        }

        JsonNode jsonNodeTin = jsonNode.get("tin");
        JsonNode jsonNodeQuickSearch = jsonNode.get("quickSearch");
        return FilterData.builder()
                .tin(jsonNodeTin.asText())
                .active(jsonNodeActive.asText())
                .cities(cities)
                .quickSearch(jsonNodeQuickSearch.asText())
                .page(jsonNodeCurrentPage.asInt())
                .customerCategories(customerCategoriesParam)
                .limit(jsonNodeLimit==null?"":jsonNodeLimit.asText())
                .build();
    }
}

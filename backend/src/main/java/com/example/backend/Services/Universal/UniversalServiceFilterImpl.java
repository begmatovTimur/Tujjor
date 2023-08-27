package com.example.backend.Services.Universal;

import com.example.backend.Payload.Reaquest.FilterData;
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
public class UniversalServiceFilterImpl implements UniversalServiceFilter {
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
        JsonNode jsonNodeLimit = jsonNode.get("limit");
        JsonNode jsonNodeCurrentPage = jsonNode.get("page");
        int currentPageValue = (jsonNodeCurrentPage != null && !jsonNodeCurrentPage.isNull()) ? jsonNodeCurrentPage.asInt() : 0;
        List<UUID> cities = new ArrayList<>();
        for (JsonNode cityNode : cityArrayNode) {
            UUID cityId = UUID.fromString(cityNode.asText());
            cities.add(cityId);
        }
        filterData.setCities(cities);

        List<Boolean> active = new ArrayList<>();
        JsonNode activeNode = jsonNode.get("active");
        for (JsonNode activeNodeArr : activeNode) {
            Boolean x = activeNodeArr.asBoolean();
            active.add(x);
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
                .active(active)
                .cities(cities)
                .quickSearch(jsonNodeQuickSearch.asText())
                .page(currentPageValue)
                .customerCategories(customerCategoriesParam)
                .limit(jsonNodeLimit==null?"":jsonNodeLimit.asText())
                .build();
    }
}

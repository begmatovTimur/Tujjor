package com.example.backend.Services.ClientService;

import com.example.backend.DTO.ClientDTO;
import com.example.backend.DTO.ClientSearchDTO;
import com.example.backend.DTO.ExcelDTO;
import com.example.backend.Entity.Client;
import com.example.backend.Entity.CustomerCategory;
import com.example.backend.Entity.Territory;
import com.example.backend.Payload.Respons.ResClientsTerritories;
import com.example.backend.Projection.ClientProjection;
import com.example.backend.Projection.CompanyProjection;
import com.example.backend.Projection.TerritoryClientProjection;
import com.example.backend.Repository.ClientRepository;
import com.example.backend.Repository.CustomerCategoryRepository;
import com.example.backend.Repository.TerritoryRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ClientServiceImple implements ClientService {

    private final ClientRepository clientRepository;
    private final CustomerCategoryRepository categoryRepository;
    private final TerritoryRepository territoryRepository;

    @Override
    public HttpEntity<?> saveClient(ClientDTO clientDTO) {
        try {
            ResponseEntity<String> body = ifExistInputs(clientDTO);
            if (body != null) return body;
            Client save = clientRepository.save(generateClient(clientDTO));
            return ResponseEntity.ok(save);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error has occurred");
        }
    }

    @Override
    public HttpEntity<?> getClient() {
        try {
            return ResponseEntity.ok(clientRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error has occurred");
        }
    }

    @Override
    public HttpEntity<?> getFilteredClients(Integer page, Integer limit, HttpServletRequest request) throws JsonProcessingException {
        try {
            if (page == null || limit == null || page < 0 || limit < 1) {
                return ResponseEntity.badRequest().body("Invalid page or limit value");
            }
            JsonNode jsonNode = wrapToObject(request);
            JsonNode cityArrayNode = jsonNode.get("city");
            List<UUID> cities = new ArrayList<>();
            for (JsonNode cityNode : cityArrayNode) {
                UUID cityId = UUID.fromString(cityNode.asText());
                cities.add(cityId);
            }
            JsonNode categoryArray = jsonNode.get("customerCategories");
            List<Integer> customerCategoriesParam = new ArrayList<>();
            for (JsonNode cityNode : categoryArray) {
                customerCategoriesParam.add(cityNode.asInt());
            }
            Pageable pageable = PageRequest.of(page, limit);
            Page<ClientProjection> clients = clientRepository.getAllFilteredFields(cities, customerCategoriesParam, jsonNode.get("active").asText(), jsonNode.get("tin").asText(), jsonNode.get("quickSearch").asText(), pageable);
            if (clients.isEmpty()) {
                return ResponseEntity.ok(new PageImpl<>(Collections.emptyList(), pageable, 0));
            }
            return ResponseEntity.ok(clients);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error has occurred");
        }
    }

    private static JsonNode wrapToObject(HttpServletRequest request) throws JsonProcessingException {
        String searchParam = request.getHeader("searchParam");
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readTree(searchParam);
    }

    @Override
    @Transactional
    public ResponseEntity<?> updateClient(UUID clientId, ClientDTO clientDTO) {
        try {
            ResponseEntity<String> body = ifExistInputs(clientDTO);
            if (body != null) return body;
            Client client = clientRepository.findById(clientId).orElseThrow(() -> new EntityNotFoundException("Client not found"));
            CustomerCategory category = categoryRepository.findById(clientDTO.getCategoryId()).orElseThrow(() -> new EntityNotFoundException("Category not found"));
            Territory territory = territoryRepository.findById(clientDTO.getTerritoryId()).orElseThrow(() -> new EntityNotFoundException("Territory not found"));
            client.setCategory(category);
            client.setName(clientDTO.getName());
            client.setAddress(clientDTO.getAddress());
            client.setTin(clientDTO.getTin());
            client.setLatitude(clientDTO.getLatitude());
            client.setLongitude(clientDTO.getLongitude());
            client.setPhone(clientDTO.getPhone());
            client.setTerritory(territory);
            client.setActive(clientDTO.getActive());
            client.setCompanyName(clientDTO.getCompanyName());
            clientRepository.save(client);
            return ResponseEntity.ok("Client updated successfully");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error has occurred");
        }
    }


    private static ResponseEntity<String> ifExistInputs(ClientDTO clientDTO) {
        if (clientDTO.getTerritoryId() == null || clientDTO.getAddress() == null || clientDTO.getPhone() == null ||
                clientDTO.getTerritoryId().toString().isEmpty()
                || clientDTO.getPhone().isEmpty()) {
            return ResponseEntity.status(404).body("Fill the gaps!");
        }
        return null;
    }

    private Client generateClient(ClientDTO clientDTO) {
        UUID clientId = UUID.randomUUID();
        return Client.builder()
                .id(clientId)
                .active(clientDTO.getActive())
                .phone(clientDTO.getPhone())
                .category(categoryRepository.findById(clientDTO.getCategoryId()).orElseThrow())
                .tin(clientDTO.getTin())
                .companyName(clientDTO.getCompanyName())
                .address(clientDTO.getAddress())
                .territory(territoryRepository.findById(clientDTO.getTerritoryId()).orElseThrow())
                .name(clientDTO.getName())
                .longitude(clientDTO.getLongitude())
                .latitude(clientDTO.getLatitude())
                .insertionTime(LocalDateTime.now())
                .build();
    }

    @Override
    public HttpEntity<?> getTeritoriesForClients() {
        List<TerritoryClientProjection> allteritoryForCliens = territoryRepository.getAllteritoryForCliens();
        return ResponseEntity.ok(allteritoryForCliens);
    }

    @Override
    @SneakyThrows
    public ResponseEntity<Resource> getExcel(List<ExcelDTO> columns) {
//        Pageable pageable = PageRequest.of(dto.getPage(),dto.getLimit());
        List<Client> all = clientRepository.findAllOrderedClient();
        XSSFWorkbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("Company info");
        Row row = sheet.createRow(0);
        for (int i = 0; i < columns.size(); i++) {
            if(columns.get(i).getShow()) {
                row.createCell(i).setCellValue(columns.get(i).getTitle());
            }
        }
        int counter = 1;
        for (Client client : all) {
            Row dataRow = sheet.createRow(counter);
            counter++;
            for (int i = 0; i < columns.size(); i++) {
                dataRow.createCell(0).setCellValue(client.getName());
                dataRow.createCell(1).setCellValue(client.getAddress());
                dataRow.createCell(2).setCellValue(client.getPhone());
                dataRow.createCell(3).setCellValue(client.getTin());
                dataRow.createCell(4).setCellValue(client.getCompanyName());
                dataRow.createCell(5).setCellValue(client.getLongitude());
                dataRow.createCell(6).setCellValue(client.getLatitude());
                dataRow.createCell(7).setCellValue(client.getActive().toString());
                dataRow.createCell(8).setCellValue(client.getRegistrationDate());
            }
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        workbook.write(outputStream);
        workbook.close();

        ByteArrayResource resource = new ByteArrayResource(outputStream.toByteArray());

        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=CompanyInfo.xlsx");

        return ResponseEntity
                .status(HttpStatus.OK)
                .headers(headers)
                .body(resource);
    }

    @Override
    public HttpEntity<?> getAllLocation() {
        List<ResClientsTerritories> result = new ArrayList<>();
        List<Client> clients = clientRepository.findAllByActiveIsTrue();
        for (Client client : clients) {
            result.add(new ResClientsTerritories(
                    client.getName(),
                    List.of(client.getLatitude(), client.getLongitude())
            ));
        }
        return ResponseEntity.ok(result);
    }
}

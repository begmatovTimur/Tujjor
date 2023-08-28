package com.example.backend.Repository;

import com.example.backend.Entity.Territory;
import com.example.backend.Projection.TerritoryProjection;
import com.example.backend.Projection.TerritoryRegionProjection;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class TerritoryRepositoryTest {

    @Autowired
    private TerritoryRepository territoryRepository;

    @Autowired
    private TestEntityManager entityManager;

    @Test
    public void testGetFilteredData() {
        Territory territory1 = new Territory();
        entityManager.persist(territory1);

        String search = "search text";
        List<Boolean> status = new ArrayList<>();
        status.add(true);
        PageRequest pageable = PageRequest.of(0, 10);

        Page<TerritoryProjection> result = territoryRepository.getFilteredData(search, status, pageable);

        assertEquals(10, result.getSize());
    }

    @Test
    public void testFindAllRegion() {
        Territory territory1 = new Territory();
        entityManager.persist(territory1);

        List<TerritoryRegionProjection> result = territoryRepository.findAllRegion();

        assertEquals(6, result.size());
    }
}

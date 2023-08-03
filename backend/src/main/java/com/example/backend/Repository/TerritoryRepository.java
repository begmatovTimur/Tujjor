package com.example.backend.Repository;

import com.example.backend.Entity.Territory;
import com.example.backend.Projection.TerritoryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TerritoryRepository extends JpaRepository<Territory, UUID> {
    @Query(value=" SELECT t.active, latitude, longitude, id, code, name, region FROM territory t order by ord ",nativeQuery = true)
    List<TerritoryProjection> findAllByCreatedAt();
    @Query(value = "select id,region,name from territory t where t.active = :status and lower(COALESCE(t.region, '') || ' ' || COALESCE(t.name, '')) like lower(concat('%',:search,'%'))",nativeQuery = true)
    List<TerritoryProjection> findTerritoryByActiveAndRegionName(String search, Boolean status);

    @Query(value = "select id,region,name from territory t where lower(COALESCE(t.region, '') || ' ' || COALESCE(t.name, '')) like lower(concat('%',:search,'%'))",nativeQuery = true)
    List<TerritoryProjection> findTerritoryByRegionAndName(String search);
}

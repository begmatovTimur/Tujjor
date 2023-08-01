package com.example.backend.Controller;

import com.example.backend.Entity.User;
import com.example.backend.Services.DashboardDataService.DashboardDataService;
import com.example.backend.Services.UsersService.CurrentUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/dashboard-data")
public class DashboardDataController {
    private final DashboardDataService dashboardDataService;

    public DashboardDataController(DashboardDataService dashboardDataService) {
        this.dashboardDataService = dashboardDataService;
    }

    @PreAuthorize("hasRole('ROLE_SUPER_VISOR')")
    @GetMapping
    public HttpEntity<?> getDashboardData(@CurrentUser User user) {
        return ResponseEntity.ok(dashboardDataService.getDashboardData(user));
    }
}

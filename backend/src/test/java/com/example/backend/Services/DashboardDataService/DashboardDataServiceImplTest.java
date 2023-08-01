package com.example.backend.Services.DashboardDataService;

import com.example.backend.DTO.DashboardDataDTO;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UsersRepository;
import com.example.backend.Services.UsersService.UsersService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class DashboardDataServiceImplTest {
    @Mock
    private UsersRepository usersRepository;
    @Mock
    private UsersService usersService;
    private DashboardDataServiceImpl dashboardDataService = null;

    @BeforeEach
    void beforeEach() {
        MockitoAnnotations.openMocks(this);
        dashboardDataService = new DashboardDataServiceImpl(usersRepository, usersService);
    }

    @Test
    void itShouldGetDashboardData() {
        String mockPhone = "+998973002027";
       User mockUser = new User();
       mockUser.setPhone(mockPhone);
       LocalDate localDate = LocalDate.of(2023, 8, 1);
        DashboardDataDTO dashboardDataDTO = dashboardDataService.getDashboardData(mockUser);
        assertEquals("AUGUST, 1.", dashboardDataDTO.getCurrentDate());
        assertEquals("+998973002027", dashboardDataDTO.getCurrentSuperVisorPhoneNumber());
    }
}
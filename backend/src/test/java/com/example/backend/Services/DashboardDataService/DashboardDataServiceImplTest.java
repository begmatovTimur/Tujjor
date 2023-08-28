package com.example.backend.Services.DashboardDataService;

import com.example.backend.DTO.DashboardDataDTO;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UsersRepository;
import com.example.backend.Services.UsersService.UsersService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.time.Month;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

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
        DashboardDataDTO dashboardDataDTO = dashboardDataService.getDashboardData(mockUser);

        LocalDate now = LocalDate.now();
        Month month = now.getMonth();

        String currentDate = month+", "+now.getDayOfMonth()+".";


        assertEquals(currentDate, dashboardDataDTO.getCurrentDate());
        assertEquals("+998973002027", dashboardDataDTO.getCurrentSuperVisorPhoneNumber());
    }
}
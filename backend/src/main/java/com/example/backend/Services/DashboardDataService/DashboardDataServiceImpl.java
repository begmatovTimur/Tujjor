package com.example.backend.Services.DashboardDataService;

import com.example.backend.DTO.DashboardDataDTO;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UsersRepository;
import com.example.backend.Services.UsersService.UsersService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DashboardDataServiceImpl implements DashboardDataService {
    private final UsersRepository userRepository;
    private final UsersService usersService;

    public DashboardDataServiceImpl(UsersRepository userRepository, UsersService usersService) {
        this.userRepository = userRepository;
        this.usersService = usersService;
    }

    @Override
    public DashboardDataDTO getDashboardData(User user) {
        return generateDashboardData(user);
    }

    private static DashboardDataDTO generateDashboardData(User user) {
        LocalDate currentDate = LocalDate.now();
        String currentDateData = currentDate.getMonth().name() + ", " + currentDate.getDayOfMonth()  + ".";
        return DashboardDataDTO
                .builder()
                .currentDate(currentDateData)
                .currentSuperVisorPhoneNumber(user.getPhone())
                .build();
    }
}

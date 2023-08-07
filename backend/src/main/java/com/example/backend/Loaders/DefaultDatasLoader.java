package com.example.backend.Loaders;

import com.example.backend.Entity.Company;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.Settings;
import com.example.backend.Entity.User;
import com.example.backend.Enums.RoleEnum;
import com.example.backend.Repository.CompanyRepository;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.SettingsRepository;
import com.example.backend.Repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DefaultDatasLoader implements CommandLineRunner {
    private final CompanyRepository companyRepository;
    private final UsersRepository usersRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final SettingsRepository settingsRepository;




    @Override
    public void run(String... args) {
//        String roleSuperViser = "ROLE_SUPER_VISER";
        String superVisorName = "+998973002027";
        String companyName = "tujjor";
        if (
                roleRepository.findByRoleName(RoleEnum.ROLE_SUPER_VISOR.name()) == null
                && usersRepository.findByPhone(superVisorName).isEmpty()
                && companyRepository.findByCompanyName(companyName)==null
        ){
            System.out.println(usersRepository.findByPhone(superVisorName).isEmpty());;
            Role savedRole = roleRepository.save(
                    Role.builder()
                            .roleName(RoleEnum.ROLE_SUPER_VISOR.name())
                            .build()
            );
            List<Role> roles = new ArrayList<>();
            roles.add(savedRole);
            User superVisor = usersRepository.save(
                  new User(
                         null,
                          "Timur",
                          superVisorName,
                          passwordEncoder.encode("root123"),
                          roles
                  )
            );
            companyRepository.save(
                    Company.builder()
                            .companyName("Tujjor")
                            .region("Buxara")
                            .superVisor(superVisor)
                            .supportPhone("+998912075995")
                            .email("email@gmail.com")
                            .address("ShiftAcademy")
                            .build()
            );


        }


        if(settingsRepository.findAll().size()==0) {
            List<Settings> settings = new ArrayList<>();
            settings.add(new Settings(null,"Company Profile","/company-profile"));
            settings.add(new Settings(null,"Customer Category","/customer-category"));
            settings.add(new Settings(null,"Territory","/territory"));
            settings.add(new Settings(null,"Payment Method","/payment"));
            settings.add(new Settings(null,"Units Of measurement","/units-of-measurement"));
            settings.add(new Settings(null,"Client Type","/client-type"));
            settings.add(new Settings(null,"Product Category","/product-category"));
            settings.add(new Settings(null,"Product","/product"));
            settings.add(new Settings(null,"Price","/price"));
            settings.add(new Settings(null,"Price Type","/price-type"));
            settingsRepository.saveAll(settings);
        }
    }

}

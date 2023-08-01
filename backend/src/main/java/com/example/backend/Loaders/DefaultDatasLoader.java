package com.example.backend.Loaders;

import com.example.backend.Entity.Address;
import com.example.backend.Entity.Company;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.Settings;
import com.example.backend.Entity.User;
import com.example.backend.Enums.RoleEnum;
import com.example.backend.Repository.AddressRepository;
import com.example.backend.Repository.CompanyRepository;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.SettingsRepository;
import com.example.backend.Repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DefaultDatasLoader implements CommandLineRunner {
    private final CompanyRepository companyRepository;
    private final UsersRepository usersRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AddressRepository addressRepository;
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
                          "1",
                          passwordEncoder.encode("1"),
                          roles
                  )
            );
            Address address = Address.builder()
                    .longitude(41.3775)
                    .latitude(64.5853)
                    .city("Bukhara")
                    .district("Bukhara")
                    .street("ShiftAcademy")
                    .build();
            addressRepository.save(address);
            Address savedAddress = addressRepository.findById(address.getId()).orElseThrow();
            companyRepository.save(
                    Company.builder()
                            .companyName("Tujjor")
                            .region(address.getCity())
                            .superVisor(superVisor)
                            .supportPhone("+998912075995")
                            .email("email@gmail.com")
                            .address(savedAddress)
                            .build()
            );


        }


        if(settingsRepository.findAll().size()==0) { // settings adding..

            List<Settings> settings = new ArrayList<>();

            settings.add(new Settings(null,"Company Profile","/company-profile"));
            settings.add(new Settings(null,"Customer Category","/customer-category"));
            settings.add(new Settings(null,"Territory","/territory"));


            settingsRepository.saveAll(settings);
        }
    }

}

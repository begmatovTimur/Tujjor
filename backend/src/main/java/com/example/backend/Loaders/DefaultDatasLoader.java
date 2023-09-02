package com.example.backend.Loaders;

import com.example.backend.Entity.*;
import com.example.backend.Enums.RoleEnum;
import com.example.backend.Repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DefaultDatasLoader implements CommandLineRunner {
    private final CompanyRepository companyRepository;
    private final UsersRepository usersRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final TerritoryRepository territoryRepository;
    private final CustomerCategoryRepository customerCategoryRepository;
    private final ClientRepository clientRepository;
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


        if(territoryRepository.findAll().size()==0) {
            List<Territory> territories = new ArrayList<>();

            territories.add(new Territory(null,"Bukhara","Buxoro","MA0DP",true,64.39096772460934,39.737524678460645, LocalDateTime.now()));
            territories.add(new Territory(null,"Tashkent","Toshkent","DLA01",false,69.29798027332778,41.29861152419623,LocalDateTime.now()));
            territories.add(new Territory(null,"Farg'ona","Farg'ona","SODK05",true,71.74943286619715,40.350720394603776,LocalDateTime.now()));
            territories.add(new Territory(null,"Qo'qon","Qo'qon","AD01A",true,70.94743091307214,40.52700099193099,LocalDateTime.now()));
            territories.add(new Territory(null,"Namangan","Namangan","MLDM8",true,71.66154224119714,40.99480317106396,LocalDateTime.now()));

            territoryRepository.saveAll(territories);
        }

        if(customerCategoryRepository.findAll().size()==0) {
            List<CustomerCategory> categories = new ArrayList<>();

            categories.add(new CustomerCategory(null,"Bukhara","39184","Market","Super Market",true));
            categories.add(new CustomerCategory(null,"Tashkent","28391","Tech Market","Tech Market",true));
            categories.add(new CustomerCategory(null,"Farg'ona","92819","Restarant","Restaurant",true));
            categories.add(new CustomerCategory(null,"Qo'qon","74810","Kanstavari","Kanstavari",false));
            categories.add(new CustomerCategory(null,"Namangan","8193","ITPark","ITPark",true));


            customerCategoryRepository.saveAll(categories);
        }

        }


}

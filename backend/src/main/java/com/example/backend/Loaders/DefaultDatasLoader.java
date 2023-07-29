package com.example.backend.Loaders;

import com.example.backend.Entity.Company;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Repository.CompanyRepository;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DefaultDatasLoader implements CommandLineRunner {
    private final CompanyRepository companyRepository;
    private final UsersRepository usersRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DefaultDatasLoader(CompanyRepository companyRepository, UsersRepository usersRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.companyRepository = companyRepository;
        this.usersRepository = usersRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public void run(String... args) {
        String roleSuperViser = "ROLE_SUPER_VISER";
        String superViserName = "Timur";
        String tujjor = "tujjor";
        if (
                roleRepository.findByRoleName(roleSuperViser) == null
                && usersRepository.findByUsername(superViserName).isEmpty()
                && companyRepository.findByCompanyName(tujjor)==null
        ){
            Role savedRole = roleRepository.save(
                    Role.builder()
                            .roleName(roleSuperViser)
                            .build()
            );
            List<Role> roles = new ArrayList<>();
            roles.add(savedRole);
            System.out.println(roles);
            User superViser = usersRepository.save(
                  new User(
                         null,
                          "Timur",
                          "+998973002027",
                          passwordEncoder.encode("root123"),
                          roles
                  )
            );
            companyRepository.save(
                    Company.builder()
                            .region("Bukhara")
                            .companyName("Tujjor")
                            .superViser(superViser)
                            .supportPhone("+998912075995")
                            .email("email@gmail.com")
                            .address("Bukhara City, Shift Academy")
                            .build()
            );
        }
    }

}

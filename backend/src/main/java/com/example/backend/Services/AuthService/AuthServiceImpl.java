package com.example.backend.Services.AuthService;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Enums.RoleEnum;
import com.example.backend.Payload.Reaquest.LoginReq;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UsersRepository;
import com.example.backend.Services.JwtService.JwtServiceImpl;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UsersRepository userRepository;
    private final RoleRepository roleRepo;
    private final JwtServiceImpl jwtService;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final AuthenticationManager authenticationManager;

    @SneakyThrows
    @Override
    public HttpEntity<?> register(UserDTO userData) {
        UUID roleId = UUID.randomUUID();
        List<Role> roles = new ArrayList<>();
        Role roleUser = roleRepo.findByRoleName(RoleEnum.ROLE_USER.name());

        checkIfExistRole(roleId, roles, roleUser);
        UUID userId = UUID.randomUUID();
        User user = new User(
                userId,
                userData.getUsername(),
                userData.getPhone(),
                passwordEncoder.encode(userData.getPassword()),
                roles
        );
        userRepository.save(user);
        String token = authenticate(userData);
        return ResponseEntity.ok(token);
    }

    private void checkIfExistRole(UUID roleId, List<Role> roles, Role roleUser) {
        if (roleUser == null) {
            roles.add(roleRepo.save(new Role(
                    roleId,
                    RoleEnum.ROLE_SUPER_VISOR.name(),
                    null,
                    null
            )));
        } else {
            roles.add(roleUser);
        }
    }

    private String authenticate(UserDTO userData) throws Exception {
        UserDetails userDetails = userDetailsService.loadUserByUsername(userData.getPhone());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                userData.getPassword(),
                userDetails.getAuthorities()
        );

        authenticationConfiguration.getAuthenticationManager().authenticate(authenticationToken);
        String token = Jwts
                .builder()
                .setIssuer(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 24))
                .signWith(jwtService.getSigningKey())
                .compact();
        return token;
    }

    @Override
    public HttpEntity<?> login(LoginReq dto) {
        String phone = dto.getPhone();
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(phone, dto.getPassword()));
        return generateTokenForUser(dto, phone);

    }

    private ResponseEntity<Map<String, Object>> generateTokenForUser(LoginReq dto, String phone) {
        User users = userRepository.findByPhone(phone).orElseThrow(() -> new NoSuchElementException("User not found for phone number: " + phone));
        List<Role> roles = roleRepo.findAll();
        String access_token = jwtService.generateJWTToken(users);
        Map<String, Object> map = new HashMap<>();
        map.put("access_token", access_token);
        map.put("refresh_token", "");
        if (dto.getRememberMe()) {
            String refresh_token = jwtService.generateJWTRefreshToken(users);
            map.put("refresh_token", refresh_token);
        }
        map.put("roles", roles);
        return ResponseEntity.ok(map);
    }


    @Override
    public HttpEntity<?> refreshToken(String refreshToken) {
        String id = jwtService.extractUserFromJwt(refreshToken);
        User user = userRepository.findById(UUID.fromString(id)).orElseThrow();
        String access_token = jwtService.generateJWTToken(user);
        return ResponseEntity.ok(access_token);
    }
}

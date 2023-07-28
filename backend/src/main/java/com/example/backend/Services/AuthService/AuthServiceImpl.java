package com.example.backend.Services.AuthService;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.Users;
import com.example.backend.Payload.LoginReq;
import com.example.backend.Repository.RoleRepository;
import com.example.backend.Repository.UsersRepository;
import com.example.backend.Services.JwtService.JwtServiceImpl;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
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

    private final UsersRepository usersRepository;
    private final RoleRepository roleRepo;
    private final JwtServiceImpl jwtService;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationConfiguration authenticationConfiguration;
    private final AuthenticationManager authenticationManager;

    @SneakyThrows
    @Override
    public HttpEntity<?> register(LoginReq dto) {
        List<Role> roles = new ArrayList<>();
        Role roleUser = roleRepo.findByRoleName("ROLE_USER");
        if (roleUser == null) {
            roles.add(roleRepo.save(new Role(
                    null,
                    "ROLE_USER",
                    null,
                    null
            )));
        } else {
            roles.add(roleUser);
        }
        Users user = new Users(
                null,
                dto.getUsername(),
                passwordEncoder.encode(dto.getPassword()),
                roles,
                null,
                null
        );
        usersRepository.save(user);
        UserDetails userDetails = userDetailsService.loadUserByUsername(dto.getUsername());
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails,
                dto.getPassword(),
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
        return ResponseEntity.ok(token);
    }

    @Override
    public HttpEntity<?> login(UserDTO dto) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.ok("BAD_CREDENTIALS");
        }
        Users users = usersRepository.findByUsername(dto.getUsername()).orElseThrow(() -> new RuntimeException("Cannot find User With Id:" + dto.getUsername()));
        List<Role> roles = roleRepo.findAll();
        String access_token = jwtService.generateJWTToken(users);
        String refresh_token = jwtService.generateJWTRefreshoken(users);
        Map<String, Object> map = new HashMap<>();
        map.put("access_token", access_token);
        map.put("refresh_token", refresh_token);
        map.put("roles", roles);
        return ResponseEntity.ok(map);
    }

    @Override
    public HttpEntity<?> refreshToken(String refreshToken) {
        String id = jwtService.extractUserFromJwt(refreshToken);
        Users users = usersRepository.findById(UUID.fromString(id)).orElseThrow();
        String access_token = jwtService.generateJWTToken(users);
        return ResponseEntity.ok(access_token);
    }

    @Override
    public HttpEntity<?> decode(String token) {
        boolean isExpired = jwtService.validateToken(token);
        Users user = null;
        if (isExpired) {
            String userId = jwtService.extractUserFromJwt(token);
            user = usersRepository.findById(UUID.fromString(userId)).orElseThrow(() -> new RuntimeException("Cannot find User With Id:" + userId));
        }
        return ResponseEntity.ok(user);
    }
}

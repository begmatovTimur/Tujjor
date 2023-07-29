package com.example.backend.Config;

import com.example.backend.Entity.User;
import com.example.backend.Repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class    SecurityConfig  {

    private final UsersRepository usersRepository;
    private final MyFilter myFilter;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults())
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeRequests()
                .requestMatchers("/api/rooms", "/api/courses", "/api/auth/register", "/api/courses", "/api/auth/refresh", "/api/auth/login", "/api/users", "/api/auth/decode","/api/bot").permitAll()
                .requestMatchers("/api/**").authenticated() // Paths starting from /api require authentication
                .anyRequest().permitAll() // Permit all other paths (before /api)
                .and()
                .addFilterBefore(myFilter, UsernamePasswordAuthenticationFilter.class);
        // Add more security configurations as needed
        return http.build();
    }


    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            User users = usersRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username + "bu user topilmadi"));
            return users;
        };
    }

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

}

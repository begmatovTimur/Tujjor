package com.example.backend.Config;

import com.example.backend.Repository.UsersRepository;
import com.example.backend.Services.JwtService.JwtService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.UUID;

@Component
@CrossOrigin
@Configuration
@RequiredArgsConstructor
public class MyFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UsersRepository userRepo;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        String token = request.getHeader("token");
        String requestPath = request.getRequestURI();
//        if (requestPath.equals("/api/auth/login") ||  requestPath.equals("/api/auth/access") ||  requestPath.equals("/api/auth/refresh") || requestPath.equals("/api/bot")) {
//            try {
//                filterChain.doFilter(request, response);
//            }catch (Exception e){
//                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
//                response.getWriter().write("Invalid token");
//                response.getWriter().flush();
//                return;
//            }
//            return;
//        }
//
//        if (token != null) {
//            try {
//                String subject = jwtService.extractUserFromJwt(token);
//                UserDetails userDetails = userRepo.findById(UUID.fromString(subject)).orElseThrow();
////                System.out.println(userDetails.getUsername());
//                UsernamePasswordAuthenticationToken authenticationToken =
//                        new UsernamePasswordAuthenticationToken(
//                                userDetails,
//                                null,
//                                userDetails.getAuthorities()
//                        );
//                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//            } catch (ExpiredJwtException e) {
//                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
//                response.getWriter().write("Token expired");
//                response.getWriter().flush();
//                return;
//            } catch (Exception e) {
//                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
//                response.getWriter().write("Invalid token");
//                response.getWriter().flush();
//                return;
//            }
//        } else {
//            // No Authorization header found, throw 401 Unauthorized error
//            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
//            response.getWriter().write("Authorization header missing");
//            response.getWriter().flush();
//            return;
//        }
        filterChain.doFilter(request, response);
    }
}
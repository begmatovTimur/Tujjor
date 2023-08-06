package com.example.backend.Services.JwtService;

import com.example.backend.Entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class JwtServiceImpl implements JwtService {
    @Override
    public String generateJWTToken(User user) {
        UUID id = user.getId();
        Map<String, Object> claims = new HashMap<>();
        claims.put("phone",user.getPhone());
        Date hourFromCurrentTime = new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24);
        String jwt = Jwts.builder()
                .addClaims(claims)
                .setExpiration(hourFromCurrentTime)
                .setIssuedAt(new Date())
                .setSubject(id.toString())
                .signWith(getSigningKey())
                .compact();
        return jwt;
    }

    @Override
    public String generateJWTRefreshToken(User users) {
        UUID id = users.getId();
        String jwt = Jwts.builder().
                setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 7))
                .setIssuedAt(new Date())
                .setSubject(id.toString())
                .signWith(getSigningKey())
                .compact();
        return jwt;
    }
    @Override
    public Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode("b83b00a5bdd67427f225c4fd6b3b65cbc0f1121cd504b3028a3378651e2ff27f");
        return Keys.hmacShaKeyFor(keyBytes);
    }

    @Override
    public String extractUserFromJwt(String token) {
        Claims body = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return body.getSubject();
    }

    @Override
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
            return true;
        } catch (Exception e) {
            System.err.println("Expired JWT Token token-> " + token);
            return false;
        }
    }
}

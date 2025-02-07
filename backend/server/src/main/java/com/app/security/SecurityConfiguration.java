package com.app.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.app.security.CustomJWTAuthenticationFilter;
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private CustomJWTAuthenticationFilter customJWTAuthenticationFilter;

    @Bean
    public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(request -> request
                .requestMatchers("/users/register", "/users/login", "/v*/api-doc*/**", "/swagger-ui/**")
                    .permitAll()
                .requestMatchers(HttpMethod.OPTIONS).permitAll()
                .requestMatchers("/api/users/AllUsers").permitAll() // Allow access to this endpoint
                // Wallet endpoints: Adjust permission as needed.
                .requestMatchers("/api/users/AllUsers/count").permitAll()
                .requestMatchers("/wallet/withdraw-funds","/wallet/add-funds","/wallet/balance", "/transactions", "/loans/summary", "/loans/details","/loan-applications/apply").hasRole("USER")
                
                .requestMatchers("/products/add", "/products/delete").hasRole("ADMIN")
                .anyRequest().authenticated())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(customJWTAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}

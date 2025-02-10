package com.app.security;

import java.util.List;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomJWTAuthenticationFilter customJWTAuthenticationFilter;

    @Bean
    public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception {
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable())  // Disable CSRF protection (since we're using stateless JWT)
                .authorizeHttpRequests(request -> request
                                // Allow unrestricted access to public endpoints (e.g., login, registration, API docs)
                                .requestMatchers("/users/register", "/users/login", "/v*/api-doc*/**", "/swagger-ui/**").permitAll()
                                // Allow preflight OPTIONS requests
                                .requestMatchers(HttpMethod.OPTIONS).permitAll()
                                // Other public routes
                                .requestMatchers("/api/users/AllUsers", "/api/users/AllUsers/count").permitAll()
                                .requestMatchers("/users/change-password", "/kyc/user/**", "/kyc/update/**").permitAll()
                                
                                // Restricted routes for users (must have ROLE_USER)
                                .requestMatchers("/users/wallet/withdraw-funds", "/transactions", "/users/wallet/add-funds", "/loans/summary", "/loans/details")
                                .hasAuthority("ROLE_USER")  
                                .requestMatchers("/wallet/withdraw-funds", "/wallet/add-funds", "/wallet/balance", "/transactions", "/loans/summary", "/loans/details", "/loan-applications/apply")
                                .hasAuthority("ROLE_USER")  

                                // Restricted routes for admins (must have ROLE_ADMIN)
                                .requestMatchers("/loans/**").hasAuthority("ROLE_ADMIN")  

                                // All other routes must be authenticated
                                .anyRequest().authenticated()
                )
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)); // Stateless session management

        // Add JWT Authentication Filter before UsernamePasswordAuthenticationFilter
        http.addFilterBefore(customJWTAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    // CORS configuration to allow frontend (React app) to make requests
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:3000")); // Allow frontend origin (React app)
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allowed HTTP methods
        configuration.setAllowedHeaders(List.of("*")); // Allow all headers
        configuration.setAllowCredentials(true); // Allow credentials (cookies, authentication headers)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply CORS settings globally to all endpoints
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}

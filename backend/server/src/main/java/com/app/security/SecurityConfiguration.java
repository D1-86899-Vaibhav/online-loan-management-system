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
		http.csrf(csrf -> csrf.disable()).authorizeHttpRequests(request -> request
				.requestMatchers("/users/register", "/users/login", "/v*/api-doc*/**", "/swagger-ui/**").permitAll()
				.requestMatchers(HttpMethod.OPTIONS).permitAll().requestMatchers("/api/users/AllUsers", "/wallet/balance").permitAll() // Allow
																													// access
																													// to
																													// this
																													// endpoint
				// Wallet endpoints: Adjust permission as needed.
				.requestMatchers("/api/users/AllUsers/count").permitAll().requestMatchers("/users/change-password")
				.permitAll().requestMatchers("/kyc/user/**").permitAll().requestMatchers("/kyc/update/**").permitAll()
				.requestMatchers("/users/wallet/withdraw-funds", "/transactions", "/users/wallet/add-funds",
						"/loans/summary", "/loans/details", "/loan-applications/apply")
				.hasRole("USER")

				.requestMatchers("/loans/**").hasRole("ADMIN").anyRequest().authenticated())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		http.addFilterBefore(customJWTAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("http://localhost:3000")); // Allow frontend origin
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allowed HTTP methods
		configuration.setAllowedHeaders(List.of("*")); // Allow all headers
		configuration.setAllowCredentials(true); // Allow credentials (cookies, authentication headers)

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration); // Apply CORS settings to all endpoints
		return source;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}

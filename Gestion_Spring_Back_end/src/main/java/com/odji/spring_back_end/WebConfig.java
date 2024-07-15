//package com.odji.spring_back_end;
//
//import org.apache.catalina.filters.CorsFilter;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import org.springframework.web.servlet.config.annotation.EnableWebMvc;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//import java.util.List;
//import java.util.logging.Filter;
//
//@Configuration
//@EnableWebMvc
//public class WebConfig implements WebMvcConfigurer {
//
//    @Bean
//    public Filter corsFilter() {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOrigins(List.of("http://localhost:4200")); // Use List.of for a more modern approach
//        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
//        config.setAllowedHeaders(List.of("Content-Type", "Authorization"));
//        config.setAllowedOriginPatterns(List.of("*")); // Consider replacing with specific allowed origins for security
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//
//        //return (Filter) new CorsFilter();
//
//         return (Filter) new CorsFilter(); // Return the actual CorsFilter object
//
//
//    }
//}
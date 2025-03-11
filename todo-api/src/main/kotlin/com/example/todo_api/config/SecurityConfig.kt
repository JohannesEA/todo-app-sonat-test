
package com.example.todo_api.config;


import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebServerConfiguration {
    @Bean
    fun addCorsConfig(): WebMvcConfigurer {
        return object : WebMvcConfigurer {
            override fun addCorsMappings(registry: CorsRegistry) {
                registry.addMapping("/**")
                    .allowedMethods("*")
                    .allowedOrigins("*")  // Allows all origins
                    .allowedHeaders("*")  // Optional: allows all headers
                    .allowCredentials(false)  // Must be false when using "*"
            }
        }
    }
}
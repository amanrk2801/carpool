package com.carpool.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CarpoolBackendApplication {

	public static void main(String[] args) {

		SpringApplication.run(CarpoolBackendApplication.class, args);
	}

}

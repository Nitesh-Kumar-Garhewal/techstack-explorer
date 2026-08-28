package com.nitesh.techstack.controller;

import org.neo4j.driver.Driver;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class HealthController {

    private final Driver driver;

    public HealthController(Driver driver) {
        this.driver = driver;
    }

    @GetMapping("/api/health")
    public Map<String, String> health() {

        try {
            driver.verifyConnectivity();

            return Map.of(
                    "status", "UP",
                    "database", "CognoDB",
                    "message", "Database connection successful");

        } catch (Exception exception) {

            return Map.of(
                    "status", "DOWN",
                    "database", "CognoDB",
                    "message", "Database connection unavailable");
        }
    }
}
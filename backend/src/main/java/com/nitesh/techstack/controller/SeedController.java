package com.nitesh.techstack.controller;

import com.nitesh.techstack.seed.GraphSeedService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class SeedController {

    private final GraphSeedService graphSeedService;

    public SeedController(GraphSeedService graphSeedService) {
        this.graphSeedService = graphSeedService;
    }

    @PostMapping("/seed")
    public ResponseEntity<Map<String, String>> seedDatabase() {

        try {

            graphSeedService.seedDatabase();

            return ResponseEntity.ok(
                    Map.of(
                            "status", "SUCCESS",
                            "message", "Graph data seeded successfully"));

        } catch (Exception exception) {

            return ResponseEntity.internalServerError()
                    .body(
                            Map.of(
                                    "status", "FAILED",
                                    "message", "Unable to seed graph database"));
        }
    }
}
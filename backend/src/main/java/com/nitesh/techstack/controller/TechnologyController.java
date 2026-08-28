package com.nitesh.techstack.controller;

import com.nitesh.techstack.dto.*;
import com.nitesh.techstack.service.TechnologyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class TechnologyController {

    private final TechnologyService service;

    public TechnologyController(TechnologyService service) {
        this.service = service;
    }

    @GetMapping("/technologies")
    public ResponseEntity<List<TechnologyResponse>> getTechnologies() {

        return ResponseEntity.ok(
                service.getAllTechnologies());
    }

    @GetMapping("/technologies/{technology}")
    public ResponseEntity<?> getTechnology(
            @PathVariable String technology) {

        TechnologyResponse response = service.getTechnology(technology);

        if (response == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(response);
    }

    @GetMapping("/technologies/{technology}/skills")
    public ResponseEntity<List<SkillResponse>> getSkills(
            @PathVariable String technology) {

        return ResponseEntity.ok(
                service.getSkills(technology));
    }

    @GetMapping("/technologies/{technology}/projects")
    public ResponseEntity<List<ProjectResponse>> getProjects(
            @PathVariable String technology) {

        return ResponseEntity.ok(
                service.getProjects(technology));
    }

    @GetMapping("/technologies/{technology}/related")
    public ResponseEntity<List<RelatedTechnologyResponse>> getRelatedTechnologies(
            @PathVariable String technology) {

        return ResponseEntity.ok(
                service.getRelatedTechnologies(technology));
    }

    @GetMapping("/technologies/{technology}/recommendations")
    public ResponseEntity<List<RecommendationResponse>> getRecommendations(
            @PathVariable String technology) {

        return ResponseEntity.ok(
                service.getRecommendations(technology));
    }

    @GetMapping("/technologies/{technology}/connections")
    public ResponseEntity<List<MultiHopResponse>> getConnections(
            @PathVariable String technology) {

        return ResponseEntity.ok(
                service.getMultiHopConnections(technology));
    }

    @GetMapping("/technologies/{technology}/graph")
    public ResponseEntity<List<GraphResponse>> getGraph(
            @PathVariable String technology) {

        return ResponseEntity.ok(
                service.getGraph(technology));
    }

    @GetMapping("/categories")
    public ResponseEntity<List<String>> getCategories() {

        return ResponseEntity.ok(
                service.getCategories());
    }

    @GetMapping("/categories/{category}/technologies")
    public ResponseEntity<List<TechnologyResponse>> getTechnologiesByCategory(
            @PathVariable String category) {

        return ResponseEntity.ok(
                service.getTechnologiesByCategory(category));
    }
}
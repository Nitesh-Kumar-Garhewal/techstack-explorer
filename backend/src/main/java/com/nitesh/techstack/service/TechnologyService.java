package com.nitesh.techstack.service;

import com.nitesh.techstack.dto.*;
import com.nitesh.techstack.repository.TechnologyRepository;
import org.neo4j.driver.Record;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechnologyService {

    private final TechnologyRepository repository;

    public TechnologyService(TechnologyRepository repository) {
        this.repository = repository;
    }

    public List<TechnologyResponse> getAllTechnologies() {

        return repository.findAllTechnologies()
                .stream()
                .map(this::toTechnologyResponse)
                .toList();
    }

    public TechnologyResponse getTechnology(String technology) {

        return repository.findTechnology(technology)
                .stream()
                .findFirst()
                .map(this::toTechnologyResponse)
                .orElse(null);
    }

    public List<SkillResponse> getSkills(String technology) {

        return repository.findSkills(technology)
                .stream()
                .map(record -> new SkillResponse(
                        record.get("skill").asString(),
                        record.get("level").asString()))
                .toList();
    }

    public List<ProjectResponse> getProjects(String technology) {

        return repository.findProjects(technology)
                .stream()
                .map(record -> new ProjectResponse(
                        record.get("project").asString(),
                        record.get("description").asString()))
                .toList();
    }

    public List<RelatedTechnologyResponse> getRelatedTechnologies(
            String technology) {

        return repository.findRelatedTechnologies(technology)
                .stream()
                .map(record -> new RelatedTechnologyResponse(
                        record.get("technology").asString(),
                        record.get("type").asString(),
                        record.get("description").asString()))
                .toList();
    }

    public List<RecommendationResponse> getRecommendations(
            String technology) {

        return repository.findRecommendations(technology)
                .stream()
                .map(record -> new RecommendationResponse(
                        record.get("technology").asString(),
                        record.get("type").asString(),
                        record.get("sharedProjects").asLong()))
                .toList();
    }

    public List<MultiHopResponse> getMultiHopConnections(
            String technology) {

        return repository.findMultiHopConnections(technology)
                .stream()
                .map(record -> new MultiHopResponse(
                        record.get("relatedTechnology").asString(),
                        record.get("project").asString()))
                .toList();
    }

    public List<TechnologyResponse> getTechnologiesByCategory(
            String category) {

        return repository.findTechnologiesByCategory(category)
                .stream()
                .map(record -> new TechnologyResponse(
                        record.get("technology").asString(),
                        record.get("type").asString(),
                        record.get("description").asString(),
                        null))
                .toList();
    }

    public List<String> getCategories() {

        return repository.findAllCategories()
                .stream()
                .map(record -> record.get("category").asString())
                .toList();
    }

    private TechnologyResponse toTechnologyResponse(
            Record record) {

        return new TechnologyResponse(
                record.get("technology").asString(),
                record.get("type").asString(),
                record.get("description").asString(),
                record.get("website").asString());
    }

    public List<GraphResponse> getGraph(String technology) {

        return repository.findGraph(technology)
                .stream()
                .map(record -> new GraphResponse(
                        record.get("sourceName").asString(),
                        record.get("sourceType").asString(),
                        record.get("sourceLabel").asString(),
                        record.get("targetName").asString(),
                        record.get("targetType").asString(),
                        record.get("targetLabel").asString(),
                        record.get("relationshipType").asString()
                ))
                .toList();
    }
}
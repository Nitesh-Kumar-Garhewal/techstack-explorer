package com.nitesh.techstack.dto;

public record RecommendationResponse(
        String technology,
        String type,
        long sharedProjects) {
}
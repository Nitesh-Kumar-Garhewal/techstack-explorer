package com.nitesh.techstack.dto;

public record GraphResponse(
        String sourceName,
        String sourceType,
        String sourceLabel,
        String targetName,
        String targetType,
        String targetLabel,
        String relationshipType
) {
}
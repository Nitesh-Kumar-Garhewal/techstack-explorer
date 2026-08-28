package com.nitesh.techstack.dto;

public record GraphRelationshipResponse(
        String source,
        String target,
        String type
) {
}
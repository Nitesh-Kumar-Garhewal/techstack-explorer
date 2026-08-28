package com.nitesh.techstack.repository;

import java.util.List;
import java.util.Map;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Record;
import org.neo4j.driver.Session;
import org.springframework.stereotype.Repository;

@Repository
public class TechnologyRepository {

    private final Driver driver;

    public TechnologyRepository(Driver driver) {
        this.driver = driver;
    }

    public List<Record> findAllTechnologies() {

        String cypher = """
                MATCH (t:Technology)
                RETURN t.name AS technology,
                       t.type AS type,
                       t.description AS description,
                       t.website AS website
                ORDER BY t.name
                """;

        try (Session session = driver.session()) {
            return session.executeRead(tx -> tx.run(cypher).list());
        }
    }

    public List<Record> findTechnology(String technology) {

        String cypher = """
                MATCH (t:Technology {name: $technology})
                RETURN t.name AS technology,
                       t.type AS type,
                       t.description AS description,
                       t.website AS website
                """;

        try (Session session = driver.session()) {
            return session.executeRead(tx -> tx.run(
                    cypher,
                    Map.of("technology", technology)).list());
        }
    }

    public List<Record> findSkills(String technology) {

        String cypher = """
                MATCH (t:Technology {name: $technology})
                      -[:REQUIRES]->
                      (s:Skill)
                RETURN s.name AS skill,
                       s.level AS level
                ORDER BY s.name
                """;

        try (Session session = driver.session()) {
            return session.executeRead(tx -> tx.run(
                    cypher,
                    Map.of("technology", technology)).list());
        }
    }

    public List<Record> findProjects(String technology) {

        String cypher = """
                MATCH (t:Technology {name: $technology})
                      -[:USED_IN]->
                      (p:Project)
                RETURN p.name AS project,
                       p.description AS description
                ORDER BY p.name
                """;

        try (Session session = driver.session()) {
            return session.executeRead(tx -> tx.run(
                    cypher,
                    Map.of("technology", technology)).list());
        }
    }

    public List<Record> findRelatedTechnologies(String technology) {

        String cypher = """
                MATCH (t:Technology {name: $technology})
                      -[:USED_WITH|RELATED_TO]->
                      (related:Technology)
                RETURN related.name AS technology,
                       related.type AS type,
                       related.description AS description
                ORDER BY related.name
                """;

        try (Session session = driver.session()) {
            return session.executeRead(tx -> tx.run(
                    cypher,
                    Map.of("technology", technology)).list());
        }
    }

    public List<Record> findRecommendations(String technology) {

        String cypher = """
                MATCH (selected:Technology {name: $technology})
                      -[:USED_IN]->
                      (project:Project)
                      <-[:USED_IN]-
                      (recommendation:Technology)
                WHERE recommendation.name <> selected.name
                RETURN recommendation.name AS technology,
                       recommendation.type AS type,
                       count(DISTINCT project) AS sharedProjects
                ORDER BY sharedProjects DESC,
                         technology
                """;

        try (Session session = driver.session()) {
            return session.executeRead(tx -> tx.run(
                    cypher,
                    Map.of("technology", technology)).list());
        }
    }

    public List<Record> findMultiHopConnections(String technology) {

        String cypher = """
                MATCH (start:Technology {name: $technology})
                      -[:USED_WITH|RELATED_TO]->
                      (related:Technology)
                      -[:USED_IN]->
                      (project:Project)
                RETURN DISTINCT
                       related.name AS relatedTechnology,
                       project.name AS project
                ORDER BY project.name,
                         relatedTechnology
                """;

        try (Session session = driver.session()) {
            return session.executeRead(tx -> tx.run(
                    cypher,
                    Map.of("technology", technology)).list());
        }
    }

    public List<Record> findTechnologiesByCategory(String category) {

        String cypher = """
                MATCH (c:Category {name: $category})
                      -[:CONTAINS]->
                      (t:Technology)
                RETURN t.name AS technology,
                       t.type AS type,
                       t.description AS description
                ORDER BY t.name
                """;

        try (Session session = driver.session()) {
            return session.executeRead(tx -> tx.run(
                    cypher,
                    Map.of("category", category)).list());
        }
    }

    public List<Record> findAllCategories() {

        String cypher = """
                MATCH (c:Category)
                RETURN c.name AS category,
                       c.description AS description
                ORDER BY c.name
                """;

        try (Session session = driver.session()) {
            return session.executeRead(tx -> tx.run(cypher).list());
        }
    }

    public List<Record> findGraph(String technology) {

        String cypher = """
                MATCH (start:Technology {name: $technology})
                OPTIONAL MATCH path =
                    (start)-[:USED_WITH|RELATED_TO|REQUIRES|USED_IN]->(connected)
                WITH start, connected, path
                WHERE connected IS NOT NULL
                RETURN
                    start.name AS sourceName,
                    'Technology' AS sourceType,
                    start.name AS sourceLabel,
                    connected.name AS targetName,
                    labels(connected)[0] AS targetType,
                    connected.name AS targetLabel,
                    CASE
                        WHEN connected:Technology
                        THEN [r IN relationships(path) | type(r)][0]
                        WHEN connected:Skill
                        THEN [r IN relationships(path) | type(r)][0]
                        WHEN connected:Project
                        THEN [r IN relationships(path) | type(r)][0]
                        ELSE 'CONNECTED_TO'
                    END AS relationshipType
                ORDER BY targetType, targetName
                """;

        try (Session session = driver.session()) {
            return session.executeRead(tx -> tx.run(
                    cypher,
                    Map.of("technology", technology)
            ).list());
        }
    }
}

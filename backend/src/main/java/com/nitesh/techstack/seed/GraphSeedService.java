package com.nitesh.techstack.seed;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.neo4j.driver.Transaction;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Service
public class GraphSeedService {

    private final Driver driver;

    public GraphSeedService(Driver driver) {
        this.driver = driver;
    }

    public void seedDatabase() throws IOException {

        String constraints = readCypherFile(
                "../cypher/constraints.cypher");

        String seed = readCypherFile(
                "../cypher/seed.cypher");

        try (Session session = driver.session()) {

            executeStatements(session, constraints);
            executeStatements(session, seed);
        }
    }

    private String readCypherFile(String filePath) throws IOException {

        Path path = Path.of(filePath);

        if (!Files.exists(path)) {
            throw new IOException(
                    "Cypher file not found: " + path.toAbsolutePath());
        }

        return Files.readString(path);
    }

    private void executeStatements(
            Session session,
            String cypher) {

        try (Transaction transaction = session.beginTransaction()) {

            String[] statements = cypher.split(";");

            for (String statement : statements) {

                String trimmed = statement.trim();

                if (trimmed.isEmpty()) {
                    continue;
                }

                transaction.run(trimmed).consume();
            }

            transaction.commit();
        }
    }
}
# TechStack Explorer

A graph-powered technology exploration application built with **Spring Boot, React, Neo4j-compatible Cypher, and CognoDB Cloud**.

TechStack Explorer allows users to explore software technologies and their relationships with categories, skills, projects, and other technologies through an interactive graph-based interface.

---

## Overview

Modern software development involves highly connected technologies.

For example:

```text
Java
  ↓
Spring Boot
  ↓
MySQL
  ↓
AI Job Platform
```

A technology is rarely useful in isolation. Developers typically use technologies together, require specific skills to work with them, and apply them across multiple projects.

TechStack Explorer models these connections using a graph database and provides an interactive UI for exploring them.

The application supports:

- Technology discovery
- Category-based filtering
- Technology details
- Required skills
- Projects using a technology
- Related technologies
- Graph-based recommendations
- Multi-hop relationship exploration
- Interactive graph visualization

---

# Why a Graph Database?

The central problem in this application is not simply storing information about technologies.

The interesting part is understanding the **relationships between technologies, skills, categories, and projects**.

A relational implementation could use multiple tables such as:

```text
technologies
categories
skills
projects
technology_categories
technology_skills
technology_projects
technology_relationships
```

As relationship-based queries become more complex, this requires multiple joins and increasingly complicated queries.

With a graph database, these relationships are represented directly:

```text
(Category)-[:CONTAINS]->(Technology)
(Technology)-[:USED_WITH]->(Technology)
(Technology)-[:RELATED_TO]->(Technology)
(Technology)-[:REQUIRES]->(Skill)
(Technology)-[:USED_IN]->(Project)
```

This makes connected-data queries natural.

For example, the application can answer:

> Which projects are connected to technologies related to Java?

Using a multi-hop graph traversal:

```text
Technology
    ↓ USED_WITH / RELATED_TO
Technology
    ↓ USED_IN
Project
```

The graph model also makes recommendation queries straightforward by traversing:

```text
Technology
    ↓ USED_IN
Project
    ↑ USED_IN
Technology
```

This allows the application to discover technologies that share projects with the selected technology.

---

# Features

## Technology Explorer

Browse all technologies available in the graph database.

Each technology contains:

- Name
- Technology type
- Description
- Official website

---

## Category Filtering

Technologies can be grouped into categories such as:

- Frontend
- Backend
- Database
- DevOps
- Cloud
- Programming Language

---

## Technology Details

Selecting a technology displays information about its connected data.

The application can show:

- Required skills
- Projects
- Related technologies
- Recommendations
- Graph relationships

---

## Interactive Graph

The application provides an interactive graph visualization showing the selected technology and its connected nodes.

The graph supports:

- Zoom
- Pan
- Fit-to-view
- Mini-map
- Node selection
- Technology navigation
- Relationship labels

The graph is implemented using React Flow.

---

# Graph Data Model

The application uses the following graph structure:

```text
                         ┌──────────────┐
                         │   Category   │
                         └──────┬───────┘
                                │
                           CONTAINS
                                │
                                ▼
┌──────────────┐        ┌────────────────┐        ┌──────────────┐
│    Skill     │◄───────│   Technology   │───────►│  Technology  │
└──────────────┘ REQUIRES└────────────────┘ USED_WITH / RELATED_TO
                                │
                              USED_IN
                                │
                                ▼
                         ┌──────────────┐
                         │    Project   │
                         └──────────────┘
```

## Node Types

The graph contains four primary node labels:

### Category

Represents a technology category.

Example:

```text
Frontend
Backend
Database
DevOps
Cloud
Programming Language
```

### Technology

Represents a software technology.

Examples:

```text
Java
Spring Boot
React
TypeScript
MySQL
Neo4j
Docker
AWS
Python
FastAPI
Node.js
```

### Skill

Represents a skill associated with a technology.

Examples:

```text
Object Oriented Programming
REST API Development
SQL
Web Development
Containerization
Cloud Deployment
API Design
```

### Project

Represents a realistic software project using one or more technologies.

Examples:

```text
AI Job Platform
E-Commerce Platform
Analytics Dashboard
Food Delivery API
```

---

# Relationships

The graph uses typed relationships:

| Relationship | Meaning                                     |
| ------------ | ------------------------------------------- |
| `CONTAINS`   | Category contains a technology              |
| `USED_WITH`  | Technologies commonly used together         |
| `RELATED_TO` | Technologies have a conceptual relationship |
| `REQUIRES`   | Technology requires a particular skill      |
| `USED_IN`    | Technology is used in a project             |

---

# Example Graph

A simplified example:

```text
             ┌──────────────┐
             │     Java     │
             └──────┬───────┘
                    │
                USED_WITH
                    │
                    ▼
             ┌──────────────┐
             │ Spring Boot  │
             └──────┬───────┘
                    │
              ┌─────┴──────┐
              │            │
          REQUIRES       USED_WITH
              │            │
              ▼            ▼
       ┌────────────┐   ┌───────┐
       │ REST API   │   │ MySQL │
       │ Development│   └───┬───┘
       └────────────┘       │
                         USED_IN
                            │
                            ▼
                    ┌────────────────┐
                    │ AI Job Platform│
                    └────────────────┘
```

---

# Technology Stack

## Backend

- Java 21
- Spring Boot 4.1.1
- Neo4j Java Driver
- CognoDB Cloud
- Maven

## Frontend

- React
- Vite
- JavaScript
- React Flow
- CSS

## Database

- CognoDB Cloud
- openCypher
- Bolt protocol
- Official Neo4j Java Driver

---

# Architecture

```text
                     ┌──────────────────────┐
                     │      React UI        │
                     │       Vite           │
                     └──────────┬───────────┘
                                │
                              HTTP
                                │
                                ▼
                     ┌──────────────────────┐
                     │   Spring Boot API    │
                     │                      │
                     │ Controllers          │
                     │ Services             │
                     │ Repository           │
                     └──────────┬───────────┘
                                │
                        Neo4j Java Driver
                                │
                                ▼
                     ┌──────────────────────┐
                     │     CognoDB Cloud    │
                     │                      │
                     │   Graph Database     │
                     └──────────────────────┘
```

---

# Project Structure

```text
techstack-explorer/
│
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/nitesh/techstack/
│   │   │   │       ├── config/
│   │   │   │       ├── controller/
│   │   │   │       ├── dto/
│   │   │   │       ├── repository/
│   │   │   │       ├── seed/
│   │   │   │       └── service/
│   │   │   └── resources/
│   │   └── test/
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
│
├── cypher/
│   ├── constraints.cypher
│   ├── seed.cypher
│   ├── queries.cypher
│   └── cleanup.cypher
│
├── screenshots/
│
├── .env.example
├── .gitignore
└── README.md
```

---

# Backend API

The backend exposes REST endpoints for accessing graph data.

## Technologies

```http
GET /api/technologies
```

Returns all technologies.

---

## Technology Details

```http
GET /api/technologies/{technology}
```

Returns details for a selected technology.

---

## Skills

```http
GET /api/technologies/{technology}/skills
```

Returns skills required by the technology.

---

## Projects

```http
GET /api/technologies/{technology}/projects
```

Returns projects using the technology.

---

## Related Technologies

```http
GET /api/technologies/{technology}/related
```

Returns technologies connected through `USED_WITH` or `RELATED_TO`.

---

## Recommendations

```http
GET /api/technologies/{technology}/recommendations
```

Returns technologies that share projects with the selected technology.

---

## Multi-Hop Connections

```http
GET /api/technologies/{technology}/connections
```

Performs a multi-hop graph traversal:

```text
Technology
    ↓
Related Technology
    ↓
Project
```

---

## Graph

```http
GET /api/technologies/{technology}/graph
```

Returns graph relationships used by the interactive visualization.

---

## Categories

```http
GET /api/categories
```

Returns all technology categories.

---

## Technologies by Category

```http
GET /api/categories/{category}/technologies
```

Returns technologies belonging to a category.

---

# Cypher Queries

The repository contains the main graph queries in:

```text
cypher/queries.cypher
```

The application demonstrates several graph operations.

## 1. Node aggregation

Counts nodes by graph label.

```cypher
MATCH (n)
RETURN labels(n) AS node_type,
       count(n) AS total
ORDER BY total DESC;
```

---

## 2. Relationship aggregation

Counts relationships by type.

```cypher
MATCH ()-[r]->()
RETURN type(r) AS relationship_type,
       count(r) AS total
ORDER BY total DESC;
```

---

## 3. Category traversal

Find technologies contained in a category.

```cypher
MATCH (c:Category {name: $category})
      -[:CONTAINS]->
      (t:Technology)
RETURN t.name AS technology,
       t.type AS type
ORDER BY t.name;
```

---

## 4. Required skills

```cypher
MATCH (t:Technology {name: $technology})
      -[:REQUIRES]->
      (s:Skill)
RETURN s.name AS skill,
       s.level AS level
ORDER BY s.name;
```

---

## 5. Multi-Hop Traversal

One of the key graph queries is:

```cypher
MATCH (start:Technology {name: $technology})
      -[:USED_WITH|RELATED_TO]->
      (related:Technology)
      -[:USED_IN]->
      (project:Project)
RETURN DISTINCT
       related.name AS related_technology,
       project.name AS project
ORDER BY project.name;
```

This demonstrates a two-hop traversal:

```text
Selected Technology
       │
       │ USED_WITH / RELATED_TO
       ▼
Related Technology
       │
       │ USED_IN
       ▼
Project
```

---

# Graph-Based Recommendation

The application also demonstrates recommendation logic using shared graph relationships.

```cypher
MATCH (selected:Technology {name: $technology})
      -[:USED_IN]->
      (project:Project)
      <-[:USED_IN]-
      (recommendation:Technology)
WHERE recommendation.name <> selected.name
RETURN recommendation.name AS recommended_technology,
       count(DISTINCT project) AS shared_projects
ORDER BY shared_projects DESC,
         recommended_technology;
```

This finds technologies that are used in the same projects as the selected technology.

For example:

```text
Java
  ↓
AI Job Platform
  ↑
Spring Boot
```

Therefore, Spring Boot becomes a natural recommendation for Java.

---

# Parameterised Queries

The backend uses parameterised Cypher queries through the official Neo4j Java Driver.

For example:

```java
Map.of("technology", technology)
```

and:

```cypher
MATCH (t:Technology {name: $technology})
```

User-provided values are therefore passed as query parameters rather than concatenated directly into Cypher strings.

---

# Seed Data

Realistic seed data is provided in:

```text
cypher/seed.cypher
```

The seed script creates:

- 6 categories
- 12 technologies
- 7 skills
- 4 projects
- Technology-to-technology relationships
- Technology-to-skill relationships
- Technology-to-project relationships
- Category-to-technology relationships

The script uses `MERGE` so that seed operations can be safely repeated without creating duplicate entities.

---

# Constraints

Graph uniqueness constraints are defined in:

```text
cypher/constraints.cypher
```

The following node types have unique names:

```text
Category
Technology
Skill
Project
```

This prevents duplicate entities from being created accidentally.

---

# Local Setup

## Prerequisites

Install:

- Java 21
- Node.js
- npm
- Git
- A CognoDB Cloud account

---

# 1. Clone the Repository

```bash
git clone https://github.com/Nitesh-Kumar-Garhewal/techstack-explorer
cd techstack-explorer
```

---

# 2. Create a CognoDB Instance

Create a free CognoDB Cloud instance.

CognoDB provides a Bolt connection URI similar to:

```text
bolt+s://<instance-id>.databases.cognodb.com
```

Use:

```text
Username: cognodb
```

Store the generated password securely.

---

# 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
COGNODB_URI=bolt+s://your-instance-id.databases.cognodb.com
COGNODB_USERNAME=cognodb
COGNODB_PASSWORD=your-cognodb-password
```

The `.env` file is intentionally excluded from Git.

A safe template is provided as:

```text
.env.example
```

---

# 4. Seed the Database

Run the Cypher scripts using the CognoDB query interface.

First apply:

```text
cypher/constraints.cypher
```

Then run:

```text
cypher/seed.cypher
```

The seed script creates the application graph.

---

# 5. Start the Backend

Open a terminal:

```bash
cd backend
```

Run:

```bash
./mvnw spring-boot:run
```

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

---

# 6. Start the Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# Environment Variables

The backend reads CognoDB credentials from environment variables.

Required variables:

```env
COGNODB_URI
COGNODB_USERNAME
COGNODB_PASSWORD
```

The frontend uses:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Secrets are never committed to the repository.

---

# Error Handling

The backend validates HTTP responses and the frontend displays appropriate empty/error states when graph data cannot be retrieved.

The application also handles cases where:

- No technologies are available
- A technology does not exist
- No relationships are found
- No projects are connected
- No recommendations are available

---

# Testing

The backend can be tested using Maven:

```powershell
cd backend
.\mvnw.cmd clean test
```

Expected result:

```text
BUILD SUCCESS
```

---

# Screenshots

Screenshots demonstrating the application's functionality are available in:

```text
screenshots/
```

The screenshots include:

1. Home / Technology Explorer
2. Technology details
3. Category filtering
4. Related technologies
5. Recommendations
6. Interactive graph

---

# Hosted Demo

**Live Demo:**  
[https://techstack-explorer.onrender.com](https://techstack-explorer.onrender.com)

The hosted application demonstrates the complete flow:

```text
Browser
   ↓
React Frontend
   ↓
Spring Boot REST API
   ↓
CognoDB Cloud
```

---

# Demo Video

A short walkthrough demonstrating the application is provided as part of the assignment submission.

The video demonstrates:

1. Opening the application
2. Browsing technologies
3. Selecting a technology
4. Viewing connected skills and projects
5. Viewing recommendations
6. Exploring the graph
7. Navigating through connected technologies

**Demo Video:** `https://drive.google.com/file/d/1uxJRbrkwVhGyaCW_jUZ1c_XunD0pGyBg/view?usp=sharing`

---

# Design Decisions

## Why Spring Boot?

Spring Boot provides a clean backend architecture with separate:

- Controllers
- Services
- Repository
- DTOs
- Configuration

This keeps HTTP handling, business logic, and database access separated.

## Why the Neo4j Java Driver?

CognoDB supports the openCypher query language and Bolt protocol and is compatible with the official Neo4j drivers.

The application therefore uses the official Neo4j Java Driver rather than a custom database abstraction.

## Why React?

React provides a component-based UI suitable for an interactive exploration application.

React Flow is used for the graph visualization.

---

# Future Improvements

Possible future enhancements include:

- User-defined technology relationships
- More comprehensive technology datasets
- Graph search across multiple node types
- Technology comparison
- Shortest-path visualization
- More advanced recommendation scoring
- Authentication and user profiles
- Technology popularity metrics
- Importing larger datasets
- Production monitoring and logging

---

# Assignment Requirements Checklist

| Requirement                | Implementation                                               |
| -------------------------- | ------------------------------------------------------------ |
| Graph database             | CognoDB Cloud                                                |
| Official Neo4j driver      | Neo4j Java Driver                                            |
| Graph data model           | Category, Technology, Skill, Project                         |
| Typed relationships        | `CONTAINS`, `USED_WITH`, `RELATED_TO`, `REQUIRES`, `USED_IN` |
| Seed data                  | `cypher/seed.cypher`                                         |
| Cypher queries             | `cypher/queries.cypher`                                      |
| Multi-hop traversal        | Technology → Technology → Project                            |
| Relationally awkward query | Graph-based recommendations and multi-hop traversal          |
| Parameterised queries      | `$technology`, `$category`                                   |
| Functional web application | React + Spring Boot                                          |
| Interactive graph          | React Flow                                                   |
| Loading/empty/error states | Frontend components                                          |
| Environment-based secrets  | `.env`                                                       |
| Source code                | GitHub repository                                            |
| README                     | This document                                                |
| Screenshots                | `screenshots/`                                               |
| Hosted demo                | Render deployment                                            |
| Screen recording           | Demo video                                                   |

---

# Author

**Nitesh Kumar Garhewal**

GitHub:

https://github.com/Nitesh-Kumar-Garhewal

---

## License

This project was created as a technical take-home assignment for Wexa AI.

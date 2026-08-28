// ============================================
// CATEGORIES
// ============================================

MERGE (frontend:Category {
    name: 'Frontend',
    description: 'Technologies used to build user interfaces and web applications.'
});

MERGE (backend:Category {
    name: 'Backend',
    description: 'Technologies used for server-side application development.'
});

MERGE (database:Category {
    name: 'Database',
    description: 'Technologies used for storing and querying application data.'
});

MERGE (devops:Category {
    name: 'DevOps',
    description: 'Technologies used for deployment, automation and infrastructure.'
});

MERGE (cloud:Category {
    name: 'Cloud',
    description: 'Cloud platforms and services used to deploy applications.'
});

MERGE (language:Category {
    name: 'Programming Language',
    description: 'Programming languages used across software development.'
});


// ============================================
// TECHNOLOGIES
// ============================================

MERGE (java:Technology {
    name: 'Java',
    type: 'Programming Language',
    description: 'Object-oriented programming language widely used for backend systems.',
    website: 'https://www.java.com'
});

MERGE (spring:Technology {
    name: 'Spring Boot',
    type: 'Backend Framework',
    description: 'Framework for building production-ready Java applications.',
    website: 'https://spring.io/projects/spring-boot'
});

MERGE (react:Technology {
    name: 'React',
    type: 'Frontend Library',
    description: 'JavaScript library for building user interfaces.',
    website: 'https://react.dev'
});

MERGE (typescript:Technology {
    name: 'TypeScript',
    type: 'Programming Language',
    description: 'Typed programming language built on JavaScript.',
    website: 'https://www.typescriptlang.org'
});

MERGE (javascript:Technology {
    name: 'JavaScript',
    type: 'Programming Language',
    description: 'Programming language commonly used for web applications.',
    website: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
});

MERGE (mysql:Technology {
    name: 'MySQL',
    type: 'Relational Database',
    description: 'Popular relational database management system.',
    website: 'https://www.mysql.com'
});

MERGE (neo4j:Technology {
    name: 'Neo4j',
    type: 'Graph Database',
    description: 'Graph database using nodes and relationships to model connected data.',
    website: 'https://neo4j.com'
});

MERGE (docker:Technology {
    name: 'Docker',
    type: 'DevOps',
    description: 'Platform for packaging applications into containers.',
    website: 'https://www.docker.com'
});

MERGE (aws:Technology {
    name: 'AWS',
    type: 'Cloud Platform',
    description: 'Cloud computing platform providing infrastructure and managed services.',
    website: 'https://aws.amazon.com'
});

MERGE (python:Technology {
    name: 'Python',
    type: 'Programming Language',
    description: 'General-purpose programming language widely used for backend and data applications.',
    website: 'https://www.python.org'
});

MERGE (fastapi:Technology {
    name: 'FastAPI',
    type: 'Backend Framework',
    description: 'Modern Python framework for building APIs.',
    website: 'https://fastapi.tiangolo.com'
});

MERGE (node:Technology {
    name: 'Node.js',
    type: 'Backend Runtime',
    description: 'JavaScript runtime for server-side applications.',
    website: 'https://nodejs.org'
});


// ============================================
// SKILLS
// ============================================

MERGE (oop:Skill {
    name: 'Object Oriented Programming',
    level: 'Intermediate'
});

MERGE (rest:Skill {
    name: 'REST API Development',
    level: 'Intermediate'
});

MERGE (sql:Skill {
    name: 'SQL',
    level: 'Intermediate'
});

MERGE (web:Skill {
    name: 'Web Development',
    level: 'Beginner'
});

MERGE (containers:Skill {
    name: 'Containerization',
    level: 'Intermediate'
});

MERGE (cloudDeployment:Skill {
    name: 'Cloud Deployment',
    level: 'Intermediate'
});

MERGE (apiDesign:Skill {
    name: 'API Design',
    level: 'Intermediate'
});


// ============================================
// PROJECTS
// ============================================

MERGE (jobPlatform:Project {
    name: 'AI Job Platform',
    description: 'Platform for discovering and managing job opportunities.'
});

MERGE (ecommerce:Project {
    name: 'E-Commerce Platform',
    description: 'Online commerce application with product and order management.'
});

MERGE (analytics:Project {
    name: 'Analytics Dashboard',
    description: 'Dashboard for visualizing application and business metrics.'
});

MERGE (foodDelivery:Project {
    name: 'Food Delivery API',
    description: 'Backend API for restaurant and food delivery workflows.'
});


// ============================================
// CATEGORY → TECHNOLOGY
// ============================================

MATCH (c:Category {name: 'Programming Language'}),
      (t:Technology)
WHERE t.name IN ['Java', 'Python', 'JavaScript', 'TypeScript']
MERGE (c)-[:CONTAINS]->(t);

MATCH (c:Category {name: 'Frontend'}),
      (t:Technology {name: 'React'})
MERGE (c)-[:CONTAINS]->(t);

MATCH (c:Category {name: 'Backend'}),
      (t:Technology)
WHERE t.name IN ['Spring Boot', 'FastAPI', 'Node.js']
MERGE (c)-[:CONTAINS]->(t);

MATCH (c:Category {name: 'Database'}),
      (t:Technology)
WHERE t.name IN ['MySQL', 'Neo4j']
MERGE (c)-[:CONTAINS]->(t);

MATCH (c:Category {name: 'DevOps'}),
      (t:Technology {name: 'Docker'})
MERGE (c)-[:CONTAINS]->(t);

MATCH (c:Category {name: 'Cloud'}),
      (t:Technology {name: 'AWS'})
MERGE (c)-[:CONTAINS]->(t);


// ============================================
// TECHNOLOGY → TECHNOLOGY
// ============================================

MATCH (java:Technology {name: 'Java'}),
      (spring:Technology {name: 'Spring Boot'})
MERGE (java)-[:USED_WITH]->(spring);

MATCH (react:Technology {name: 'React'}),
      (typescript:Technology {name: 'TypeScript'})
MERGE (react)-[:USED_WITH]->(typescript);

MATCH (typescript:Technology {name: 'TypeScript'}),
      (javascript:Technology {name: 'JavaScript'})
MERGE (typescript)-[:RELATED_TO]->(javascript);

MATCH (spring:Technology {name: 'Spring Boot'}),
      (mysql:Technology {name: 'MySQL'})
MERGE (spring)-[:USED_WITH]->(mysql);

MATCH (spring:Technology {name: 'Spring Boot'}),
      (docker:Technology {name: 'Docker'})
MERGE (spring)-[:USED_WITH]->(docker);

MATCH (docker:Technology {name: 'Docker'}),
      (aws:Technology {name: 'AWS'})
MERGE (docker)-[:USED_WITH]->(aws);

MATCH (python:Technology {name: 'Python'}),
      (fastapi:Technology {name: 'FastAPI'})
MERGE (python)-[:USED_WITH]->(fastapi);

MATCH (node:Technology {name: 'Node.js'}),
      (javascript:Technology {name: 'JavaScript'})
MERGE (node)-[:RELATED_TO]->(javascript);

MATCH (neo4j:Technology {name: 'Neo4j'}),
      (java:Technology {name: 'Java'})
MERGE (neo4j)-[:USED_WITH]->(java);


// ============================================
// TECHNOLOGY → SKILL
// ============================================

MATCH (java:Technology {name: 'Java'}),
      (skill:Skill {name: 'Object Oriented Programming'})
MERGE (java)-[:REQUIRES]->(skill);

MATCH (spring:Technology {name: 'Spring Boot'}),
      (skill:Skill {name: 'REST API Development'})
MERGE (spring)-[:REQUIRES]->(skill);

MATCH (spring:Technology {name: 'Spring Boot'}),
      (skill:Skill {name: 'API Design'})
MERGE (spring)-[:REQUIRES]->(skill);

MATCH (react:Technology {name: 'React'}),
      (skill:Skill {name: 'Web Development'})
MERGE (react)-[:REQUIRES]->(skill);

MATCH (mysql:Technology {name: 'MySQL'}),
      (skill:Skill {name: 'SQL'})
MERGE (mysql)-[:REQUIRES]->(skill);

MATCH (docker:Technology {name: 'Docker'}),
      (skill:Skill {name: 'Containerization'})
MERGE (docker)-[:REQUIRES]->(skill);

MATCH (aws:Technology {name: 'AWS'}),
      (skill:Skill {name: 'Cloud Deployment'})
MERGE (aws)-[:REQUIRES]->(skill);


// ============================================
// TECHNOLOGY → PROJECT
// ============================================

MATCH (project:Project {name: 'AI Job Platform'}),
      (java:Technology {name: 'Java'}),
      (spring:Technology {name: 'Spring Boot'}),
      (react:Technology {name: 'React'}),
      (mysql:Technology {name: 'MySQL'}),
      (docker:Technology {name: 'Docker'})
MERGE (java)-[:USED_IN]->(project)
MERGE (spring)-[:USED_IN]->(project)
MERGE (react)-[:USED_IN]->(project)
MERGE (mysql)-[:USED_IN]->(project)
MERGE (docker)-[:USED_IN]->(project);

MATCH (project:Project {name: 'E-Commerce Platform'}),
      (java:Technology {name: 'Java'}),
      (spring:Technology {name: 'Spring Boot'}),
      (mysql:Technology {name: 'MySQL'}),
      (aws:Technology {name: 'AWS'})
MERGE (java)-[:USED_IN]->(project)
MERGE (spring)-[:USED_IN]->(project)
MERGE (mysql)-[:USED_IN]->(project)
MERGE (aws)-[:USED_IN]->(project);

MATCH (project:Project {name: 'Analytics Dashboard'}),
      (python:Technology {name: 'Python'}),
      (fastapi:Technology {name: 'FastAPI'}),
      (react:Technology {name: 'React'}),
      (typescript:Technology {name: 'TypeScript'})
MERGE (python)-[:USED_IN]->(project)
MERGE (fastapi)-[:USED_IN]->(project)
MERGE (react)-[:USED_IN]->(project)
MERGE (typescript)-[:USED_IN]->(project);

MATCH (project:Project {name: 'Food Delivery API'}),
      (node:Technology {name: 'Node.js'}),
      (javascript:Technology {name: 'JavaScript'}),
      (docker:Technology {name: 'Docker'}),
      (aws:Technology {name: 'AWS'})
MERGE (node)-[:USED_IN]->(project)
MERGE (javascript)-[:USED_IN]->(project)
MERGE (docker)-[:USED_IN]->(project)
MERGE (aws)-[:USED_IN]->(project);
// ============================================
// 1. Count all nodes by label
// ============================================

MATCH (n)
RETURN labels(n) AS node_type,
       count(n) AS total
ORDER BY total DESC;


// ============================================
// 2. Count all relationships
// ============================================

MATCH ()-[r]->()
RETURN type(r) AS relationship_type,
       count(r) AS total
ORDER BY total DESC;


// ============================================
// 3. List all technologies
// ============================================

MATCH (t:Technology)
RETURN t.name AS technology,
       t.type AS type,
       t.description AS description
ORDER BY t.name;


// ============================================
// 4. Technologies in a category
// ============================================

MATCH (c:Category {name: $category})
      -[:CONTAINS]->
      (t:Technology)
RETURN t.name AS technology,
       t.type AS type
ORDER BY t.name;


// ============================================
// 5. Technologies used together
// ============================================

MATCH (t1:Technology {name: $technology})
      -[:USED_WITH]->
      (t2:Technology)
RETURN t2.name AS related_technology,
       t2.type AS type
ORDER BY t2.name;


// ============================================
// 6. Required skills for a technology
// ============================================

MATCH (t:Technology {name: $technology})
      -[:REQUIRES]->
      (s:Skill)
RETURN s.name AS skill,
       s.level AS level
ORDER BY s.name;


// ============================================
// 7. Projects using a technology
// ============================================

MATCH (t:Technology {name: $technology})
      -[:USED_IN]->
      (p:Project)
RETURN p.name AS project,
       p.description AS description
ORDER BY p.name;


// ============================================
// 8. MULTI-HOP TRAVERSAL
// ============================================
//
// Technology → Technology → Project
//
// "Which projects are connected to technologies
// related to the selected technology?"

MATCH (start:Technology {name: $technology})
      -[:USED_WITH|RELATED_TO]->
      (related:Technology)
      -[:USED_IN]->
      (project:Project)
RETURN DISTINCT
       related.name AS related_technology,
       project.name AS project
ORDER BY project.name;


// ============================================
// 9. GRAPH-BASED RECOMMENDATION
// ============================================
//
// Technology → Project ← Technology
//
// Find technologies that appear in the same
// projects as the selected technology.

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


// ============================================
// 10. ADVANCED MULTI-HOP QUERY
// ============================================
//
// Technology
//     ↓ USED_WITH / RELATED_TO
// Technology
//     ↓ REQUIRES
// Skill
//
// Find skills indirectly connected to a technology.

MATCH (start:Technology {name: $technology})
      -[:USED_WITH|RELATED_TO]->
      (related:Technology)
      -[:REQUIRES]->
      (skill:Skill)
RETURN DISTINCT
       related.name AS related_technology,
       skill.name AS skill,
       skill.level AS level
ORDER BY related.name,
         skill.name;
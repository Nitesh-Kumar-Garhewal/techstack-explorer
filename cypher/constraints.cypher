CREATE CONSTRAINT category_name_unique IF NOT EXISTS
FOR (c:Category)
REQUIRE c.name IS UNIQUE;

CREATE CONSTRAINT technology_name_unique IF NOT EXISTS
FOR (t:Technology)
REQUIRE t.name IS UNIQUE;

CREATE CONSTRAINT skill_name_unique IF NOT EXISTS
FOR (s:Skill)
REQUIRE s.name IS UNIQUE;

CREATE CONSTRAINT project_name_unique IF NOT EXISTS
FOR (p:Project)
REQUIRE p.name IS UNIQUE;
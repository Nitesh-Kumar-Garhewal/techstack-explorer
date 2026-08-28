import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Boxes,
  Code2,
  FolderKanban,
  Lightbulb,
  Network,
} from "lucide-react";

import {
  getTechnology,
  getTechnologySkills,
  getTechnologyProjects,
  getRelatedTechnologies,
  getConnections,
  getTechnologyGraph,
  getTechnologyRecommendations,
} from "../api/technologyApi";

import GraphView from "./GraphView";

function TechnologyDetails() {
  const { technologyName } = useParams();
  const navigate = useNavigate();

  const [technology, setTechnology] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [related, setRelated] = useState([]);
  const [connections, setConnections] = useState([]);

  const [recommendations, setRecommendations] = useState([]);
  const [graph, setGraph] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  function handleBack() {
    navigate("/");
  }

  function handleTechnologyClick(name) {
    navigate(`/technology/${encodeURIComponent(name)}`);
  }

  useEffect(() => {
    async function loadDetails() {
      try {
        setLoading(true);
        setError("");

        const [
          technologyData,
          skillsData,
          projectsData,
          relatedData,
          connectionsData,
          recommendationsData,
          graphData,
        ] = await Promise.all([
          getTechnology(technologyName),
          getTechnologySkills(technologyName),
          getTechnologyProjects(technologyName),
          getRelatedTechnologies(technologyName),
          getConnections(technologyName),
          getTechnologyRecommendations(technologyName),
          getTechnologyGraph(technologyName),
        ]);

        setTechnology(technologyData);
        setSkills(skillsData);
        setProjects(projectsData);
        setRelated(relatedData);
        setConnections(connectionsData);
        setRecommendations(recommendationsData);
        setGraph(graphData);
      } catch (err) {
        console.error(err);
        setError("Unable to load graph relationships.");
      } finally {
        setLoading(false);
      }
    }

    if (technologyName) {
      loadDetails();
    }
  }, [technologyName]);

  if (loading) {
    return (
      <div className="state-card">
        <div className="loading-spinner" />
        <h2>Exploring the graph...</h2>
        <p>Following relationships from {technologyName}.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="state-card error">
        <h2>Unable to explore this technology</h2>
        <p>{error}</p>

        <button type="button" className="secondary-button" onClick={handleBack}>
          <ArrowLeft size={18} />
          Back to technologies
        </button>
      </div>
    );
  }

  return (
    <div className="details-page">
      <button type="button" className="back-button" onClick={handleBack}>
        <ArrowLeft size={18} />
        All technologies
      </button>

      <section className="technology-hero">
        <div>
          <span className="technology-type">
            {technology?.type || "Technology"}
          </span>

          <h1>{technology?.technology}</h1>

          <p>
            {technology?.description ||
              "Explore how this technology connects to the rest of the graph."}
          </p>

          {technology?.website && (
            <a
              href={technology.website}
              target="_blank"
              rel="noreferrer"
              className="website-link"
            >
              Official website ↗
            </a>
          )}
        </div>

        <div className="hero-icon">
          <Code2 size={42} />
        </div>
      </section>

      <div className="detail-grid">
        <section className="detail-panel">
          <div className="panel-heading">
            <div className="panel-icon">
              <Lightbulb size={19} />
            </div>

            <div>
              <h2>Required skills</h2>
              <p>Skills associated with this technology</p>
            </div>
          </div>

          {skills.length > 0 ? (
            <div className="item-list">
              {skills.map((skill) => (
                <div className="list-item" key={skill.skill}>
                  <div>
                    <strong>{skill.skill}</strong>
                  </div>

                  <span className="level-badge">{skill.level}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">No skills connected yet.</div>
          )}
        </section>

        <section className="detail-panel">
          <div className="panel-heading">
            <div className="panel-icon">
              <FolderKanban size={19} />
            </div>

            <div>
              <h2>Used in projects</h2>
              <p>Projects using this technology</p>
            </div>
          </div>

          {projects.length > 0 ? (
            <div className="item-list">
              {projects.map((project) => (
                <div className="project-item" key={project.project}>
                  <strong>{project.project}</strong>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">No projects connected yet.</div>
          )}
        </section>

        <section className="detail-panel">
          <div className="panel-heading">
            <div className="panel-icon">
              <Boxes size={19} />
            </div>

            <div>
              <h2>Related technologies</h2>
              <p>Direct graph relationships</p>
            </div>
          </div>

          {related.length > 0 ? (
            <div className="related-list">
              {related.map((item) => (
                <div className="related-item" key={item.technology}>
                  <span>{item.technology}</span>
                  <small>{item.type}</small>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">No related technologies found.</div>
          )}
        </section>

        <section className="detail-panel">
          <div className="panel-heading">
            <div className="panel-icon">
              <Boxes size={19} />
            </div>

            <div>
              <h2>Recommended technologies</h2>
              <p>Technologies frequently used with {technologyName}</p>
            </div>
          </div>

          {recommendations.length > 0 ? (
            <div className="related-list">
              {recommendations.map((item) => (
                <button
                  type="button"
                  className="related-item recommendation-item"
                  key={item.technology}
                  onClick={() => handleTechnologyClick(item.technology)}
                >
                  <div>
                    <span>{item.technology}</span>
                    <small>{item.type}</small>
                  </div>

                  <strong>
                    {item.sharedProjects} shared project
                    {item.sharedProjects !== 1 ? "s" : ""}
                  </strong>
                </button>
              ))}
            </div>
          ) : (
            <div className="empty-state">No recommendations found.</div>
          )}
        </section>

        <section className="detail-panel connection-panel">
          <div className="panel-heading">
            <div className="panel-icon">
              <Network size={19} />
            </div>

            <div>
              <h2>Technology graph</h2>
              <p>Visual representation of technologies, skills and projects</p>
            </div>
          </div>

          <GraphView
            connections={graph}
            onTechnologyClick={handleTechnologyClick}
          />
        </section>

        <section className="detail-panel connection-panel">
          <div className="panel-heading">
            <div className="panel-icon">
              <Network size={19} />
            </div>

            <div>
              <h2>Graph connections</h2>
              <p>Multi-hop relationships discovered in the graph</p>
            </div>
          </div>

          {connections.length > 0 ? (
            <div className="connection-list">
              {connections.map((connection, index) => (
                <div
                  className="connection-row"
                  key={`${connection.relatedTechnology}-${connection.project}-${index}`}
                >
                  <span className="connection-node">{technologyName}</span>

                  <span className="connection-arrow">→</span>

                  <span className="connection-node">
                    {connection.relatedTechnology}
                  </span>

                  <span className="connection-arrow">→</span>

                  <span className="connection-project">
                    {connection.project}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">No multi-hop connections found.</div>
          )}
        </section>
      </div>
    </div>
  );
}

export default TechnologyDetails;

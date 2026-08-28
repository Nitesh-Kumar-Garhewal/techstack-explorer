import { useEffect, useMemo, useState } from "react";

import {
  getTechnologies,
  getCategories,
  getTechnologiesByCategory,
} from "../api/technologyApi";

import CategoryBar from "./CategoryBar";
import TechnologyCard from "./TechnologyCard";
import SearchBar from "./SearchBar";
import StatsBar from "./StatsBar";

import { useNavigate } from "react-router-dom";

function HomePage() {
  const [technologies, setTechnologies] = useState([]);
  const [allTechnologies, setAllTechnologies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        setError("");

        const [technologyData, categoryData] = await Promise.all([
          getTechnologies(),
          getCategories(),
        ]);

        setTechnologies(technologyData);
        setAllTechnologies(technologyData);
        setCategories(categoryData);
      } catch (err) {
        console.error(err);
        setError("Unable to connect to the technology graph.");
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  const filteredTechnologies = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return technologies;
    }

    return technologies.filter((technology) =>
      [technology.technology, technology.type, technology.description]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query)),
    );
  }, [technologies, search]);

  async function handleCategorySelect(category) {
    try {
      setSelectedCategory(category);
      setSearch("");

      if (!category) {
        setTechnologies(allTechnologies);
        return;
      }

      setLoading(true);
      setError("");

      const data = await getTechnologiesByCategory(category);

      setTechnologies(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load technologies for this category.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div>
            <p className="eyebrow">COGNODB - GRAPH EXPLORER</p>

            <h1>TechStack Explorer</h1>

            <p className="subtitle">
              Discover how technologies, skills and projects are connected.
            </p>
          </div>

          <div className="graph-badge">
            <span className="status-dot" />
            Graph connected
          </div>
        </div>
      </header>

      <main className="main">
        <StatsBar technologyCount={allTechnologies.length} />

        <CategoryBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={handleCategorySelect}
        />

        <div className="explorer-toolbar">
          <div>
            <p className="eyebrow">EXPLORE THE GRAPH</p>
            <h2>Technologies</h2>
          </div>

          <SearchBar
            value={search}
            onChange={setSearch}
            onClear={() => setSearch("")}
          />
        </div>

        {loading && (
          <div className="state-card">
            <div className="loading-spinner" />

            <h2>Loading technology graph...</h2>

            <p>Connecting to CognoDB through the application API.</p>
          </div>
        )}

        {!loading && error && (
          <div className="state-card error">
            <h2>Graph unavailable</h2>

            <p>{error}</p>
          </div>
        )}

        {!loading && !error && filteredTechnologies.length === 0 && (
          <div className="state-card">
            <h2>No technologies found</h2>

            <p>Try a different search term.</p>

            {search && (
              <button
                type="button"
                className="secondary-button"
                onClick={() => setSearch("")}
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {!loading && !error && filteredTechnologies.length > 0 && (
          <>
            <div className="results-meta">
              Showing {filteredTechnologies.length} of {technologies.length}{" "}
              {selectedCategory
                ? `technologies in ${selectedCategory}`
                : "technologies"}
            </div>

            <div className="technology-grid">
              {filteredTechnologies.map((technology) => (
                <TechnologyCard
                  key={technology.technology}
                  technology={technology}
                  onClick={() =>
                    navigate(
                      `/technology/${encodeURIComponent(technology.technology)}`,
                    )
                  }
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default HomePage;

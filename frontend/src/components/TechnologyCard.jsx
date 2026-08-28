function TechnologyCard({ technology, selected, onClick }) {
  return (
    <button
      type="button"
      className={`technology-card ${selected ? "selected" : ""}`}
      onClick={() => onClick(technology.technology)}
    >
      <span className="technology-type">{technology.type || "Technology"}</span>

      <h3>{technology.technology}</h3>

      <p>
        {technology.description ||
          "Explore this technology's graph connections."}
      </p>

      <span className="explore-label">Explore connections →</span>
    </button>
  );
}

export default TechnologyCard;

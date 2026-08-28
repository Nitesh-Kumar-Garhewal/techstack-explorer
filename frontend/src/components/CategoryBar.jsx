function CategoryBar({ categories, selectedCategory, onSelect }) {
  return (
    <section className="category-section">
      <div className="category-heading">
        <div>
          <p className="eyebrow">BROWSE THE GRAPH</p>
          <h2>Explore by category</h2>
        </div>

        {selectedCategory && (
          <button
            type="button"
            className="category-clear"
            onClick={() => onSelect(null)}
          >
            Clear category
          </button>
        )}
      </div>

      <div className="category-list">
        <button
          type="button"
          className={`category-chip ${!selectedCategory ? "active" : ""}`}
          onClick={() => onSelect(null)}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={`category-chip ${
              selectedCategory === category ? "active" : ""
            }`}
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CategoryBar;

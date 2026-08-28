import { Search, X } from "lucide-react";

function SearchBar({ value, onChange, onClear }) {
  return (
    <div className="search-wrapper">
      <Search size={20} />

      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search technologies..."
        aria-label="Search technologies"
      />

      {value && (
        <button
          type="button"
          className="clear-search"
          onClick={onClear}
          aria-label="Clear search"
        >
          <X size={17} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;

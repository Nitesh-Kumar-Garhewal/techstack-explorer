import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <main className="main">
        <div className="state-card">
          <p className="eyebrow">404</p>

          <h2>Page not found</h2>

          <p>The page or technology you are looking for does not exist.</p>

          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate("/")}
          >
            Back to technologies
          </button>
        </div>
      </main>
    </div>
  );
}

export default NotFound;

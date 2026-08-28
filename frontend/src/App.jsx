import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import TechnologyDetails from "./components/TechnologyDetails";
import NotFound from "./components/NotFound";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/technology/:technologyName"
          element={<TechnologyDetails />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

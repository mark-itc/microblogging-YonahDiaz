import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import Profile from "./views/Profile";

function App() {
  return (
    <div className="App">
      <div className="nav-bar">
        <div className="links-container">
          <div>
            <Link to="/" className="links">
              Home
            </Link>
          </div>
          <div>
            <Link to="/profile" className="links">
              Profile
            </Link>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;

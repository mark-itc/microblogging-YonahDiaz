import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import Profile from "./views/Profile";
import { createContext, useState } from "react";
export const AppContext = createContext();

function NavBar() {
  return (
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
  );
}

function App() {
  const [text, setText] = useState("");
  const [tweets, setTweets] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          text,
          setText,
          tweets,
          setTweets,
          isPending,
          setIsPending,
          newUserName,
          setNewUserName,
        }}
      >
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </AppContext.Provider>
    </div>
  );
}

export default App;

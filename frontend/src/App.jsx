import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user)); // currently logged-in user's data
  }, [user]);
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-white">
      <div className="w-full block">
        <Header
          token={token}
          setToken={setToken}
          user={user}
          setUser={setUser}
        />
        <main>
          <Outlet context={{ token, setToken, user, setUser }} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
export default App;

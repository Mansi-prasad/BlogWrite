import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
function App({ url }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-white">
      <div className="w-full block">
        <Header token={token} setToken={setToken} />
        <main>
          <Outlet context={{ token, setToken }} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
export default App;

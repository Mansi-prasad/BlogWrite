import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Footer, Header } from "./components";
import { Outlet, useNavigate } from "react-router-dom";
function App({ url }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const res = await axios.get(`${url}/api/user/verify`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data.user);
        } catch (err) {
          console.log("Token invalid or expired");
          setToken("");
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
      checkAuth();
    };
  }, [token]);
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-white">
      <div className="w-full block">
        <Header token={token} user={user} setToken={setToken} />
        <main>
          <Outlet context={{ token, setToken, user }} />
        </main>
        <Footer />
      </div>
    </div>
  );
}
export default App;

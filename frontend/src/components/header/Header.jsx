import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
const Header = ({ token, setToken, setUser }) => {
  // console.log("token:", token);
  return (
    <>
      <header className="p-3 shadow bg-indigo-300 sticky top-0 z-50 ">
        <Container>
          <nav className="flex">
            <div className="mr-4 w-44">
              <Link to="/">
                <Logo />
              </Link>
            </div>
            <ul className="flex ml-auto items-center justify-around gap-6">
              <li>
                <Link to="/">Home</Link>
              </li>
              {!token ? (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Signup</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/my-posts">All Posts</Link>
                  </li>
                  <li>
                    <Link to="/add-post">Add Post</Link>
                  </li>
                  <LogoutBtn setToken={setToken} setUser={setUser} />
                </>
              )}
            </ul>
          </nav>
        </Container>
      </header>
    </>
  );
};
export default Header;

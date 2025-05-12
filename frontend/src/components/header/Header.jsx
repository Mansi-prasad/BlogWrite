import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
const Header = ({ token, user, setToken }) => {
  // console.log("token:", token);
  return (
    <>
      <header className="py-3 shadow bg-rose-300">
        <Container>
          <nav className="flex">
            <div className="mr-4">
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
                    <Link to="/all-posts">All Posts</Link>
                  </li>
                  <li>
                    <Link to="/add-post">Add Post</Link>
                  </li>
                  <LogoutBtn setToken={setToken} />
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

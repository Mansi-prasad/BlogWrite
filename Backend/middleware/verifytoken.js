import jwt from "jsonwebtoken";
// protect routes by verifying that the incoming request has a valid JWT

// reads authorization header, extracts the JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1]; // Extracts the actual token string from the header(Bearer abc123.token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //  every request hitting protected route has access to req.user.id (from jwt)
    req.user = decoded; // sets decoded user data to the req.user object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default verifyToken;

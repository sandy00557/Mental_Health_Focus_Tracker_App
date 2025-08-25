// import { isAuthenticated } from "../utils/auth";
// import { Navigate } from "react-router-dom";
// const ProtectedRoute = ({ children }) => {
//   return isAuthenticated() ? children : <Navigate to="/DashboardPage" />;
// };
// export default ProtectedRoute;

// components/ProtectedRoute.jsx
// components/ProtectedRoute.jsx
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const loggedInUser = await isAuthenticated();
      setUser(loggedInUser);
      setLoading(false);
    };
    checkAuth();
  }, []);

  if (loading) return <div>Checking authentication...</div>;

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;

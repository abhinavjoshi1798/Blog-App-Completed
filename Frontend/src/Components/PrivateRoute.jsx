import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function PrivateRoute({ children }) {
  const { isAuth, user } = useContext(AuthContext);
  if (isAuth && user.role === "admin") {
    return children;
  }

  return <Navigate to="/admin/login" />;
}

export default PrivateRoute;

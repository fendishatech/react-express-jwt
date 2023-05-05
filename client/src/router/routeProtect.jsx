import { Navigate } from "react-router-dom";
const ProtectedRoute = (prop) => {
  const isAuthenticated = localStorage.getItem("user") !== null;

  if (isAuthenticated) {
    return <div>{prop.children}</div>;
  }
  return <Navigate to="/" />;
};

export default ProtectedRoute;

import { Navigate, Outlet, useLocation } from "react-router-dom";

function RequriedAuth() {
  const token = localStorage.getItem("token");
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequriedAuth;

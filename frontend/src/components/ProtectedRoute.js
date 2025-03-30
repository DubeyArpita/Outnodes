import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ allowedRoles }) {
  const role = localStorage.getItem("userRole");

  return allowedRoles.includes(role) ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;

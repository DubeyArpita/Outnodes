import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";

export default function AuthLayout({ children, authentication = true, role }) {
  const { isLoggedIn, role: userRole } = useSelector((state) => state.user);
  const location = useLocation();

  const allowedRoles = Array.isArray(role)
    ? role.map((r) => r?.toLowerCase())
    : [role?.toLowerCase()];

  const normalizedUserRole = userRole?.toLowerCase();

  const isAuthorized =
    (authentication &&
      isLoggedIn &&
      (!role || allowedRoles.includes(normalizedUserRole))) ||
    (!authentication && !isLoggedIn);

  useEffect(() => {
    document.title = isAuthorized ? "Outnodes" : "Unauthorized";
  }, [isAuthorized]);

  if (!authentication && isLoggedIn) {
    if (userRole === "admin")
      return <Navigate to="/all-places-admin" replace />;
    if (userRole === "business") return <Navigate to="/dashboard" replace />;
    return <Navigate to="/discover" replace />;
  }
  
  return children;
}

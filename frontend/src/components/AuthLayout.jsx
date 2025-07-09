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

  if (!isAuthorized) {
    return (
      <Navigate
        to={authentication ? "/login" : "/"}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}

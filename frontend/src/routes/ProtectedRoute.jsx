import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  role,
}) {
  const loginRoutes = {
    admin: "/admin/login",
    recruiter: "/recruiter/login",
    student: "/student/login",
  };

  const fallbackRoute =
    loginRoutes[role] || "/admin/login";

  const token =
    localStorage.getItem("token");

  const userRole =
    localStorage.getItem("role");

  if (!token) {
    return <Navigate to={fallbackRoute} replace />;
  }

  if (userRole !== role) {
    return <Navigate to={fallbackRoute} replace />;
  }

  return children;
}

export default ProtectedRoute;

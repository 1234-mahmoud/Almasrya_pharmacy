import { Navigate } from "react-router";

export default function HomeRedirect() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return <Navigate to="/" replace />;
  }

  switch (user.role) {
    case "admin":
      return <Navigate to="/admin" replace />;

    case "cashier":
      return <Navigate to="/cashier" replace />;

    case "user":
      return <Navigate to="/user" replace />;

    default:
      return <Navigate to="/" replace />;
  }
}
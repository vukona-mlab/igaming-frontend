import { Navigate, Outlet } from "react-router-dom";
import parseJwt from "../../utils/checkToken";

export default function ProtectedRoutes() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />; // no token, redirect to default login
  }

  try {
    const decoded = parseJwt(token);
    const currentTime = Date.now() / 1000;

    // check if token expired
    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.clear();
      return <Navigate to="/" />;
    }

    // optional: role-based redirect could go here
    return <Outlet />; // user is authenticated
  } catch (error) {
    localStorage.clear();
    return <Navigate to="/" />;
  }
}

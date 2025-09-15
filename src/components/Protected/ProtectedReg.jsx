import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRouteReg({ auth }) {
  const uid = localStorage.getItem("uid");

  return uid !== null && uid !== "" ? <Navigate to="/profile" /> : <Outlet />;
}

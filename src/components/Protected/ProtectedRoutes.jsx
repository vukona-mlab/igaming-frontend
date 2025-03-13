import { Navigate, Outlet, useNavigate } from "react-router-dom";
import parseJwt from "../../utils/checkToken";
export default function ProtectedRoutes() {
  const navigation = useNavigate();
  function refresh() {
    navigation(0);
  }
  const token = localStorage.getItem("token");
  if (token !== null) {
    parseJwt(token, refresh);
  }
  return token !== null && token !== "" ? <Outlet /> : <Navigate to="/" />;
}

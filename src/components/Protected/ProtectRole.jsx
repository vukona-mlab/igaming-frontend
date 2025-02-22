import { Navigate, Outlet } from "react-router-dom";
import ClientProfile from "../../pages/client/clientProfile/clientProfile";
import FreelancerProfile from "../../pages/freelancer/freelanceProfile/frelancerProfile";
export default function ProtectedRoutes() {
  const role = localStorage.getItem("role");
  return role === "client" ? <ClientProfile /> : <FreelancerProfile />;
}

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import FreelancerRegister from "./pages/freelancer/Register-page/Register";
import FreelancerSignIn from "./pages/freelancer/SigninForm/SignIn";
import FreelancerProfile from "./pages/freelancer/freelanceProfile/frelancerProfile";

import ClientProfile from "./pages/client/clientProfile/clientProfile";
import ClientRegister from "./pages/client/Register-page/ClientRegister";
import ClientSignIn from "./pages/client/SignInPage/SignIn";
import LandingPage from "./pages/landingPage/LandingPage";
import ProtectedRouteReg from "./components/Protected/ProtectedReg";
import ProtectedRoutes from "./components/Protected/ProtectedRoutes";
import ProtectRole from "./components/Protected/ProtectRole";
import DiscoveryPage from "./pages/DiscoveryPage/DiscoveryPage";

function App() {
  const userRole = localStorage.getItem("role");
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/discovery" element={<DiscoveryPage />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            <Route element={<ProtectedRouteReg />}>
              <Route
                exact
                path="client-register"
                element={<ClientRegister />}
              />
              <Route
                exact
                path="client-register"
                element={<ClientRegister />}
              />
              <Route
                exact
                path="freelancer-register"
                path="freelancer-register"
                element={<FreelancerRegister />}
              />

              <Route exact path="client-signin" element={<ClientSignIn />} />
              <Route exact path="client-signin" element={<ClientSignIn />} />
              <Route
                exact
                path="freelancer-signin"
                path="freelancer-signin"
                element={<FreelancerSignIn />}
              />
            </Route>

            <Route element={<ProtectedRoutes />}>
              <Route path="profile" element={<ProtectRole />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

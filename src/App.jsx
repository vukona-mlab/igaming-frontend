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
function App() {
  const userRole = localStorage.getItem("role");
  console.log({ userRole });
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route path="/resetPassword" element={<ResetPassword />} />

            <Route element={<ProtectedRouteReg />}>
              <Route exact path="clientRegister" element={<ClientRegister />} />
              <Route
                exact
                path="freelancerRegister"
                element={<FreelancerRegister />}
              />

              <Route exact path="clientSignin" element={<ClientSignIn />} />
              <Route
                exact
                path="freelancerSignin"
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

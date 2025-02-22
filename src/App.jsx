import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import FreelancerRegister from "./pages/freelancer/Register-page/Register";
import FreelancerSignIn from "./pages/freelancer/SigninForm/SignIn";
import FreelancerProfile from "./pages/freelancer/freelanceProfile/frelancerProfile";

import ClientProfile from "./pages/client/clientProfile/clientProfile";
import ClientGoogle from "./pages/client/clientGoogle";
import UserProfile from "./pages/UserProfile";
import ProtectedRouteReg from "./components/Protected/ProtectedReg";
import ProtectedRoutes from "./components/Protected/ProtectedRoutes";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const userRole = localStorage.getItem("userRole");
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/resetPassword" element={<ResetPassword />} />
            <Route path="/" element={<ClientGoogle />} />
            
            <Route
              path="/profile"
              element={
                userRole === "client" ? (
                  <UserProfile />
                ) : (
                  <FreelancerProfile />
                )
              }
            />

            <Route element={<ProtectedRouteReg />}>
              <Route
                exact
                path="freelancerRegister"
                element={<FreelancerRegister />}
              />
              <Route
                exact
                path="freelancerSignin"
                element={<FreelancerSignIn />}
              />
            </Route>
          </Routes>
        </Router>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;

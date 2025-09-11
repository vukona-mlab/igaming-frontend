import "./App.css";
import NavBar from "./components/Common/Navbar/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import FreelancerRegister from "./pages/freelancer/Register-page/Register";
import FreelancerSignIn from "./pages/freelancer/FreelancerSignIn/SignIn";
import FreelancerProfile from "./pages/freelancer/freelanceProfile/frelancerProfile";

import ClientProfile from "./pages/client/clientProfile/clientProfile";
import ClientRegister from "./pages/client/Register-page/ClientRegister";
import ClientSignIn from "./pages/client/SignInPage/SignIn";
import LandingPage from "./pages/landingPage/LandingPage";
import ProtectedRouteReg from "./components/Protected/ProtectedReg";
import ProtectedRoutes from "./components/Protected/ProtectedRoutes";
import ProtectRole from "./components/Protected/ProtectRole";
import DiscoveryPage from "./pages/DiscoveryPage/DiscoveryPage";
import FreelancerDetails from "./pages/freelancer/freelancesDetailsPage/freelancerDetailsPage";
import MessagingPageF from "./pages/freelancer/MessagingPage/MessagingPageF";
import EscrowPage from "./pages/EscrowPage/EscrowPage";
import MessagingPageC from "./pages/client/MessagingPage/MessagingPageC";
import Transactions from "./pages/transcations/Transactions";
import Document from "./pages/freelancer/DocumentsPage/DocumentUpload/documentUpload";
import DocumentView from "./pages/freelancer/DocumentsPage/ViewDocuments/DocumentsView";
import Projects from "./pages/projects/Projects";
import ContactPage from "./pages/ContactPage/ContactPage";
import { registerNotificationSW } from "./config/service-workers";
import { useEffect } from "react";
import { ProfileCompletionProvider } from "./components/Common/ProfileCompletionContext";
import AnonymousChat from "./pages/AnonymousChat/AnonymousChat";

//import ProfileCompletionModal from "./components/Common/ProfileCompletionModal";
//import { requestPermissionAndGetToken } from "./config/service-workers/index";
function App() {
  useEffect(() => {
    //register service worker
    registerNotificationSW();
  }, []);
  return (
    <ProfileCompletionProvider>
      <Router>
        <div className="App">
          {/* <ProfileCompletionModal /> Removed: modal now only appears on protected pages */}
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/discovery" element={<DiscoveryPage />}>
              <Route path=":freelancer_id" element={<FreelancerDetails />} />
            </Route>
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/anonymous-chat/:id" element={<AnonymousChat />} />
            <Route element={<ProtectedRouteReg />}>
              <Route
                exact
                path="client-register"
                element={<ClientRegister />}
              />
              <Route
                exact
                path="freelancer-register"
                element={<FreelancerRegister />}
              />

              <Route exact path="client-signin" element={<ClientSignIn />} />
              <Route
                exact
                path="freelancer-signin"
                element={<FreelancerSignIn />}
              />
            </Route>

            <Route element={<ProtectedRoutes />}>
              <Route path="profile" element={<ProtectRole />} />
              <Route
                path="freelancer-profile"
                element={<FreelancerProfile />}
              />
              <Route path="client-profile" element={<ClientProfile />} />
              <Route
                path="messaging-freelancer/:chatId?"
                element={<MessagingPageF />}
              />
              <Route
                path="messaging-client/:chatId?"
                element={<MessagingPageC />}
              />
              <Route path="escrow" element={<EscrowPage />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="add-document" element={<Document />} />
              <Route path="view-document" element={<DocumentView />} />
              <Route path="projects" element={<Projects />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </ProfileCompletionProvider>
  );
}

export default App;

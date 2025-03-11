import PaymentPlan from "./components/Pricing Card/paymentPlan";
import Transactions from "./pages/transcations/Transactions";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/discovery" element={<DiscoveryPage />}>
              <Route path=":freelancer_id" element={<FreelancerProjects />} />
            </Route>
            <Route path="/reset-password" element={<ResetPassword />} />

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
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}
export default App;

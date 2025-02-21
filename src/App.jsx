import "./App.css";
import NavBar from "./components/Navbar/navbar";
import SubNavBar from "./components/SubNavBar/SubNavBar";
import InputForm from "./components/reusable-input-form/InputForm";
import SignIn from "./pages/freelancer/SignIn";


function App() {
  return <div className="App">
   <SignIn/>
  </div>;
}

export default App;
import "./App.css";
import PortfolioCard from "./components/portfolioCard/portfolioCard"; // Import the component

function App() {
  return (
    <div className="App" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <PortfolioCard />
    </div>
  );
}

export default App;

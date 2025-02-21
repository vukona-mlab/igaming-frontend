import React from "react";
import "./App.css";
import ClientPage from "./pages/clientProfile/clientProfile"; // Make sure the path is correct

function App() {
  return (
    <div className="App">
      <ClientPage /> {/* Call ProfilePage component */}
    </div>
  );
}

export default App;

import React, { useState } from "react";
import CategoryPreferences from "./components/categoryPreferance/categoryPrefarances";

const App = () => {
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (data) => {
    setSubmittedData(data);
    console.log("Form Data Submitted:", data);
  };

  return (
    <div className="App">
      
      <CategoryPreferences onSubmit={handleSubmit} />

      {submittedData && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid black" }}>
          <h3>Submitted Data:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;

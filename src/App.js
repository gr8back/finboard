import React from "react";
import "./App.css";
import Lifecycle from "./lifecycle";
import Myd3 from "./myd3chart2";

function App() {
  return (
    <div className="App">
      <header className="App-header">Fin Board</header>
      <div style={{ height: "200px", backgroundColor: "lightyellow" }}>
        Scraped Indicators
        <Lifecycle />
        <Myd3 />
      </div>
    </div>
  );
}

export default App;

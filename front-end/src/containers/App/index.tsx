import React from "react";
import "./App.css";

import Content from "../../components/Content";
import Navigation from "../../components/Navigation";

function App() {
  return (
    <div className="App">
      <main>
        <Navigation />
        <Content />
      </main>
    </div>
  );
}

export default App;

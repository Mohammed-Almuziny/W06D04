import { Routes, Route } from "react-router";
import "./App.css";

import { Header } from "./components/Header";
import { Home } from "./components/Home";
import { SginIn } from "./components/SginIn";
import { LogIN } from "./components/LogIn";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sginin" element={<SginIn />} />
        <Route path="/login" element={<LogIN />} />
      </Routes>
    </div>
  );
}

export default App;

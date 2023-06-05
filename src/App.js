import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Authentication from "./pages/AuthenticationPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Authentication />} />
    </Routes>
  );
}

export default App;

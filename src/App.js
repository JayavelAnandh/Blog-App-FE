import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Authentication from "./pages/AuthenticationPage";
import BlogsPage from "./pages/BlogsPage";
import DashBoard from "./components/DashBoard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Authentication />} />
      <Route
        path="/homepage"
        element={
          <DashBoard>
            <BlogsPage />
          </DashBoard>
        }
      />
    </Routes>
  );
}

export default App;

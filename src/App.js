import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Authentication from "./pages/AuthenticationPage";
import BlogsPage from "./pages/BlogsPage";
import DashBoard from "./components/DashBoard";
import CreateBlog from "./pages/CreateBlog";
import ReadBlog from "./pages/ReadBlog";

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
      <Route
        path="/createBlog"
        element={
          <DashBoard>
            <CreateBlog />
          </DashBoard>
        }
      />
      <Route
        path="/viewBlog"
        element={
          <DashBoard>
            <ReadBlog />
          </DashBoard>
        }
      />
    </Routes>
  );
}

export default App;

import React from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "../cssFiles/DashBoard.css";

const DashBoard = ({ children }) => {
  const navigate = useNavigate();
  const logoutMethod = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("AuthToken");
    navigate("/");
    swal("Logged out", "", "success");
  };
  return (
    <div>
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">Bee-Blogs 🐝</div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className="nav-links">
          <ul>
            <li>
              <button
                className="btn btn-outline-info"
                onClick={() => navigate("/homepage")}
              >
                Home
              </button>
            </li>
            ||
            <li>
              <button
                className="btn btn-outline-info"
                onClick={() => navigate("/createBlog")}
              >
                Create Blog
              </button>
            </li>
            ||
            <li>
              <button className="btn btn-outline-info">My Blogs</button>
            </li>
            ||
            <li>
              <button
                className="btn btn-outline-info"
                onClick={() => logoutMethod()}
              >
                Logout
              </button>
            </li>
            {/* ||
          <li>
            <a  >
              Contact Us
            </a>
          </li> */}
          </ul>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashBoard;

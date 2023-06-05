import React from "react";
import "../cssFiles/DashBoard.css";

const DashBoard = ({ children }) => {
  return (
    <div>
      <div class="nav">
        <input type="checkbox" id="nav-check" />
        <div class="nav-header">
          <div class="nav-title">Bee-Blogs 🐝</div>
        </div>
        <div class="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div class="nav-links">
          <ul>
            <li>
              <button className="btn btn-outline-info">Home</button>
            </li>
            ||
            <li>
              <button className="btn btn-outline-info">Create Blog</button>
            </li>
            ||
            <li>
              <button className="btn btn-outline-info">My Blogs</button>
            </li>
            ||
            <li>
              <button className="btn btn-outline-info">Logout</button>
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

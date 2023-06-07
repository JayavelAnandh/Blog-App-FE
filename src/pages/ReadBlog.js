import React from "react";
import { useLocation } from "react-router-dom";
import "../cssFiles/ReadBlog.css";
const ReadBlog = () => {
  const location = useLocation();
  const utcTimestamp = location.state.createdAt;
  const date = new Date(utcTimestamp);

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const localTime = date.toLocaleDateString(undefined, options);
  return (
    <div className="container-fluid readBlogPage">
      <div className="content">
        <div className="justifyCenter ">
          <img src={location.state.pic} alt="" />
        </div>
        <div className="justifyCenter title "> {location.state.title}</div>
        <div className="details">
          <p>Author : {location.state.userName}</p>
          <p>{localTime}</p>
        </div>
        <div className="justifyCenter  description">
          <p>{location.state.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ReadBlog;

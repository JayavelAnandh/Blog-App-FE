import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "../cssFiles/BlogsPage.css";
const BlogsPage = () => {
  const userName = JSON.parse(localStorage.getItem("userDetails")).userName;
  const [blogs, setBlogs] = useState([]);
  const [btn, setBtn] = useState(false);
  const [search, setSearch] = useState("");
  const [searchBtn, setSearchBtn] = useState(false);

  const navigate = useNavigate();
  const retriveAllBlogs = async () => {
    let query;
    if (search) {
      query = `?userName=${search}`;
    }
    if (btn) {
      query = `?userName=${userName}`;
    } else {
      query = "/";
    }
    try {
      let res = await fetch(`http://localhost:5005/blog${query}`, {
        method: "GET",
      });
      let response = await res.json();
      setBlogs(response);
      console.log("sucess");
    } catch (error) {
      console.log(error);
      swal({
        title: "Error Fetching Blogs",
        icon: "warning",
        dangerMode: true,
      });
    }
  };
  useEffect(() => {
    retriveAllBlogs();
  }, []);
  useEffect(() => {
    retriveAllBlogs();
  }, [btn]);
  return (
    <div className="container-fluid BlogsPage">
      <div className="btnPlacement">
        <div className="searchAuthor">
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search By Author"
          />
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={() => {
              setBtn(false);
              retriveAllBlogs();
            }}
          >
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
        <button
          className="btn"
          onClick={() => {
            setBtn(!btn);
            setSearch("");
          }}
          style={{ backgroundColor: btn ? "green" : "skyblue" }}
        >
          {btn ? "My Blogs" : "All Blogs"}
        </button>
      </div>
      <div className="row ">
        {blogs.map((value, idx) => {
          const utcTimestamp = value.createdAt;
          const date = new Date(utcTimestamp);

          const options = {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          };

          const localTime = date.toLocaleDateString(undefined, options);
          return (
            <div
              key={idx}
              className="col-lg-4 col-md-6 col-sm-12 blogsMapped"
              onClick={() => navigate("/viewBlog", { state: value })}
            >
              <div className="imageHolder">
                <img src={value.pic} alt="" />
              </div>
              <div className="imageHolder">
                <p className="title">{value.title}</p>
              </div>
              <div className="imageHolder">
                <p className="time">
                  <span>{localTime}</span>
                </p>
              </div>

              <div className="imageHolder descriptionBox">
                <p className="description">{value.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogsPage;

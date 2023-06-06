import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import "../cssFiles/BlogsPage.css";
const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  const retriveAllBlogs = async () => {
    try {
      let res = await fetch("http://localhost:5005/blog", {
        method: "GET",
      });
      let response = await res.json();
      setBlogs(response);
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
  return (
    <div className="container-fluid BlogsPage">
      <div className="row">
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
            <div key={idx} className="col-lg-4 col-md-6 col-sm-12 blogsMapped">
              <div className="imageHolder">
                <img src={value.pic} alt="" />
              </div>
              <div className="imageHolder">
                <p className="title">{value.title}</p>
              </div>
              <div className="imageHolder">
                <p className="time">
                  <div>{localTime}</div>
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

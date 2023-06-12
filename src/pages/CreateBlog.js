import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "../cssFiles/CreateBlog.css";
const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pic, setPic] = useState();
  const [width, setWidth] = useState(window.innerWidth);
  const token = localStorage.getItem("AuthToken");
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const postDetails = (img) => {
    if (img === undefined) {
      return swal({
        title: "Please Select an Image in JPEG or PNG format!",
        icon: "warning",
        dangerMode: true,
      });
    }

    if (img.type == "image/jpeg" || img.type == "image/png") {
      let data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "Blog-App");
      data.append("cloud_name", "dds8bfdsd");

      fetch("https://api.cloudinary.com/v1_1/dds8bfdsd/image/upload", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((response) => {
          setPic(response.url.toString());

          //console.log(response.url.toString());
        })
        .catch((err) => {
          swal(err);
          console.log(err);
        });
    } else {
      return swal({
        title: "Please Select an Image in JPEG or PNG format!",
        icon: "warning",
        dangerMode: true,
      });
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      let res = await fetch("https://chronicles.onrender.com/blog/new", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userDetails.userName,
          title,
          description,
          pic,
        }),
      });
      let response = await res.json();
      console.log(response);
      swal("Blog Uploaded SuccessFully");
      navigate("/homepage");
    } catch (error) {
      console.log(error);
      swal("Error Uploading a blog");
    }
    setLoading(false);
  };
  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResizeWindow);
    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  return (
    <div className="container-fluid fullCBpage">
      <div className="container-xl createBlogPage">
        {loading ? (
          <iframe
            src="https://embed.lottiefiles.com/animation/94994"
            style={{ height: "100%", width: "100%" }}
          ></iframe>
        ) : (
          <>
            <div className="imgDiv">
              {pic && <img className="writeImg" src={pic} alt="" />}
            </div>
            <form>
              <span>
                <label htmlFor="pic" className="imageLabel">
                  {!pic ? (
                    <>
                      <i
                        className="fa-solid fa-plus"
                        style={{ marginRight: "3px" }}
                      ></i>{" "}
                      Share your memories !
                    </>
                  ) : (
                    <>
                      <i
                        className="fa-solid fa-repeat"
                        style={{ marginRight: "8px" }}
                      ></i>
                      Replace the photo
                    </>
                  )}
                </label>
              </span>
              <input
                type="file"
                id="pic"
                name="pic"
                accept="image/*"
                onChange={(event) => postDetails(event.target.files[0])}
                required
                style={{ display: "none" }}
              />
              <div className="titleInput">
                <label htmlFor="title">Title</label>
                <div>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Title"
                    className="writeInput"
                    autoFocus={true}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                  <button
                    className="writeSubmit btn btn-outline-info"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                  >
                    {width > 800 ? (
                      "Publish"
                    ) : (
                      <i className="fa-solid fa-upload"></i>
                    )}
                  </button>
                </div>
              </div>

              <textarea
                placeholder="Share Your Story ..."
                value={description}
                className="writeInput writeText"
                onChange={(event) => {
                  setDescription(event.target.value);
                  console.log(description);
                  console.log(typeof description);
                }}
              />
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateBlog;

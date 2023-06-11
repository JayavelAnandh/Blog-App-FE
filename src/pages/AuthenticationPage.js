import { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import "../cssFiles/Authentication.css";

const Authentication = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loginTrue, setLoginTrue] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const res = await fetch("http://localhost:5005/user/login", {
        method: "POST",
        body: JSON.stringify({
          gmail: email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      localStorage.setItem("userDetails", JSON.stringify(response.userDetails));
      localStorage.setItem("AuthToken", response.authToken);
      swal("Successfully Logged-In", "", "success");
      navigate("/homepage");
    } catch (error) {
      console.log(error);
      swal("Error occured Logging in");
    }
  };
  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("http://localhost:5005/user/signup", {
        method: "POST",
        body: JSON.stringify({
          userName,
          gmail: email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      localStorage.setItem("userDetails", JSON.stringify(response.userDetails));
      localStorage.setItem("AuthToken", response.authToken);
      swal("SuccessFully Signed-In", "", "success");
      navigate("/homepage");
    } catch (error) {
      swal("Error occured while sign-up");
    }
  };
  return (
    <div className="container-fluid loginPage">
      <div className="card col-lg-8">
        {loginTrue ? (
          <>
            <h1>Log-in...</h1>
            <form>
              <label htmlFor="gmail">Gmail</label>
              <input
                type="email"
                id="gmail"
                name="gmail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <br />

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type={show ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  style={{ width: "90%" }}
                />
                <button
                  type="button"
                  className="btn btn-outline-success"
                  style={{
                    width: "8%",
                    display: "inline-block",
                    height: "40px",
                    marginLeft: "1%",
                  }}
                  onClick={() => setShow(!show)}
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>
              <br />

              <div className="buttonAlign">
                <button
                  type="submit"
                  onClick={(event) => handleSubmit(event)}
                  className="buttons"
                >
                  Log in
                </button>
              </div>

              <div className="buttonAlign">
                <button
                  className="buttons"
                  type="button"
                  onClick={(event) => {
                    setEmail("JohnUser56@gmail.com");
                    setPassword("veronica123");
                  }}
                >
                  Guest user Credentials
                </button>
              </div>
            </form>
            <br />
            <p>
              Don't have an account?
              <span onClick={() => setLoginTrue(!loginTrue)}>
                {" "}
                Create account
              </span>
            </p>
            <p>
              More
              <a
                href="https://github.com/JayavelAnandh/VCS-FrontEnd#readme"
                style={{ color: "green", marginLeft: "7px" }}
              >
                Credentials
              </a>
            </p>
          </>
        ) : (
          <>
            <h1>Sign-up...</h1>
            <form>
              <label htmlFor="name">UserName</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userName}
                onChange={(event) => setUserName(event.target.value)}
              />
              <br />
              <label htmlFor="gmail">Gmail</label>
              <input
                type="email"
                id="gmail"
                name="gmail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <br />

              <div>
                <label htmlFor="password">Password</label>
                <input
                  type={show ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  style={{ width: "90%" }}
                />
                <button
                  type="button"
                  className="btn btn-outline-success"
                  style={{
                    width: "8%",
                    display: "inline-block",
                    height: "40px",
                    marginLeft: "1%",
                  }}
                  onClick={() => setShow(!show)}
                >
                  {show ? "Hide" : "Show"}
                </button>
              </div>
              <br />

              <div className="buttonAlign">
                <button
                  type="submit"
                  onClick={(event) => handleSignUp(event)}
                  className="buttons"
                >
                  Sign-In
                </button>
              </div>
            </form>
            <br />
            <p>
              Already have an Account
              <span onClick={() => setLoginTrue(!loginTrue)}> Login ?</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
export default Authentication;

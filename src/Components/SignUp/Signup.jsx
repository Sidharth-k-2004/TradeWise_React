import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handleOnSubmit(event) {
    event.preventDefault();
    fetch("https://localhost:8080/user", {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    navigate("/login");
    console.log("Form submitted");
  }

  return (
    <div
      className="container ps-0 d-flex justify-content-center align-items-center my-5  rounded-5 border-5 shadow"
      style={{ border: "5px solid #595DE7", height: "60vh" }}
    >
      <div
        className="text-white text-center pt-5 ms-0 align-ite rounded-5 d-none d-lg-block"
        style={{ backgroundColor: "#595DE7", height: "60vh", width: "40%" }}
      >
        <h1 className="display-2 fw-bold">Hello!!!</h1>
        <p className="fs-2 my-5 p-5" style={{ fontFamily: "Poppins" }}>
          Enter your personal details and start with us
        </p>
      </div>
      <div
        className="text-white text-center p-5 ms-5"
        style={{ height: "60vh", width: "60%" }}
      >
        <h1 className="display-2 " style={{ color: "#595DE7", width: "80%" }}>
          Create Account
        </h1>

        <form style={{ width: "80%" }} onSubmit={handleOnSubmit}>
          <div className="mb-3 my-5">
            <input
              type="email"
              className="form-control"
              style={{ backgroundColor: "#E0E7FF" }}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 my-4">
            <input
              type="password"
              className="form-control"
              style={{ backgroundColor: "#E0E7FF" }}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary w-100 my-5">Sign Up</button>

          <p className="fs-2 " style={{color:'black'}}>
            Already have an Account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

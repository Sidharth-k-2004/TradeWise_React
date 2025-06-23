import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Login() {
    const [email, setEmail] = useState("");    
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  function handleOnSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:8080/authenticate", {
      method: "POST",
      body: JSON.stringify({
        "email": email,
        "password": password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then((response) => {
    if (!response.ok) {
      throw new Error("Authentication failed");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data.userId); 
    
    localStorage.setItem("userId", data.userId); 
    navigate("/display");
  })
  .catch((error) => {
    console.error("Login error:", error);
    alert("Invalid credentials or server error.");
  });
    navigate("/display");
    console.log("Form submitted");
  }
    return(
        <div className="container ps-0 d-flex justify-content-center align-items-center my-5  rounded-5 border-5 shadow" style={{ border: "5px solid #595DE7", height: "60vh" }}>
      <div className="text-white text-center pt-5 ms-0 align-ite rounded-5 d-none d-lg-block" style={{ backgroundColor: "#595DE7", height:"60vh",width: "40%" }}>
        <h1 className="display-2 fw-bold">Hello!!!</h1>
        <p className="fs-2 my-5 p-5" style={{fontFamily:"Poppins"}}>Login using personal details</p>
      </div>
      <div className="text-white text-center p-5 ms-5" style={{height:"60vh", width: "60%" }}>
        <h1 className="display-2 " style={{ color: "#595DE7",width:"80%" }}>Login</h1>

        <form style={{width:"80%" }} onSubmit={handleOnSubmit}>
          <div className="mb-3 my-5" >
            <input
              type="email"
              className="form-control"
              style={{ backgroundColor: "#E0E7FF" }}
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
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
          </div >
          <button className="btn btn-primary w-100 my-5">Login</button>
          <p className="fs-4" style={{color:'black'}}>
            Dont have an Account? <Link to="/SignUp">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
    );
}
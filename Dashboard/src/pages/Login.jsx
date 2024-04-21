import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MyContext } from "../main";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo from "../assets/image.png";

function Login() {
  const { isAuthenticated, setIsAuthenticated } = useContext(MyContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleData = async (e) => {
    e.preventDefault();
    const userData = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: "Admin",
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        userData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setData({
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsAuthenticated(true);
      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error(error.response.data.message); // Change response to error.response
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <ToastContainer />
      <div className="shadow p-5">
        <img src={logo} alt="logo" className="logo-login" />
        <h3 className="form-title ">WELCOME TO KARANCARE</h3>
        <p className="text-black">
          Only Admins Are Allowed To Access These Resources!
        </p>

        <form className="mt-4" onSubmit={handleData}>
          <div className="form-group py-2">
            <label htmlFor="inputEmail">Email</label>
            <input
              type="email"
              className="form-control py-2"
              id="inputEmail"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group py-2">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              className="form-control py-2"
              id="inputPassword"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <div className="form-group py-2 py-2">
            <label htmlFor="confirmPassword">Confirm password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
          </div>

          <div className="form-group py-3 px-2 ">
            <button type="submit" className="btn btn-success btn-block">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

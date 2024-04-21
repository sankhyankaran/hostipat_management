import React, { useContext } from "react";
import { MyContext } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { isAuthenticated, setIsAuthenticated } = useContext(MyContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // console.log(data, "/////");

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };
  const handleData = async (e) => {
    e.preventDefault();
    const userData = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      role: "Patient",
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
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsAuthenticated(true);
      toast.success(res.data.message);
      navigate("/home");
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    navigate("/home");
    return null;
  }

  return (
    <div className="container mt-5 shadow">
      <ToastContainer />
      <div className="text-center">
        <h2>Sign In</h2>
        <p>Please Login To Continue</p>
      </div>
      <form className="shadow_form mt-4" onSubmit={handleData}>
        <div className="form-group col-md-4  my-2">
          <label htmlFor="inputEmail">Email</label>
          <input
            type="email"
            className="form-control  my-1"
            id="inputEmail"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
          />
        </div>
        <div className="form-group col-md-4  my-2">
          <label htmlFor="inputPassword">Password</label>
          <input
            type="password"
            className="form-control  my-1"
            id="inputPassword"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <div className="form-group col-md-4  my-2">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            className="form-control  my-1"
            id="confirmPassword"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
        </div>
        <p
          className="mx-5"
          htmlFor="invalidCheck2"
          style={{ fontSize: "10px" }}>
          Not Registered ?
          <Link
            to="/register"
            className="mx-1"
            style={{ textDecoration: "none" }}>
            Register Now
          </Link>
        </p>
        <div className="form-group col-md-4 mb-5">
          <button type="submit" className="btn btn-success px-5">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;

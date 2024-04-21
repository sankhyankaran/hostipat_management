import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MyContext } from "../main";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddNewAdmin() {
  const { isAuthenticated } = useContext(MyContext);
  const navigateTo = useNavigate();

  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setRegister({
      ...register,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      firstName: register.firstName,
      lastName: register.lastName,
      email: register.email,
      phone: register.phone,
      nic: register.nic,
      dob: register.dob,
      gender: register.gender,
      password: register.password,
      role: "Admin",
    };
    // Add your form submission logic here
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/admin/new",
        userData,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      setRegister({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        password: "",
      });
      navigateTo("/dashboard");
      toast.success("User is registerd");
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="container-fluid">
        <ToastContainer />
        <div className="text-center mt-3">
          <h2>Add New Admin</h2>
        </div>

        <form className="row g-3 px-5" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              id="firstName"
              value={register.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              className="form-control"
              id="lastName"
              value={register.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              value={register.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">
              Phone No.
            </label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              id="phone"
              value={register.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select
              value={register.gender}
              onChange={handleChange}
              name="gender"
              className="form-select">
              <option value="">Select Gender </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="col-md-6">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              className="form-control"
              name="dob"
              id="dob"
              value={register.dob}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="nic" className="form-label">
              NIC
            </label>
            <input
              type="text"
              name="nic"
              className="form-control"
              id="nic"
              value={register.nic}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={register.password}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 text-center py-3">
            <button type="submit" className="btn btn-primary px-5">
              Register
            </button>
          </div>
        </form>

        <div className="text-center mt-3 py-3">
          <p>
            Already Registered? <Link to="/login">Login Now</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default AddNewAdmin;

import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { MyContext } from "../main";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { render } from "react-dom";

function AddNewDoctor() {
  const { isAuthenticated, setIsAuthenticated } = useContext(MyContext);
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
    doctorDepartment: "",
    docAvatar: "",
  });

  // console.log(register);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [docAvatarPreview, setDocAvatarPreview] = useState("");
  const [docAvatar, setDocAvatar] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setRegister({
      ...register,
      [e.target.name]: value,
    });
  };

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("firstName", register.firstName);
      formData.append("lastName", register.lastName);
      formData.append("email", register.email);
      formData.append("phone", register.phone);
      formData.append("password", register.password);
      formData.append("nic", register.nic);
      formData.append("dob", register.dob);
      formData.append("gender", register.gender);
      formData.append("doctorDepartment", register.doctorDepartment);
      formData.append("docAvatar", docAvatar);
      const response = await axios.post(
        "http://localhost:4000/api/v1/user/doctor/addnew",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
      setRegister({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        nic: "",
        dob: "",
        gender: "",
        password: "",
        doctorDepartment: "",
        docAvatar: "",
      });
    } catch (error) {
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
          <h2>Registered A New Doctor</h2>
        </div>

        <form className="row g-3 px-5" onSubmit={handleSubmit}>
          <span className="mb-0">
            <img
              src={docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"}
              className="img-fluid px-5 image_doctor"
            />
            <input type="file" onChange={handleAvatar} className="px-2 py-2" />
          </span>
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

          <div className="col-md-6">
            <label htmlFor="doctorDepartment" className="form-label">
              Department
            </label>
            <select
              value={register.doctorDepartment}
              onChange={handleChange}
              name="doctorDepartment"
              className="form-select">
              <option value="">Select Department </option>
              {departmentsArray.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="col-12 text-center py-3">
            <button type="submit" className="btn btn-primary px-5">
              Add New Doctor
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

export default AddNewDoctor;

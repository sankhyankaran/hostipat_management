import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MyContext } from "../main";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import navbarLogo from "../assets/image.png";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success("Message sent successfully!");
        setIsAuthenticated(false);
        navigate("/home");
      })
      .catch((err) => {
        toast.error("Patient is not authnicated");
      });
  };

  const handleLogin = async () => {
    navigate("/login");
  };

  const { isAuthenticated, setIsAuthenticated } = useContext(MyContext);
  return (
    <>
      <div className="container-fluid">
        <ToastContainer />
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-0 border-bottom">
          <div className="col-md-3 mb-2 mb-md-0">
            <Link
              to="#"
              className="d-inline-flex link-body-emphasis text-decoration-none">
              <img
                className="bi"
                width="150"
                height="32"
                src={navbarLogo}></img>
            </Link>
          </div>

          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 ">
            <li>
              <Link to="/home" className="nav-link px-2 text-black navbar_head">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/appointment"
                className="nav-link px-2 text-black navbar_head">
                Appointment
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="nav-link px-2 text-black navbar_head">
                About Us
              </Link>
            </li>
          </ul>

          <div className="col-md-3 text-end">
            {isAuthenticated ? (
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={handleLogout}>
                LOGOUT
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-dark "
                onClick={handleLogin}>
                LOGIN
              </button>
            )}
          </div>
        </header>
      </div>
    </>
  );
}

export default Navbar;

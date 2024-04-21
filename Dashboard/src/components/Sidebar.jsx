import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyContext } from "../main";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(MyContext);

  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/admin/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error("User is Not Authenticated");
      });
  };

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/deshboard");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigateTo("/doctor");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigateTo("/message");
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigateTo("doctor/addnew");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };

  return (
    <>
      <div
        className={`d-flex flex-column flex-shrink-0 p-3 text-white bg-dark ${
          show ? "show" : "sidebar"
        }`}
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}>
        <Link
          to="#"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <svg className="bi me-2" width="40" height="32">
            <use xlinkHref="#bootstrap"></use>
          </svg>
          <TiHome
            onClick={gotoHomePage}
            style={{ fontSize: "30px", marginTop: "30px" }}
          />
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item" key="home">
            <Link to="#" className="nav-link text-white " aria-current="page">
              <svg className="bi me-2" width="16" height="16">
                <use xlinkHref="#home"></use>
              </svg>
              <FaUserDoctor
                onClick={gotoDoctorsPage}
                style={{ fontSize: "30px", marginTop: "20px" }}
              />
            </Link>
          </li>
          <li key="dashboard">
            <Link to="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16">
                <use xlinkHref="#speedometer2"></use>
              </svg>
              <MdAddModerator
                onClick={gotoAddNewAdmin}
                style={{ fontSize: "30px", marginTop: "20px" }}
              />
            </Link>
          </li>
          <li key="orders">
            <Link to="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16">
                <use xlinkHref="#table"></use>
              </svg>
              <IoPersonAddSharp
                onClick={gotoAddNewDoctor}
                style={{ fontSize: "30px", marginTop: "20px" }}
              />
            </Link>
          </li>
          <li key="products">
            <Link to="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16">
                <use xlinkHref="#grid"></use>
              </svg>
              <AiFillMessage
                onClick={gotoMessagesPage}
                style={{ fontSize: "30px", marginTop: "20px" }}
              />
            </Link>
          </li>
          <li key="customers">
            <Link to="#" className="nav-link text-white">
              <svg className="bi me-2" width="16" height="16">
                <use xlinkHref="#people-circle"></use>
              </svg>
              <RiLogoutBoxFill
                onClick={handleLogout}
                style={{ fontSize: "30px", marginTop: "20px" }}
              />
            </Link>
          </li>
        </ul>
      </div>
      <ToastContainer />
    </>
  );
};

export default Sidebar;

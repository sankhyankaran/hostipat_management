import React from "react";
import { Link } from "react-router-dom";
import footerlogo from "../assets/footerlogo.png";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
function Footer() {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Monday",
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ];

  return (
    <>
      <div className="container-fluid">
        <footer className="row py-5 mx-3 d-flex justify-content-between border-top">
          <div className="col-lg-2 col-md-3 col-sm-3">
            <Link
              to="#"
              className="d-inline-flex link-body-emphasis text-decoration-none">
              <img
                className="bi"
                width="150"
                height="32"
                src={footerlogo}></img>
            </Link>
            <p className="text-muted">© 2024</p>
          </div>

          <div className="col-lg-2 col-md-3 col-sm-3">
            <h3 className="footer_heading">Quick Links</h3>
            <ul className="nav flex-column ">
              <li className="nav-item ">
                <Link to="/home" className="nav-link p-0 text-black ">
                  Home
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/appointment" className="nav-link p-0 text-black ">
                  Appointment
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/about" className="nav-link p-0 text-black">
                  About Us
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/login" className="nav-link p-0 text-black">
                  Login
                </Link>
              </li>
              <li className="nav-item ">
                <Link to="/register" className="nav-link p-0 text-black ">
                  Register
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-lg-2 col-md-3 col-sm-3 item-center">
            <h3 className="footer_heading">Hours</h3>
            <ul className="nav flex-column">
              {hours.map((item) => (
                <li className="nav-item" key={item.id}>
                  <span>{item.day}</span>
                  <span className="px-2">{item.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-4 col-md-3 col-sm-3">
            <h3 className="footer_heading">Contact Us</h3>
            <div>
              <FaPhoneAlt />
              <span className="px-2">9805497036</span>
            </div>
            <div>
              <MdOutlineMail />
              <span className="px-2">karansrma2003@gmail.com</span>
            </div>
            <div>
              <IoLocation />
              <span className="px-2">Lohani, Barser</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;

import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MessageForm() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // console.log(data);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      message: data.message,
    };
    axios
      .post("http://localhost:4000/api/v1/message/send", userData)
      .then((response) => {
        console.log(response.status, response.data);
        setData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
        toast.success("Message sent successfully!");
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        toast.warning("Please fill full detail");
      });
  };

  return (
    <>
      <div className="container p-5">
        <ToastContainer />
        <h2 className="text-center py-5 ">Send Us A Message</h2>
        <form className="row g-3 shadow p-5" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label htmlFor="firtName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              className="form-control"
              id="firtName"
              value={data.firstName}
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
              value={data.lastName}
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
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">
              Phone No.
            </label>
            <input
              type="number"
              className="form-control"
              name="phone"
              id="phone"
              value={data.phone}
              onChange={handleChange}
            />
          </div>
          <div className="col-12">
            <textarea
              rows={7}
              placeholder="Message"
              name="message"
              value={data.message}
              onChange={handleChange}
              className="form-control"></textarea>
          </div>
          <div
            className="col-12"
            style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit" className="btn btn-success px-5">
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default MessageForm;

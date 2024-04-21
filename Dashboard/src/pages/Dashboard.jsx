import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const { isAuthenticated, user } = useContext(MyContext);
  const [appointments, setAppointments] = useState([]);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
        console.log(data.appointments);
      } catch (error) {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <div className="row mx-5 my-5">
        <ToastContainer />
        <div className="col-lg-6 col-md-4 col-sm-4">
          <div class="card border shadow">
            <img class="card-img-top" src="/doc.png" alt="Card image cap" />
            <div class="card-body">
              <p>Hello</p>
              <h2>{user && `${user.firstName}   ${user.lastName}`}</h2>
              <p class="card-text">
                Cairns Doctors does a fantastic job of announcing their new team
                members on social media. Their image above is simple. It has a
                picture of the doctor, introduces their background, and prompts
                the reader to schedule an appointment with them.
              </p>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3">
          <div className="card shadow">
            <div class="card-body">
              <p>Total Appointments</p>
              <h3>10</h3>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-3">
          <div className="card shadow">
            <div class="card-body">
              <p>Registered Doctor</p>
              <h3>10</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="my-1 mx-3">
        <h5 className="text-center my-3">Appointments</h5>
        <table class="table border shadow">
          <thead>
            <tr>
              <th scope="col">Patient</th>
              <th scope="col">Date</th>
              <th scope="col">Doctor</th>
              <th scope="col">Department</th>
              <th scope="col">Status</th>
              <th scope="col">Visited</th>
            </tr>
          </thead>
          <tbody>
            {appointments && appointments.length > 0
              ? appointments.map((appointment, index) => {
                  console.log(appointment, "+++");
                  return (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>{appointment.appointment_date.substring(0, 16)}</td>
                      <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td>{appointment.department}</td>
                      <td>
                        <select
                          className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }>
                          <option
                            value="Pending"
                            className="value-pending text-danger">
                            Pending
                          </option>
                          <option
                            value="Accepted"
                            className="value-accepted text-success">
                            Accepted
                          </option>
                          <option
                            value="Rejected"
                            className="value-rejected text-info">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>
                        {appointment.hasVisited === true ? (
                          <GoCheckCircleFill className="green" />
                        ) : (
                          <AiFillCloseCircle className="red" />
                        )}
                      </td>
                    </tr>
                  );
                })
              : "No Appointments"}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;

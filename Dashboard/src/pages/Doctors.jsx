import React, { useContext, useEffect, useState } from "react";
import { MyContext } from "../main";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(MyContext);

  // console.log(doctors);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          {
            withCredentials: true,
          }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctor();
  }, []);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <div>
      <h2 className="text-center my-4">Doctors</h2>
      <ToastContainer />
      <div className="row mx-2">
        {doctors && doctors.length > 0 ? (
          doctors.map((items, index) => {
            return (
              <div className="col-sm-2 col-lg-4 px-3 my-2" key={index}>
                <div className="card p-2">
                  <img
                    className="card-img-top"
                    src={items.docAvatar && items.docAvatar.url}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h4 className="card-title">{`${items.firstName} ${items.lastName}`}</h4>
                    <p className="card-text">
                      Email:<span className="px-2">{items.email}</span>
                    </p>
                    <p className="card-text">
                      Phone:<span className="px-2">{items.phone}</span>
                    </p>
                    <p className="card-text">
                      DOB:
                      <span className="px-2">{items.dob.substring(0, 10)}</span>
                    </p>

                    <p className="card-text">
                      Department:
                      <span className="px-2">{items.doctorDepartment}</span>
                    </p>
                    <p className="card-text">
                      Gender:<span className="px-2">{items.gender}</span>
                    </p>
                    <p className="card-text">
                      Nic:<span className="px-2">{items.nic}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2>No Registered DoctorsFound</h2>
        )}
      </div>
    </div>
  );
}

export default Doctors;

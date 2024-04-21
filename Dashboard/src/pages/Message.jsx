import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { MyContext } from "../main";

function Message() {
  const [data, setData] = useState([]);

  const { isAuthenticated } = useContext(MyContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/message/getall"
        );
        setData(response.data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div>
        <h2 className="text-center my-2">Messages</h2>
        <div className="row mx-2">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div className="col-sm-2 col-lg-4 px-3 my-2" key={index}>
                <div className="card p-3">
                  <p>
                    First Name: <span>{item.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{item.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{item.email}</span>
                  </p>
                  <p>
                    Phone: <span>{item.phone}</span>
                  </p>
                  <p>
                    Message: <span>{item.message}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center my-2">No Messages!</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Message;

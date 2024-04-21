import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./src/components/Sidebar";
import Side from "./src/components/Side";

function Roots() {
  return (
    <>
      <div className="d-flex justify-content-between">
        <div className="col-lg-2">
          <Sidebar />
        </div>
        <div className="col-lg-10 data_1">
          <Outlet />
        </div>
        {/* <Side /> */}
      </div>
    </>
  );
}

export default Roots;

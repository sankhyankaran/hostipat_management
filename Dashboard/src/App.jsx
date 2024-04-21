import React, { useContext, useEffect } from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddNewAdmin from "./pages/AddNewAdmin";
import AddNewDoctor from "./pages/AddNewDoctor";
import Doctors from "./pages/Doctors";
import Message from "./pages/Message";
import Login from "./pages/Login";
import Roots from "../Roots";
import { MyContext } from "./main";
import axios from "axios";
function App() {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(MyContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/detail",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [isAuthenticated]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Roots />,
      children: [
        {
          path: "/deshboard",
          element: <Dashboard />,
        },
        {
          path: "admin/addnew",
          element: <AddNewAdmin />,
        },
        {
          path: "doctor/addnew",
          element: <AddNewDoctor />,
        },
        {
          path: "doctor",
          element: <Doctors />,
        },
        {
          path: "message",
          element: <Message />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

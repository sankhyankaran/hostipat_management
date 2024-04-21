import React, { createContext, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

export const MyContext = createContext({ isAuthenticated: false });

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <React.StrictMode>
      <MyContext.Provider
        value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
        <App />
      </MyContext.Provider>
    </React.StrictMode>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(<Root />);

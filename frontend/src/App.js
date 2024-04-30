import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeAdmin from "./HomeAdmin";
import HomeUser from "./HomeUser";
import HomeVigilante from "./HomeVigilante";
import HomeBombero from "./HomeBombero";
import Login from "./login.js";

const App = () => {
  const [userRole, setUserRole] = useState("");

  const renderHome = () => {
    switch (userRole) {
      case "administrador":
        return <HomeAdmin />;
      case "usuario":
        return <HomeUser />;
      case "vigilante":
        return <HomeVigilante />;
      case "bombero":
        return <HomeBombero />;
      default:
        return <Navigate to="/" />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserRole={setUserRole} />} />
        <Route
          path="/home"
          element={userRole ? renderHome() : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;

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
import Login from "./login";

const App = () => {
  const [userRole, setUserRole] = useState("");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUserRole={setUserRole} />} />
        <Route
          path="/home"
          element={
            userRole ? renderHome(userRole) : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
};

const renderHome = (userRole) => {
  switch (userRole) {
    case "admin":
      return <HomeAdmin />;
    case "usuario":
      return <HomeUser />;
    case "vigilante":
      return <HomeVigilante />;
    case "bombero":
      return <HomeBombero />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default App;

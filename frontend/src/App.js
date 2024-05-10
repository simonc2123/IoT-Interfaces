import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomeAdmin from "./HomeAdmin";
import HomeUser from "./HomeUser";
import Login from "./login";

const App = () => {
  const [userRole, setUserRole] = useState("");
  const [userHome, setUserHome] = useState("");

  const renderHome = () => {
    switch (userRole) {
      case "admin":
        return <HomeAdmin/>;
      case "usuario":
        return <HomeUser userHome={userHome} />;
      default:
        return <Navigate to="/" replace />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Login setUserRole={setUserRole} setUserHome={setUserHome} />
          }
        />
        <Route
          path="/home"
          element={userRole ? renderHome() : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;

// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./style.css";
import HomePage from "./HomePage";
import InvitationModal from './InvitationModal'; // Import the Invitation Modal component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
    // App.js should now only have the HomePage route
    <Router>
      <Routes>
        <Route
          path="/"
          element={<HomePage isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
        />
        {/* InvitationModal route should be removed */}
      </Routes>
    </Router>
  );
};

export default App;
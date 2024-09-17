//app.jsx
import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { Users } from "./components/users";
import { AddUser } from "./components/addUser";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team";
import { Contact } from "./components/contact";
import { Clinics } from "./components/clinics";
import { AddClinic } from "./components/addClinic";
import { Doctors } from "./components/doctors";
import { AddDoctor } from "./components/addDoctors";
import { Patients } from "./components/patients";
import { AddPatient } from "./components/addPatient";
import { Appointments } from "./components/appoitments";
import { AddAppointment } from "./components/addAppoitment";
import { UserLogin } from "./components/login";  // Import the Login component
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";// Import the Login component
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Manage login stat
  const [userName, setUserName] = useState(""); // State to hold the user's name
  const [userToEdit, setUserToEdit] = useState(null);
  const [usersListUpdated, setUsersListUpdated] = useState(false); // Track updates to user list

  // alert(userName);
  
  useEffect(() => {
    setLandingPageData(JsonData);
    
  }, []);

  const handleLogin = (name) => {
    setIsAuthenticated(true); // Set login state to true after successful login
    setUserName(name); // Set the user's name upon successful login
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName(""); // Clear the user's name on logout
  };
const handleEditUser = (user) => {
  setUserToEdit(user);
};

const handleClearUser = () => {
  setUserToEdit(null);
};
  // Function to trigger re-fetching users after add/edit
  const refreshUsersList = () => {
    setUsersListUpdated(!usersListUpdated); // Toggle the state to force re-fetch in Users component
  };
  return (
    <Router>
    <Routes>
      {!isAuthenticated ? (
        // Show login page when not authenticated
        <Route path="/" element={<UserLogin onLogin={handleLogin}  />} /> 
        // 
      ) : (
        // Redirect to homepage after login
        <Route path="*" element={<Navigate to="/" />} />
      )}

      {/* Main app pages only accessible after login */}
      {isAuthenticated && (
      <Route
        path="/"
        element={
          <>
            <Navigation userName={userName}  onLogout={handleLogout}  /> {/* Pass userName to Navigation */} {/* Pass handleLogout */}
            <Header data={landingPageData.Header} />
            <Users onEditUser={handleEditUser} refreshTrigger={usersListUpdated} />
            <AddUser userToEdit={userToEdit} clearUser={handleClearUser} onUserChange={refreshUsersList}/>
            <About data={landingPageData.About} />
            <Clinics data={landingPageData.Users} />
            <AddClinic data={landingPageData.Users} />
            <Doctors data={landingPageData.Users} />
            <AddDoctor data={landingPageData.Users} />
            <Patients data={landingPageData.Users} />
            <AddPatient data={landingPageData.Users} />
            <Appointments data={landingPageData.Users} />
            <AddAppointment data={landingPageData.Users} />
            <Contact data={landingPageData.Contact} />
          </>
        } 
      /> 
      )}
    </Routes>
  </Router>
  );
};

export default App;

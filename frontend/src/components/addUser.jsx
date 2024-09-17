// adduser.jsx
import React, { useState, useEffect }from "react";

export const AddUser = ({ userToEdit, clearUser, onUserChange }) => {

  // State variables to store form inputs and error messages
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("doctor");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


 // Reset form fields when userToEdit changes (i.e., when editing a user)
 useEffect(() => {
  if (userToEdit) {
    setUsername(userToEdit.username || "");
    setPassword(""); // Do not pre-fill the password for security reasons
    setType(userToEdit.type || "doctor");
  } else {
    // Clear form fields when adding a new user
    setUsername("");
    setPassword("");
    setType("doctor");
  }
}, [userToEdit]);


// Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = userToEdit ? userToEdit.id : null;
      const url = userId ? `/users/${userId}` : '/users';
      const method = userId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token in Authorization header
        },
        body: JSON.stringify({ username, password, type }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message || "User saved successfully");
        clearUser(); // Clear user details after successful save
        // Clear form fields
        setUsername("");
        setPassword("");
        setType("doctor");
        onUserChange(); // Trigger user list refresh
        document.querySelector("#users").scrollIntoView({ behavior: "smooth" }); // Smooth scroll to users

    
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to save user");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
  return (
    <div id="addUser" class="text-center">
        <div className="container">
          <div className="col-md-12">
            <div className="row">
              <form name="saveUser" onSubmit={handleSubmit}>
              <div className="row">
                    <div className="section-title">
                        <h2> User</h2>
                        <h2> add / change user data</h2>
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        className="form-control"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <select 
                            name="type"
                            id="type"
                            className="form-control"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            rows="4"
                            required
                            >
                                <option value='doctor'>Doctor</option>
                                <option value='reception'>Reception</option>
                            </select>
            
                        <p className="help-block text-danger"></p>
                        </div>
                    </div>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                {userToEdit ? "Update" : "Save"} {/* Update button text */}
                </button>
              </form>
            </div>
          </div>
        </div>
      <div id="footer">
      </div>
    </div>
  );
};

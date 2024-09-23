// adduser.jsx
import React, { useState, useEffect }from "react";

export const AddUser = ({ userToEdit, clearUser, onUserChange }) => {

  // State variables to store form inputs and error messages
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  // const [oldPass, setOldPass] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [type, setType] = useState("doctor");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


 // Reset form fields when userToEdit changes (i.e., when editing a user)
 useEffect(() => {
  if (userToEdit) {
    setUsername(userToEdit.username || "");
    setPassword(""); // Do not pre-fill the password for security reasons
    setOldPassword("");
    // setOldPass("");
    setNewPassword("");
    setType(userToEdit.type || "doctor");
  } else {
    // Clear form fields when adding a new user
    setUsername("");
    setPassword("");
    setType("doctor");
  }
}, [userToEdit]);

// handlePasswordChange
const handlePasswordChange = (e) => {
  setPassword(e.target.value);

  // Check if retype password matches the newPassword
  if (userToEdit && newPassword && e.target.value !== newPassword) {
    setError("Passwords do not match!");
  } else {
    setError(""); // Clear error if passwords match
  }
};

// handleRetypePasswordChange
const handleRetypePasswordChange = (e) => {
  setNewPassword(e.target.value);

  // Check if retype password matches the password
  if (userToEdit && password && e.target.value !== password) {
    setError("Passwords do not match!");
  } else {
    setError(""); // Clear error if passwords match
  }
};
// Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = userToEdit ? userToEdit.id : null;
      const url = userId ? `/users/${userId}` : '/users';
      const method = userId ? "PUT" : "POST";
      // Check if passwords match
      // if (userId && password !== newPassword) {
      //   setError("Passwords do not match!");
      // } else {
      //   setError(""); // Clear the error if passwords match
      //   // Proceed with form submission (e.g., send data to API)
      //   console.log("Form submitted with Password:", password);
      // }
      var response;
      if(method == "PUT")
      {//edit
        if(newPassword == password)
        {
          response = await fetch(url, {
            method,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token in Authorization header
            },
            body: JSON.stringify({ username, password, type ,oldPassword }),
          });
          setError("");
        }else{
          response = null;
          setError("Check password")
        }
      }
      else
      {//add
        response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token in Authorization header
          },
          body: JSON.stringify({ username, password, type }),
        });
      }

      if (response && response.ok ) {
        try{
          const result = await response.json();
          setSuccess(result.message || "User saved successfully");
          clearUser(); // Clear user details after successful save
          // Clear form fields
          setUsername("");
          setPassword("");
          setType("doctor");
          onUserChange(); // Trigger user list refresh
          document.querySelector("#users").scrollIntoView({ behavior: "smooth" }); // Smooth scroll to users
        }catch (error) {
          console.log(error)
          setError("Wrong Data");
        }
    
      } else {
        if(response)
        {
          const errorData = await response.json();
          setError(errorData.message || "Failed to save user");
        }
      }
    } catch (error) {
      console.log(error)
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
                {userToEdit ? <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        value={oldPassword}
                        onChange={(e)=> setOldPassword(e.target.value)}
                        className="form-control"
                        placeholder="Old Password"
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div> : ''}
                
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        // onChange={(e)=> setPassword(e.target.value)}
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                {userToEdit ? <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={newPassword}
                        // onChange={(e)=> setNewPassword(e.target.value)}
                        onChange={handleRetypePasswordChange}
                        className="form-control"
                        placeholder="New Password"
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div> : ""}
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
                {userToEdit && error && error != "" ? <p style={{ color: "red" }}>{error}</p>:""}
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

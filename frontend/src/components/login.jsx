import React, { useState } from "react";

export const UserLogin = ({onLogin}) => {

    // State variables to store user input
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State for error messages

    // Handle form submission
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
             // Make a POST request to the login API
      const response = await fetch("/login", {
        method :"POST",
        headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),

      });
      if (response.ok) {
                const result = await response.json();
                localStorage.setItem("token", result); // Store token in localStorage
                // Handle successful login, e.g., redirect or save token
                onLogin(username); // Call the onLogin callback to update authentication status
            }
            else {
                const errorData = await response.json();
                setError(errorData.message || "Login failed"); // Set error message
            }
            
        } catch (error) {
            // alert("Error during login:", error);
            setError("An error occurred. Please try again.");
            
        }
    
    }

  return (
    <div id="login" className="text-center">
        <div className="container">
          <div className="col-md-12">
            <div className="row">
              <form onSubmit={handleSubmit}>
              <div className="row">
                    <div className="section-title">
                        <h2> Clinic Reservation Login</h2>
                        <h2> Start Your Organized Day </h2>
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
                        onChange={(e) => setUsername(e.target.value)} 
                        className="form-control"
                        placeholder="Username"
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
                        onChange={(e) => setPassword(e.target.value)} 
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Login
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
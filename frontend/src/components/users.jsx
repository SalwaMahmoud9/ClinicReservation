//users.jsx
import React from "react";
import { useEffect, useState } from "react";

// Table Component
export const Users = ({ onEditUser, refreshTrigger }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [selectedUser, setSelectedUser] = useState(null); // State for showing user details


    useEffect(()=>{
    // Fetch all users
    const fetchUsers = async () => {
        try {
        const response = await fetch('/users', {
            headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token in Authorization header
            },
        });
        if (response.ok) {
            const data = await response.json();
            setUsers(data);
        } else {
            const errorData = await response.json();
            setError(errorData.message || "Failed to fetch users");
        }
        } catch (error) {
        setError("An error occurred. Please try again.");
        }
    };
    fetchUsers();

      }, [refreshTrigger])
    // Handle show user details
    const handleShow = (user) => {
        onEditUser(user); // Pass the selected user to the parent for editing
        document.querySelector("#addUser").scrollIntoView({ behavior: "smooth" }); // Smooth scroll to AddUser form
    };
    const handleDeleteUser = async (id) => {
        try {
          const response = await fetch(`/users/${id}`, {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (response.ok) {
            setUsers(users.filter((user) => user.id !== id)); // Remove user from the list
          } else {
            setError("Failed to delete user");
          }
        } catch (error) {
          setError("An error occurred. Please try again.");
        }
      };
    return (
    <div id="users" class="text-center w-100 p-3">
        <div className="container">
            <div className="col-md-12">
                <div className="row">
                    <div className="section-title">
                        <h2>Users</h2>
                    </div>
                    <table class="table">
                        <thead>
                        <tr>
                            <th key='0'>User</th>
                            <th key='1'>Type</th>
                            <th key='2'></th>
                            <th key='3'></th>
                        </tr>
                        </thead>
                        <tbody>
                            {users.length > 0?users.map((user, index) => (
                                <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.type}</td>
                                <td> <a href="#addUser" className="btn btn-custom btn-lg page-scroll" onClick={() => handleShow(user)}>Show</a></td>
                                <td> <a className="btn btn-custom btn-lg page-scroll"  onClick={() => handleDeleteUser(user.id)}>Delete</a></td>
                                </tr>
                            )): "Loading..."}
                        </tbody>
                    </table>
                    <a href="#addUser" className="btn btn-custom btn-lg page-scroll" onClick={() => onEditUser(null)}>
                        Add User
                    </a>
                </div>
            </div>
        </div>
    </div>
    );
  };
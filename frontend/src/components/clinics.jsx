import React from "react";
import { useEffect, useState } from "react";

// Table Component
export const Clinics = ({ onEditClinic, refreshTrigger }) => {
    const [clinics, setClinics] = useState([]);
    const [error, setError] = useState("");
    const [selectedClinic, setSelectedClinic] = useState(null); // State for showing clinic details

    useEffect(()=>{
        // Fetch all clinics
        const fetchClinics = async () => {
            try {
            const response = await fetch('/clinics', {
                headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token in Authorization header
                },
            });
            if (response.ok) {
                const data = await response.json();
                setClinics(data);
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Failed to fetch clinics");
            }
            } catch (error) {
            setError("An error occurred. Please try again.");
            }
        };
        fetchClinics();
    
          }, [refreshTrigger])
        // Handle show clinic details
        const handleShow = (clinic) => {
            onEditClinic(clinic); // Pass the selected clinic to the parent for editing
            document.querySelector("#addClinic").scrollIntoView({ behavior: "smooth" }); // Smooth scroll to AddClinic form
        };
        const handleDeleteClinic = async (id) => {
            try {
              const response = await fetch(`/clinics/${id}`, {
                method: "DELETE",
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
              });
              if (response.ok) {
                setClinics(clinics.filter((clinic) => clinic.id !== id)); // Remove clinic from the list
              } else {
                setError("Failed to delete clinic");
              }
            } catch (error) {
              setError("An error occurred. Please try again.");
            }
          };


    
    return (
    <div id="clinics" class="text-center w-100 p-3">
        <div className="container">
            <div className="col-md-12">
                <div className="row">
                    <div className="section-title">
                        <h2>Clinics</h2>
                    </div>
                    <table class="table">
                        <thead>
                        <tr>
                            <th key='0'>Clinic</th>
                            <th key='1'>Address</th>
                            <th key='2'></th>
                            <th key='3'></th>
                        </tr>
                        </thead>
                        <tbody>
                            {clinics.length > 0?clinics.map((clinic, index) => (
                                <tr key={index}>
                                <td>{clinic.name}</td>
                                <td>{clinic.address}</td>
                                <td> <a href="#addClinic" className="btn btn-custom btn-lg page-scroll" onClick={() => handleShow(clinic)}>Show</a></td>
                                <td> <a className="btn btn-custom btn-lg page-scroll"  onClick={() => handleDeleteClinic(clinic.id)}>Delete</a></td>
                                </tr>
                            )): "Loading..."}
                        </tbody>
                    </table>

                    <a href="#addClinic" className="btn btn-custom btn-lg page-scroll" onClick={() => onEditClinic(null)}>
                        Add Clinic
                    </a>
                </div>
            </div>
        </div>
    </div>
    );
  };
  


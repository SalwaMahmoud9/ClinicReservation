import React from "react";
import { useEffect, useState } from "react";

// Table Component
export const Doctors = ({ onEditDoctor, refreshTrigger }) => {
    const [doctors, setDoctors] = useState([]);
    const [error, setError] = useState("");
    const [selectedDoctor, setSelectedDoctor] = useState(null); // State for showing doctor details

    useEffect(()=>{
        // Fetch all doctors
        const fetchDoctors = async () => {
            try {
            const response = await fetch('/doctors', {
                headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token in Authorization header
                },
            });
            if (response.ok) {
                const data = await response.json();
                setDoctors(data);
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Failed to fetch doctors");
            }
            } catch (error) {
            setError("An error occurred. Please try again.");
            }
        };
        fetchDoctors();
    
          }, [refreshTrigger])
        // Handle show doctor details
        const handleShow = (doctor) => {
            onEditDoctor(doctor); // Pass the selected doctor to the parent for editing
            document.querySelector("#addDoctor").scrollIntoView({ behavior: "smooth" }); // Smooth scroll to AddDoctor form
        };
        const handleDeleteDoctor = async (id) => {
            try {
              const response = await fetch(`/doctors/${id}`, {
                method: "DELETE",
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
              });
              if (response.ok) {
                setDoctors(doctors.filter((doctor) => doctor.id !== id)); // Remove doctor from the list
              } else {
                setError("Failed to delete doctor");
              }
            } catch (error) {
              setError("An error occurred. Please try again.");
            }
          };


    
    return (
    <div id="doctors" class="text-center w-100 p-3">
        <div className="container">
            <div className="col-md-12">
                <div className="row">
                    <div className="section-title">
                        <h2>Doctors</h2>
                    </div>
                    <table class="table">
                        <thead>
                        <tr>
                            <th key='0'>Doctor</th>
                            <th key='1'>Specialization</th>
                            <th key='2'></th>
                            <th key='3'></th>
                        </tr>
                        </thead>
                        <tbody>
                            {doctors.length > 0?doctors.map((doctor, index) => (
                                <tr key={index}>
                                <td>{doctor.name}</td>
                                <td>{doctor.specialization}</td>
                                <td> <a href="#addDoctor" className="btn btn-custom btn-lg page-scroll" onClick={() => handleShow(doctor)}>Show</a></td>
                                <td> <a className="btn btn-custom btn-lg page-scroll"  onClick={() => handleDeleteDoctor(doctor.id)}>Delete</a></td>
                                </tr>
                            )): "Loading..."}
                        </tbody>
                    </table>

                    <a href="#addDoctor" className="btn btn-custom btn-lg page-scroll" onClick={() => onEditDoctor(null)}>
                        Add Doctor
                    </a>
                </div>
            </div>
        </div>
    </div>
    );
  };
  


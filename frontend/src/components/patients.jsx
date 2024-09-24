// patient.jxs
import React from "react";
import { useEffect, useState } from "react";

// Table Component
export const Patients = ({ onEditPatient, refreshTrigger }) => {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState("");
    const [selectedPatient, setSelectedPatient] = useState(null); // State for showing patient details

    useEffect(()=>{
        // Fetch all patients
        const fetchPatients = async () => {
            try {
            const response = await fetch('/patients', {
                headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token in Authorization header
                },
            });
            if (response.ok) {
                const data = await response.json();
                setPatients(data);
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Failed to fetch patients");
            }
            } catch (error) {
            setError("An error occurred. Please try again.");
            }
        };
        fetchPatients();
    
          }, [refreshTrigger])
        // Handle show patient details
        const handleShow = (patient) => {
            onEditPatient(patient); // Pass the selected patient to the parent for editing
            document.querySelector("#addPatient").scrollIntoView({ behavior: "smooth" }); // Smooth scroll to AddPatient form
        };
        const handleDeletePatient = async (id) => {
            try {
              const response = await fetch(`/patients/${id}`, {
                method: "DELETE",
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
              });
              if (response.ok) {
                setPatients(patients.filter((patient) => patient.id !== id)); // Remove patient from the list
              } else {
                setError("Failed to delete patient");
              }
            } catch (error) {
              setError("An error occurred. Please try again.");
            }
          };


    
    return (
    <div id="patients" class="text-center w-100 p-3">
        <div className="container">
            <div className="col-md-12">
                <div className="row">
                    <div className="section-title">
                        <h2>Patients</h2>
                    </div>
                    <table class="table">
                        <thead>
                        <tr>
                            <th key='0'>Patient</th>
                            <th key='1'>Phone</th>
                            <th key='2'></th>
                            <th key='3'></th>
                        </tr>
                        </thead>
                        <tbody>
                            {patients.length > 0?patients.map((patient, index) => (
                                <tr key={index}>
                                <td>{patient.name}</td>
                                <td>{patient.phone}</td>
                                <td> <a href="#addPatient" className="btn btn-custom btn-lg page-scroll" onClick={() => handleShow(patient)}>Show</a></td>
                                <td> <a className="btn btn-custom btn-lg page-scroll"  onClick={() => handleDeletePatient(patient.id)}>Delete</a></td>
                                </tr>
                            )): "Loading..."}
                        </tbody>
                    </table>

                    <a href="#addPatient" className="btn btn-custom btn-lg page-scroll" onClick={() => onEditPatient(null)}>
                        Add Patient
                    </a>
                </div>
            </div>
        </div>
    </div>
    );
  };
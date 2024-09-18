import React from "react";
import { useEffect, useState } from "react";

// Table Component
export const Appointments = ({ onEditAppointment, refreshTrigger }) => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState("");
    const [selectedAppointment, setSelectedAppointment] = useState(null); // State for showing appointment details

    useEffect(()=>{
        // Fetch all appointments
        const fetchAppointments = async () => {
            try {
            const response = await fetch('/appointments', {
                headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token in Authorization header
                },
            });
            if (response.ok) {
                const data = await response.json();
                setAppointments(data);
            } else {
                const errorData = await response.json();
                setError(errorData.message || "Failed to fetch appointments");
            }
            } catch (error) {
            setError("An error occurred. Please try again.");
            }
        };
        fetchAppointments();
    
          }, [refreshTrigger])
        // Handle show appointment details
        const handleShow = (appointment) => {
            onEditAppointment(appointment); // Pass the selected appointment to the parent for editing
            document.querySelector("#addAppointment").scrollIntoView({ behavior: "smooth" }); // Smooth scroll to AddAppointment form
        };
        const handleDeleteAppointment = async (id) => {
            try {
              const response = await fetch(`/appointments/${id}`, {
                method: "DELETE",
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
              });
              if (response.ok) {
                setAppointments(appointments.filter((appointment) => appointment.id !== id)); // Remove appointment from the list
              } else {
                setError("Failed to delete appointment");
              }
            } catch (error) {
              setError("An error occurred. Please try again.");
            }
          };


    
    return (
    <div id="appointments" class="text-center w-100 p-3">
        <div className="container">
            <div className="col-md-12">
                <div className="row">
                    <div className="section-title">
                        <h2>Appointments</h2>
                    </div>
                    <table class="table">
                        <thead>
                        <tr>
                            <th key='0'>Appointment</th>
                            <th key='1'>date</th>
                            <th key='2'></th>
                            <th key='3'></th>
                        </tr>
                        </thead>
                        <tbody>
                            {appointments.length > 0?appointments.map((appointment, index) => (
                                <tr key={index}>
                                <td>{appointment.user_id}</td>
                                <td>{appointment.date}</td>
                                <td> <a href="#addAppointment" className="btn btn-custom btn-lg page-scroll" onClick={() => handleShow(appointment)}>Show</a></td>
                                <td> <a className="btn btn-custom btn-lg page-scroll"  onClick={() => handleDeleteAppointment(appointment.id)}>Delete</a></td>
                                </tr>
                            )): "Loading..."}
                        </tbody>
                    </table>

                    <a href="#addAppointment" className="btn btn-custom btn-lg page-scroll" onClick={() => onEditAppointment(null)}>
                        Add Appointment
                    </a>
                </div>
            </div>
        </div>
    </div>
    );
  };
  


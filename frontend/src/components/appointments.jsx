import React, { useEffect, useState } from "react";

// Table Component
export const Appointments = ({ onEditAppointment, refreshTrigger,doctorsListUpdated , clinicsListUpdated, patientsListUpdated }) => {
    const [appointments, setAppointments] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [clinics, setClinics] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
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

        fetchDoctors();
        fetchClinics();
        fetchPatients();
    }, [doctorsListUpdated,clinicsListUpdated, patientsListUpdated]);

    // Function to fetch appointments when the component mounts or refreshTrigger changes
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

    // Trigger fetching appointments whenever refreshTrigger changes
    useEffect(() => {
        fetchAppointments();
    }, [refreshTrigger]);

    // Handle search and filter appointments
    const handleSearch = async () => {
        const doctor_id = document.querySelector('#doctor_id').value;
        const patient_id = document.querySelector('#patient_id').value;
        const clinic_id = document.querySelector('#clinic_id').value;
        const date = document.querySelector('#date').value;
        console.log(date)

        try {
            const response = await fetch(`/appointmentsFilter/${doctor_id}/${patient_id}/${clinic_id}/'${date}'`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token in Authorization header
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAppointments(data); // Update the appointments state with the filtered data
                // how to reload table after click filter here answer me ?
            } else {
                setAppointments({});//empty data
                const errorData = await response.json();
                setError(errorData.message || "Failed to fetch appointments");
            }
        } catch (error) {
            setAppointments({});//empty data
            setError("An error occurred. Please try again.");
        }
    };

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
        <div id="appointments" className="text-center w-100 p-3">
            <div className="container">
                <div className="col-md-12">
                    <div className="row">
                        <div className="section-title">
                            <h2>Appointments</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <div className="form-group">
                                    <select
                                        id="doctor_id"
                                        name="doctor_id"
                                        className="form-control">
                                        <option value={0}>---Select Doctor--</option>
                                        {doctors.length > 0 ? doctors.map((doctor, index) => (
                                            <option key={index} value={doctor.id}>{doctor.name}</option>
                                        )) : "loading..."}
                                    </select>
                                    <p className="help-block text-danger"></p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <select
                                        id="patient_id"
                                        name="patient_id"
                                        className="form-control">
                                        <option value={0}>---Select Patient--</option>
                                        {patients.length > 0 ? patients.map((patient, index) => (
                                            <option key={index} value={patient.id}>{patient.name}</option>
                                        )) : "loading..."}
                                    </select>
                                    <p className="help-block text-danger"></p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <select
                                        id="clinic_id"
                                        name="clinic_id"
                                        className="form-control">
                                        <option value={0}>---Select Clinic--</option>
                                        {clinics.length > 0 ? clinics.map((clinic, index) => (
                                            <option key={index} value={clinic.id}>{clinic.name}</option>
                                        )) : "loading..."}
                                    </select>
                                    <p className="help-block text-danger"></p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    className="form-control"
                                    placeholder="Date"
                                    required
                                />
                                <p className="help-block text-danger"></p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <a className="btn btn-custom btn-lg page-scroll" onClick={handleSearch}> Filter</a>
                                </div>
                            </div>
                        </div>
                        <table className="table"  id="tbl_appointment">
                            <thead>
                            <tr>
                                <th key='0'>Patient</th>
                                <th key='1'>Date</th>
                                <th key='2'>Doctor</th>
                                <th key='3'>Clinic</th>
                                <th key='4'></th>
                                <th key='5'></th>
                            </tr>
                            </thead>
                            <tbody>
                                {appointments.length > 0 ? appointments.map((appointment, index) => (
                                    <tr key={index}>
                                        <td>{appointment.patient}</td>  
                                        {new Date(appointment.date).getMonth() === 11 && new Date(appointment.date).getDate() === 31 ?
                                        // If it's Jan 1, set to Dec 31 of the same year
                                        <td>{new Date(new Date(appointment.date).getFullYear(), 0, 1).toISOString().split("T")[0]}</td>
                                        :
                                        // Otherwise, subtract one day
                                        <td>{new Date(new Date(appointment.date).getFullYear(),new Date(appointment.date).getMonth() ,new Date(appointment.date).getDate() + 1).toISOString().split("T")[0]}</td>
                                        }
                                        
                                        <td>{appointment.doctor}</td>
                                        <td>{appointment.clinic}</td>
                                        <td> <a href="#addAppointment" className="btn btn-custom btn-lg page-scroll" onClick={() => handleShow(appointment)}>Show</a></td>
                                        <td> <a className="btn btn-custom btn-lg page-scroll"  onClick={() => handleDeleteAppointment(appointment.id)}>Delete</a></td>
                                    </tr>
                                )) : <tr><td colSpan="4">No appointments found</td></tr>}
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
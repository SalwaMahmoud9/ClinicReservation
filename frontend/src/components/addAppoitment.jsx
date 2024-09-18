// addappointment.jsx
import React, { useState, useEffect }from "react";

export const AddAppointment = ({ appointmentToEdit, clearAppointment, onAppointmentChange }) => {

  // State variables to store form inputs and error messages
  const [user_id, setUser_id] = useState("");
  const [doctor_id, setDoctor_id] = useState("");
  const [patient_id, setPatient_id] = useState("");
  const [clinic_id, setClinic_id] = useState("");
  const [date, setDate] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [clinics, setClinics] = useState([]);
  const [patients, setPatients] = useState([]);
  const [users, setUsers] = useState([]);
  const [doctors, setDoctors] = useState([]);


 // Reset form fields when appointmentToEdit changes (i.e., when editing a appointment)
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
fetchClinics();
fetchDoctors();
fetchPatients();
fetchUsers();
  if (appointmentToEdit) {
    setUser_id(appointmentToEdit.user_id || "");
    setDoctor_id(appointmentToEdit.doctor_id || ""); 
    setPatient_id(appointmentToEdit.patient_id || "");
    let adjustedDate;
    console.log(appointmentToEdit.date)
    if (appointmentToEdit.date) {
      const date = new Date(appointmentToEdit.date);

      
      if (date.getMonth() === 11 && date.getDate() === 31) {
        // If it's Jan 1, set to Dec 31 of the same year
        adjustedDate = new Date(date.getFullYear(), 0, 1);
      } else {
        // Otherwise, subtract one day
        adjustedDate = new Date(date);
        adjustedDate.setDate(date.getDate() + 1);
      }
    }
    const formattedDate = adjustedDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD
    setDate(formattedDate);

    setClinic_id(appointmentToEdit.clinic_id || "");
    setDiagnosis(appointmentToEdit.diagnosis || "");
    setDescription(appointmentToEdit.description || "");
  } else {
    // Clear form fields when adding a new appointment
    setUser_id("");
    setDoctor_id(""); 
    setPatient_id("");
    setDate("");
    setClinic_id("");
    setDiagnosis("");
    setDescription("");
  }
}, [appointmentToEdit]);


// Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const appointmentId = appointmentToEdit ? appointmentToEdit.id : null;
      const url = appointmentId ? `/appointments/${appointmentId}` : '/appointments';
      const method = appointmentId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token in Authorization header
        },
        body: JSON.stringify({ user_id,
          doctor_id,
          patient_id,
          date,
          clinic_id,
          diagnosis,
          description }),
      });

      if (response.ok) {
        const result = await response.json();
        // setSuccess(result.message || "Appointment saved successfully");
        clearAppointment(); // Clear appointment details after successful save
        // Clear form fields
        setUser_id("");
        setDoctor_id(""); 
        setPatient_id("");
        setDate("");
        setClinic_id("");
        setDiagnosis("");
        setDescription("");
        onAppointmentChange(); // Trigger appointment list refresh
        document.querySelector("#appointments").scrollIntoView({ behavior: "smooth" }); // Smooth scroll to appointments

    
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to save appointment");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
  return (
    <div id="addAppointment" class="text-center">
        <div className="container">
          <div className="col-md-12">
            <div className="row">
              <form name="saveAppointment" onSubmit={handleSubmit}>
              <div className="row">
                    <div className="section-title">
                        <h2> Appointment</h2>
                        <h2> add / change appointment data</h2>
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <select
                        id="user_id"
                        name="user_id"
                        value={user_id}
                        className="form-control"
                        onChange={(e) => setUser_id(e.target.value)}
                        required
                      >
                        <option value={0}>---Select User--</option>
                        {users.length>0?users.map((user,index)=>(
                         <option value={user.id}>{user.username}</option>
                        )):"loading ..."}
                      </select>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <select
                        id="doctor_id"
                        name="doctor_id"
                        value={doctor_id}
                        className="form-control"
                        onChange={(e) => setDoctor_id(e.target.value)}
                        required
                      >
                        <option value={0}>---Select Docror--</option>
                        {doctors.length > 0 ?doctors.map((doctor, index)=> (
                          <option value={doctor.id}>{doctor.name}</option>
                        )):"loading..."}
                      </select>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <select
                        id="patient_id"
                        name="patient_id"
                        value={patient_id}
                        className="form-control"
                        onChange={(e) => setPatient_id(e.target.value)}
                        required >
                          <option value={0}>---Select Patient--</option>
                        {patients.length > 0?patients.map((patient, index) => (
                        <option value={patient.id}>{patient.name}</option>)):"Loading..."};
                        </select>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        className="form-control"
                        placeholder="Date"
                        onChange={(e) => setDate(e.target.value)}
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <select
                        id="clinic_id"
                        name="clinic_id"
                        value={clinic_id}
                        className="form-control"
                        onChange={(e) => setClinic_id(e.target.value)}
                        required
                      >
                        <option value={0}>---Select Clinic--</option>
                        {clinics.length > 0 ?clinics.map((clinic,index)=>(
                          <option value={clinic.id}>{clinic.name}</option>
                        ))
                        :"loading... "}
                        </select>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="diagnosis"
                        name="diagnosis"
                        value={diagnosis}
                        className="form-control"
                        placeholder="Diagnosis"
                        onChange={(e) => setDiagnosis(e.target.value)}
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
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        className="form-control"
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                {appointmentToEdit ? "Update" : "Save"} {/* Update button text */}
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

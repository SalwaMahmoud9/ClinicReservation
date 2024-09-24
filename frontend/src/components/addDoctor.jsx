// addDoctor.jsx
import React, { useState, useEffect }from "react";

export const AddDoctor = ({ doctorToEdit, clearDoctor, onDoctorChange }) => {

  // State variables to store form inputs and error messages
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("male");
  const [birthdate, setBirthdate] = useState("");
  const [address, setAddress] = useState("");
  const [degree, setDegree] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


 // Reset form fields when doctorToEdit changes (i.e., when editing a doctor)
 useEffect(() => {
  
  if (doctorToEdit) {
    setName(doctorToEdit.name || "");
    setPhone(doctorToEdit.phone || ""); 
    setGender(doctorToEdit.gender || "male");
    let adjustedDate;
    console.log(doctorToEdit.birthdate)
    if (doctorToEdit.birthdate) {
      const birthdate = new Date(doctorToEdit.birthdate);

      
      if (birthdate.getMonth() === 11 && birthdate.getDate() === 31) {
        // If it's Jan 1, set to Dec 31 of the same year
        adjustedDate = new Date(birthdate.getFullYear(), 0, 1);
      } else {
        // Otherwise, subtract one day
        adjustedDate = new Date(birthdate);
        adjustedDate.setDate(birthdate.getDate() + 1);
      }
    }
    const formattedDate = adjustedDate.toISOString().split("T")[0]; // Format to YYYY-MM-DD
    setBirthdate(formattedDate);

    setAddress(doctorToEdit.address || "");
    setDegree(doctorToEdit.degree || "");
    setSpecialization(doctorToEdit.specialization || "");
    setDescription(doctorToEdit.description || "");
  } else {
    // Clear form fields when adding a new doctor
    setName("");
    setPhone(""); 
    setGender("male");
    setBirthdate("");
    setAddress("");
    setDegree("");
    setSpecialization("");
    setDescription("");
  }
}, [doctorToEdit]);


// Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const doctorId = doctorToEdit ? doctorToEdit.id : null;
      const url = doctorId ? `/doctors/${doctorId}` : '/doctors';
      const method = doctorId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token in Authorization header
        },
        body: JSON.stringify({ name,
          phone,
          gender,
          birthdate,
          address,
          degree,
          specialization,
          description }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message || "Doctor saved successfully");
        clearDoctor(); // Clear doctor details after successful save
        // Clear form fields
        setName("");
        setPhone(""); 
        setGender("male");
        setBirthdate("");
        setAddress("");
        setDegree("");
        setSpecialization("");
        setDescription("");
        onDoctorChange(); // Trigger doctor list refresh
        document.querySelector("#doctors").scrollIntoView({ behavior: "smooth" }); // Smooth scroll to doctors

    
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to save doctor");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
  return (
    <div id="addDoctor" class="text-center">
        <div className="container">
          <div className="col-md-12">
            <div className="row">
              <form name="saveDoctor" onSubmit={handleSubmit}>
              <div className="row">
                    <div className="section-title">
                        <h2> Doctor</h2>
                        <h2> add / change doctor data</h2>
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        className="form-control"
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone}
                        className="form-control"
                        placeholder="Phone"
                        onChange={(e) => setPhone(e.target.value)}
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
                        id="gender"
                        name="gender"
                        value={gender}
                        className="form-control"
                        onChange={(e) => setGender(e.target.value)}
                        required >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        </select>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        value={birthdate}
                        className="form-control"
                        placeholder="Birthdate"
                        onChange={(e) => setBirthdate(e.target.value)}
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        className="form-control"
                        placeholder="Address"
                        onChange={(e) => setAddress(e.target.value)}
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="degree"
                        name="degree"
                        value={degree}
                        className="form-control"
                        placeholder="Degree"
                        onChange={(e) => setDegree(e.target.value)}
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        value={specialization}
                        className="form-control"
                        placeholder="Specialization"
                        onChange={(e) => setSpecialization(e.target.value)}
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="description"
                        name="description"
                        value={description}
                        className="form-control"
                        placeholder="Description"
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                {doctorToEdit ? "Update" : "Save"} {/* Update button text */}
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

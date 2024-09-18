// addclinic.jsx
import React, { useState, useEffect }from "react";

export const AddClinic = ({ clinicToEdit, clearClinic, onClinicChange }) => {

  // State variables to store form inputs and error messages
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


 // Reset form fields when clinicToEdit changes (i.e., when editing a clinic)
 useEffect(() => {
  
  if (clinicToEdit) {
    setName(clinicToEdit.name || "");
    setAddress(clinicToEdit.address || "");
  } else {
    // Clear form fields when adding a new clinic
    setName("");
    setAddress("");
  }
}, [clinicToEdit]);


// Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const clinicId = clinicToEdit ? clinicToEdit.id : null;
      const url = clinicId ? `/clinics/${clinicId}` : '/clinics';
      const method = clinicId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Include token in Authorization header
        },
        body: JSON.stringify({ name,
          address }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccess(result.message || "Clinic saved successfully");
        clearClinic(); // Clear clinic details after successful save
        // Clear form fields
        setName("");
        setAddress("");
        onClinicChange(); // Trigger clinic list refresh
        document.querySelector("#clinics").scrollIntoView({ behavior: "smooth" }); // Smooth scroll to clinics

    
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to save clinic");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
  return (
    <div id="addClinic" class="text-center">
        <div className="container">
          <div className="col-md-12">
            <div className="row">
              <form name="saveClinic" onSubmit={handleSubmit}>
              <div className="row">
                    <div className="section-title">
                        <h2> Clinic</h2>
                        <h2> add / change clinic data</h2>
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
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
                </div>
                <div className="row">
                  <div className="col-md-12">
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
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                {clinicToEdit ? "Update" : "Save"} {/* Update button text */}
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

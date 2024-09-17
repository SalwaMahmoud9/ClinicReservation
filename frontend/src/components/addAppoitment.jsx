import React from "react";

export const AddAppointment = (props) => {

  return (
    <div id="addAppointment" class="text-center">
        <div className="container">
          <div className="col-md-12">
            <div className="row">
              <form name="saveAppointment">
              <div className="row">
                    <div className="section-title">
                        <h2> Appointment</h2>
                        <h2> add / change appointment data</h2>
                    </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
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
                  <div className="col-md-6">
                    <div className="form-group">
                     <select
                      name="doctor"
                      id="doctor"
                      className="form-control"
                      required
                      >
                        <option value="1">doctor1</option>
                        <option value="2">doctor2</option>
                     </select>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                      <div className="form-group">
                      <select
                        name="clinic"
                        id="clinic"
                        className="form-control"
                        required
                        >
                          <option value="1">clinic1</option>
                          <option value="2">clinic2</option>
                      </select>
                        <p className="help-block text-danger"></p>
                      </div>
                    </div>
                  <div className="col-md-6">
                    <div className="form-group">
                     <select
                      name="patient"
                      id="patient"
                      className="form-control"
                      required
                      >
                        <option value="1">patient1</option>
                        <option value="2">patient2</option>
                     </select>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          id="diagnosis"
                          name="diagnosis"
                          className="form-control"
                          placeholder="Diagnosis"
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          id="description"
                          name="description"
                          className="form-control"
                          placeholder="Description"
                        />
                        <p className="help-block text-danger"></p>
                      </div>
                  </div>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Save
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

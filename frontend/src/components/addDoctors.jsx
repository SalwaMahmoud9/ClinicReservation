import React from "react";

export const AddDoctor = (props) => {

  return (
    <div id="addDoctor" class="text-center">
        <div className="container">
          <div className="col-md-12">
            <div className="row">
              <form name="saveDoctor">
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
                        className="form-control"
                        placeholder="Name"
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
                        className="form-control"
                        placeholder="Phone"
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
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        className="form-control"
                        placeholder="Birthdate"
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                     <select
                      name="gender"
                      id="gender"
                      className="form-control"
                      required
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                     </select>
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="degree"
                        name="degree"
                        className="form-control"
                        placeholder="Degree"
                        required
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        className="form-control"
                        placeholder="Specialization"
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
                          className="form-control"
                          placeholder="Address"
                          required
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

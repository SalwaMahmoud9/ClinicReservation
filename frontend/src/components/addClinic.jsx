import React from "react";

export const AddClinic = (props) => {

  return (
    <div id="addClinic" class="text-center">
        <div className="container">
          <div className="col-md-12">
            <div className="row">
              <form name="saveClinic">
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
                        className="form-control"
                        placeholder="Name"
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

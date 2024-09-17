import React from "react";

// Table Component
export const Clinics = (props) => {
    return (
    <div id="clinics" class="text-center w-100 p-3">
        <div className="container">
            <div className="col-md-12">
                <div className="row">
                    <div className="section-title">
                        <h2>Clinics</h2>
                    </div>
                    <table class="table">
                        <thead>
                        <tr>
                            <th key='0'>clinic</th>
                            <th key='1'>type</th>
                            <th key='2'></th>
                            <th key='3'></th>
                        </tr>
                        </thead>
                        <tbody>
                            {props.data?props.data.map((clinic, index) => (
                                <tr key={index}>
                                <td>{clinic.name}</td>
                                <td>{clinic.type}</td>
                                <td> <a href="#addClinic" className="btn btn-custom btn-lg page-scroll">Show</a></td>
                                <td> <a href="#addClinic" className="btn btn-custom btn-lg page-scroll">Delete</a></td>
                                </tr>
                            )): "Loading..."}
                        </tbody>
                    </table>
                    <a href="#addClinic" className="btn btn-custom btn-lg page-scroll">
                        Add Clinic
                    </a>
                </div>
            </div>
        </div>
    </div>
    );
  };
  


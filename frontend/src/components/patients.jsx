import React from "react";

// Table Component
export const Patients = (props) => {
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
                            <th key='0'>patient</th>
                            <th key='1'>type</th>
                            <th key='2'></th>
                            <th key='3'></th>
                        </tr>
                        </thead>
                        <tbody>
                            {props.data?props.data.map((patient, index) => (
                                <tr key={index}>
                                <td>{patient.name}</td>
                                <td>{patient.type}</td>
                                <td> <a href="#addPatient" className="btn btn-custom btn-lg page-scroll">Show</a></td>
                                <td> <a href="#addPatient" className="btn btn-custom btn-lg page-scroll">Delete</a></td>
                                </tr>
                            )): "Loading..."}
                        </tbody>
                    </table>
                    <a href="#addPatient" className="btn btn-custom btn-lg page-scroll">
                        Add Patient
                    </a>
                </div>
            </div>
        </div>
    </div>
    );
  };
  


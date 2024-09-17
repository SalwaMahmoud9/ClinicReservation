import React from "react";

// Table Component
export const Doctors = (props) => {
    return (
    <div id="doctors" class="text-center w-100 p-3">
        <div className="container">
            <div className="col-md-12">
                <div className="row">
                    <div className="section-title">
                        <h2>Doctors</h2>
                    </div>
                    <table class="table">
                        <thead>
                        <tr>
                            <th key='0'>doctor</th>
                            <th key='1'>type</th>
                            <th key='2'></th>
                            <th key='3'></th>
                        </tr>
                        </thead>
                        <tbody>
                            {props.data?props.data.map((doctor, index) => (
                                <tr key={index}>
                                <td>{doctor.name}</td>
                                <td>{doctor.type}</td>
                                <td> <a href="#addDoctor" className="btn btn-custom btn-lg page-scroll">Show</a></td>
                                <td> <a href="#addDoctor" className="btn btn-custom btn-lg page-scroll">Delete</a></td>
                                </tr>
                            )): "Loading..."}
                        </tbody>
                    </table>
                    <a href="#addDoctor" className="btn btn-custom btn-lg page-scroll">
                        Add Doctor
                    </a>
                </div>
            </div>
        </div>
    </div>
    );
  };
  


import React from "react";

// Table Component
export const Appointments = (props) => {
    return (
    <div id="appointments" class="text-center w-100 p-3">
        <div className="container">
            <div className="col-md-12">
                <div className="row">
                    <div className="section-title">
                        <h2>Appointments</h2>
                    </div>
                    <table class="table">
                        <thead>
                        <tr>
                            <th key='0'>appointment</th>
                            <th key='1'>type</th>
                            <th key='2'></th>
                            <th key='3'></th>
                        </tr>
                        </thead>
                        <tbody>
                            {props.data?props.data.map((appointment, index) => (
                                <tr key={index}>
                                <td>{appointment.name}</td>
                                <td>{appointment.type}</td>
                                <td> <a href="#addAppointment" className="btn btn-custom btn-lg page-scroll">Show</a></td>
                                <td> <a href="#addAppointment" className="btn btn-custom btn-lg page-scroll">Delete</a></td>
                                </tr>
                            )): "Loading..."}
                        </tbody>
                    </table>
                    <a href="#addAppointment" className="btn btn-custom btn-lg page-scroll">
                        Add Appointment
                    </a>
                </div>
            </div>
        </div>
    </div>
    );
  };
  


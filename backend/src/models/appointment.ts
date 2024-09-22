import Client from '../database';
import dotenv from 'dotenv';
import { query } from 'express';

// to use .env file variables
dotenv.config();

// define Appointment type
export type Appointment = {
  id?: number;
  user_id: number;
  doctor_id: number;
  patient_id: number;
  clinic_id: number;
  date: Date;
  description?: string;
  diagnosis?: string;
};
// define class for all needed functions to be used
export class AppointmentClinic {
  // get all appointments
  async index(): Promise<Appointment[]> {
    try {
      // database connection
      const conn = await Client.connect();
      //sql query
      const sql = `SELECT app.*, d.name AS doctor
                    , c.name AS clinic
                    , p.name AS patient
                    FROM appointments as app 
                    JOIN doctors AS d 
                    ON d.id = app.doctor_id 
                    JOIN patients AS p 
                    ON p.id = app.patient_id
                    JOIN clinics AS c
                    ON c.id = app.clinic_id
                    ORDER BY date;`;
                    //exexute query
      const result = await conn.query(sql);
      //close connection
      conn.release();
      const appointmentsList: Appointment[] = result.rows;
      return appointmentsList;
    } catch (err) {
      throw new Error("Couldn't get all appointments Error message:" + err);
    }
  }
  // get appointment by id
  async show(id: number): Promise<Appointment> {
    try {
      if (id && typeof id === 'number') {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'SELECT * FROM appointments WHERE id=$1;';
        //exexute query
        const result = await conn.query(sql, [id]);
        //close connection
        conn.release();
        const appointment: Appointment = result.rows[0];
        return appointment;
      } else {
        throw new Error('You have entered wrong id');
      }
    } catch (err) {
      throw new Error("Couldn't get this appointment Error message:" + err);
    }
  }
  // create new appointment
  async create(appointment: Appointment): Promise<Appointment> {
    try {
      // database connection
      const conn = await Client.connect();
      const user_id = appointment.user_id;
      const doctor_id = appointment.doctor_id;
      const patient_id = appointment.patient_id;
      const clinic_id = appointment.clinic_id;
      const date = appointment.date;
      const description = appointment.description;
      const diagnosis = appointment.diagnosis;
      if (
        user_id &&
        user_id != 0 &&
        doctor_id &&
        doctor_id != 0 &&
        patient_id &&
        patient_id != 0 &&
        clinic_id &&
        clinic_id != 0 &&
        date
      ) {
        // console.log(name);
        //sql query
        const sql =
          'INSERT INTO appointments (user_id,doctor_id,patient_id,clinic_id,date,description,diagnosis) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;';
        //exexute query
        const result = await conn.query(sql, [user_id, doctor_id, patient_id,clinic_id,date,description,diagnosis]);
        //close connection
        conn.release();
        const newAppointment: Appointment = result.rows[0];
        // console.log(newAppointment);
        return newAppointment;
      } else {
        throw new Error('Data missing');
      }
    } catch (err) {
      throw new Error("Couldn't add this appointment Error message:" + err);
    }
  }
  // update appointment by id
  async update(appointment: Appointment): Promise<Appointment> {
    try {
      // database connection
      const conn = await Client.connect();
      const id = appointment.id;
      const user_id = appointment.user_id;
      const doctor_id = appointment.doctor_id;
      const patient_id = appointment.patient_id;
      const clinic_id = appointment.clinic_id;
      const date = appointment.date;
      const description = appointment.description;
      const diagnosis = appointment.diagnosis;
      if (
        user_id &&
        user_id != 0 &&
        doctor_id &&
        doctor_id != 0 &&
        patient_id &&
        patient_id != 0 &&
        clinic_id &&
        clinic_id != 0 &&
        date
      ) {
        //sql query
        const sql =
          'UPDATE appointments SET user_id=($2),doctor_id=($3),patient_id=($4),clinic_id=($5),date=($6),description=($7),diagnosis=($8) WHERE id=($1) RETURNING *';
        //exexute query
        const result = await conn.query(sql, [id, user_id, doctor_id, patient_id,clinic_id,date,description,diagnosis]);
        //close connection
        conn.release();
        const newAppointment: Appointment = result.rows[0];
        return newAppointment;
      } else {
        throw new Error('Data missing');
      }
    } catch (err) {
      throw new Error("Couldn't add this appointment Error message:" + err);
    }
  }
  // delete appointment by id
  async delete(id: number): Promise<number> {
    try {
      if (id && typeof id === 'number') {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'DELETE FROM appointments WHERE id=($1)';
        //exexute query
        const result = await conn.query(sql, [id]);
        //close connection
        conn.release();
        const numberOfDeletedRows = result.rowCount;
        return numberOfDeletedRows;
      } else {
        throw new Error('You have entered wrong id');
      }
    } catch (err) {
      throw new Error("Couldn't delete this appointment Error message:" + err);
    }
  }
  // get appointment by doctor_id
  async getAppointmentByDoctor(doctor_id: Number): Promise<Appointment> {
    try {
      if (doctor_id && doctor_id != 0) {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = `SELECT app.*, d.name AS doctor
                    , c.name AS clinic
                    , p.name AS patient
                    FROM appointments as app 
                    JOIN doctors AS d 
                    ON d.id = app.doctor_id 
                    JOIN patients AS p 
                    ON p.id = app.patient_id
                    JOIN clinics AS c
                    ON c.id = app.clinic_id
                    WHERE doctor_id=$1
                    ORDER BY date;`;
        //exexute query
        const result = await conn.query(sql, [doctor_id]);
        //close connection
        conn.release();
        const appointment: Appointment = result.rows[0];
        return appointment;
      } else {
        throw new Error('You have entered wrong id');
      }
    } catch (err) {
      throw new Error("Couldn't get this appointment Error message:" + err);
    }
  }
  async getAppointmentByClinic(clinic_id: Number): Promise<Appointment> {
    try {
      if (clinic_id && clinic_id != 0) {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = `SELECT app.*, d.name AS doctor
                    , c.name AS clinic
                    , p.name AS patient
                    FROM appointments as app 
                    JOIN doctors AS d 
                    ON d.id = app.doctor_id 
                    JOIN patients AS p 
                    ON p.id = app.patient_id
                    JOIN clinics AS c
                    ON c.id = app.clinic_id
                    WHERE clinic_id=$1
                    ORDER BY date;`;
        //exexute query
        const result = await conn.query(sql, [clinic_id]);
        //close connection
        conn.release();
        const appointment: Appointment = result.rows[0];
        return appointment;
      } else {
        throw new Error('You have entered wrong id');
      }
    } catch (err) {
      throw new Error("Couldn't get this appointment Error message:" + err);
    }
  }
  async getAppointmentByPatient(patient_id: Number): Promise<Appointment> {
    try {
      if (patient_id && patient_id != 0) {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = `SELECT app.*, d.name AS doctor
                    , c.name AS clinic
                    , p.name AS patient
                    FROM appointments as app 
                    JOIN doctors AS d 
                    ON d.id = app.doctor_id 
                    JOIN patients AS p 
                    ON p.id = app.patient_id
                    JOIN clinics AS c
                    ON c.id = app.clinic_id
                    WHERE patient_id=$1
                    ORDER BY date;`;
        //exexute query
        const result = await conn.query(sql, [patient_id]);
        //close connection
        conn.release();
        const appointment: Appointment = result.rows[0];
        return appointment;
      } else {
        throw new Error('You have entered wrong id');
      }
    } catch (err) {
      throw new Error("Couldn't get this appointment Error message:" + err);
    }
  }
  async getAppointmentByFilter(doctor_id: Number, patient_id:Number, clinic_id:Number, date: string): Promise<Appointment[]> {
    try {
      if (true) {
        // database connection
        const conn = await Client.connect();
        // sql query
        // const sql = `SELECT DISTINCT * from 
        // ((SELECT app.*, d.name AS doctor
        //   , c.name AS clinic
        //   , p.name AS patient
        //   FROM appointments as app 
        //   JOIN doctors AS d 
        //   ON d.id = app.doctor_id 
        //   JOIN patients AS p 
        //   ON p.id = app.patient_id
        //   JOIN clinics AS c
        //   ON c.id = app.clinic_id
        //   WHERE doctor_id=${doctor_id}
        //   ORDER BY date) UNION 
        //    (SELECT app.*, d.name AS doctor
        //   , c.name AS clinic
        //   , p.name AS patient
        //   FROM appointments as app 
        //   JOIN doctors AS d 
        //   ON d.id = app.doctor_id 
        //   JOIN patients AS p 
        //   ON p.id = app.patient_id
        //   JOIN clinics AS c
        //   ON c.id = app.clinic_id
        //   WHERE patient_id=${patient_id}
        //   ORDER BY date)
        //   UNION 
        //    (SELECT app.*, d.name AS doctor
        //   , c.name AS clinic
        //   , p.name AS patient
        //   FROM appointments as app 
        //   JOIN doctors AS d 
        //   ON d.id = app.doctor_id 
        //   JOIN patients AS p 
        //   ON p.id = app.patient_id
        //   JOIN clinics AS c
        //   ON c.id = app.clinic_id
        //   WHERE clinic_id=${clinic_id}
        //   ORDER BY date)
        //   UNION 
        //   (SELECT app.*, d.name AS doctor
        //  , c.name AS clinic
        //  , p.name AS patient
        //  FROM appointments as app 
        //  JOIN doctors AS d 
        //  ON d.id = app.doctor_id 
        //  JOIN patients AS p 
        //  ON p.id = app.patient_id
        //  JOIN clinics AS c
        //  ON c.id = app.clinic_id
        //  WHERE date= ${date}
        //  ORDER BY date)
        //   ) as k;`;
        // simple query
        // var dateCond=""
        // if(date !="" )
        // and doctor_id=${doctor_id} and patient_id=${patient_id} and clinic_id=${clinic_id})
        // console.log('date:');
        // console.log((date.length));
        var sql
        if (date.length ==2)
        {
          sql = `select id,user_id,doctor_id,patient_id,clinic_id,date,description,diagnosis,
        (select name from doctors where id=appointments.doctor_id  ) as doctor,
        (select name from clinics where id=appointments.clinic_id) as clinic,
        (select name from patients where id=appointments.patient_id) as patient 
        from appointments
         where  1 = 1
        AND (${doctor_id} = '0' OR doctor_id = ${doctor_id}) AND (${patient_id} = '0' OR patient_id = ${patient_id})
        AND (${clinic_id} = '0' OR clinic_id = ${clinic_id})`;
        }
        else{
          sql = `select id,user_id,doctor_id,patient_id,clinic_id,date,description,diagnosis,
        (select name from doctors where id=appointments.doctor_id  ) as doctor,
        (select name from clinics where id=appointments.clinic_id) as clinic,
        (select name from patients where id=appointments.patient_id) as patient 
        from appointments
         where  1 = 1
        AND (${doctor_id} = '0' OR doctor_id = ${doctor_id}) AND (${patient_id} = '0' OR patient_id = ${patient_id})
        AND (${clinic_id} = '0' OR clinic_id = ${clinic_id})
        AND ( date = ${date});`;
        }
        
        
        //exexute query
        const result = await conn.query(sql);
        
        //close connection
        conn.release();
        const appointmentsList: Appointment[] = result.rows;
        return appointmentsList;
      } else {
        throw new Error('You have entered wrong id');
      }
    } catch (err) {
      throw new Error("Couldn't get this appointment Error message:" + err);
    }
  }
}

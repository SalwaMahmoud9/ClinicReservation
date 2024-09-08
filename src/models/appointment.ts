import Client from '../database';
import dotenv from 'dotenv';

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
export class ProductClinic {
  // get all appointments
  async index(): Promise<Appointment[]> {
    try {
      // database connection
      const conn = await Client.connect();
      //sql query
      const sql = 'SELECT * FROM appointments;';
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
          'INSERT INTO appointments (user_id,doctor_id,doctor_id,clinic_id,date,description,diagnosis) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *;';
        //exexute query
        const result = await conn.query(sql, [user_id, doctor_id, doctor_id,clinic_id,date,description,diagnosis]);
        //close connection
        conn.release();
        const newProduct: Appointment = result.rows[0];
        // console.log(newProduct);
        return newProduct;
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
        const result = await conn.query(sql, [id, user_id, doctor_id, doctor_id,clinic_id,date,description,diagnosis]);
        //close connection
        conn.release();
        const newProduct: Appointment = result.rows[0];
        return newProduct;
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
  async getProductByDoctor(doctor_id: Number): Promise<Appointment> {
    try {
      if (doctor_id && doctor_id != 0) {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'SELECT * FROM appointments WHERE doctor_id=$1;';
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
}

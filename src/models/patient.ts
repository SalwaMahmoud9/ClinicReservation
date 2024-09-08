import Client from '../database';
import dotenv from 'dotenv';

// to use .env file variables
dotenv.config();

// define Patient type
export type Patient = {
  id?: number;
  name: string;
  phone: string;
  gender?: string;
  birthdate?: Date,
  address?: string;
  description?: string;
};
// define class for all needed functions to be used
export class PatientClinic {
  // get all Patients
  async index(): Promise<Patient[]> {
    try {
      // database connection
      const conn = await Client.connect();
      //sql query
      const sql = 'SELECT * FROM Patients;';
      //exexute query
      const result = await conn.query(sql);
      //close connection
      conn.release();
      const PatientsList: Patient[] = result.rows;
      return PatientsList;
    } catch (err) {
      throw new Error("Couldn't get all Patients Error message:" + err);
    }
  }
  // get Patient by id
  async show(id: number): Promise<Patient> {
    try {
      if (id && typeof id === 'number') {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'SELECT * FROM Patients WHERE id=$1;';
        //exexute query
        const result = await conn.query(sql, [id]);
        //close connection
        conn.release();
        const Patient: Patient = result.rows[0];
        return Patient;
      } else {
        throw new Error('You have entered wrong id');
      }
    } catch (err) {
      throw new Error("Couldn't get this Patient Error message:" + err);
    }
  }
  // create new Patient
  async create(Patient: Patient): Promise<Patient> {
    try {
      // database connection
      const conn = await Client.connect();
      const name = Patient.name;
      const phone = Patient.phone;
      const gender = Patient.gender;
      const birthdate = Patient.birthdate;
      const address = Patient.address;
      const description = Patient.description;
      if (
        name &&
        name != '' &&
        phone &&
        phone != ''
      ) {
        // console.log(name);
        //sql query
        const sql =
          'INSERT INTO Patients (name,phone,gender,birthdate,address,description) VALUES($1,$2,$3,$4,$5,$6) RETURNING *;';
        //exexute query
        const result = await conn.query(sql, [name, phone, gender, birthdate, address, description]);
        //close connection
        conn.release();
        const newPatient: Patient = result.rows[0];
        // console.log(newPatient);
        return newPatient;
      } else {
        throw new Error('Data missing');
      }
    } catch (err) {
      throw new Error("Couldn't add this Patient Error message:" + err);
    }
  }
  // update Patient by id
  async update(Patient: Patient): Promise<Patient> {
    try {
      // database connection
      const conn = await Client.connect();
      const id = Patient.id;
      const name = Patient.name;
      const phone = Patient.phone;
      const gender = Patient.gender;
      const birthdate = Patient.birthdate;
      const address = Patient.address;
      const description = Patient.description;
      if (
        id &&
        typeof id === 'number' &&
        name &&
        name != '' &&
        phone &&
        phone != ''
      ) {
        //sql query
        const sql =
          'UPDATE Patients SET name=($2),phone=($3),gender=($4),birthdate=($5),address=($6),description=($7) WHERE id=($1) RETURNING *';
        //exexute query
        const result = await conn.query(sql, [id, name, phone, gender, birthdate, address, description]);
        //close connection
        conn.release();
        const newPatient: Patient = result.rows[0];
        return newPatient;
      } else {
        throw new Error('Data missing');
      }
    } catch (err) {
      throw new Error("Couldn't add this Patient Error message:" + err);
    }
  }
  // delete Patient by id
  async delete(id: number): Promise<number> {
    try {
      if (id && typeof id === 'number') {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'DELETE FROM Patients WHERE id=($1)';
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
      throw new Error("Couldn't delete this Patient Error message:" + err);
    }
  }
  
}

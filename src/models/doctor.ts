import Client from '../database';
import dotenv from 'dotenv';

// to use .env file variables
dotenv.config();

// define Doctor type
export type Doctor = {
  id?: number;
  name: string;
  phone: string;
  gender?: string;
  birthdate?: Date,
  address?: string;
  degree?: string;
  specialization?: string;
  description?: string;
};
// define class for all needed functions to be used
export class DoctorClinic {
  // get all Doctors
  async index(): Promise<Doctor[]> {
    try {
      // database connection
      const conn = await Client.connect();
      //sql query
      const sql = 'SELECT * FROM Doctors;';
      //exexute query
      const result = await conn.query(sql);
      //close connection
      conn.release();
      const DoctorsList: Doctor[] = result.rows;
      return DoctorsList;
    } catch (err) {
      throw new Error("Couldn't get all Doctors Error message:" + err);
    }
  }
  // get Doctor by id
  async show(id: number): Promise<Doctor> {
    try {
      if (id && typeof id === 'number') {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'SELECT * FROM Doctors WHERE id=$1;';
        //exexute query
        const result = await conn.query(sql, [id]);
        //close connection
        conn.release();
        const Doctor: Doctor = result.rows[0];
        return Doctor;
      } else {
        throw new Error('You have entered wrong id');
      }
    } catch (err) {
      throw new Error("Couldn't get this Doctor Error message:" + err);
    }
  }
  // create new Doctor
  async create(Doctor: Doctor): Promise<Doctor> {
    try {
      // database connection
      const conn = await Client.connect();
      const name = Doctor.name;
      const phone = Doctor.phone;
      const gender = Doctor.gender;
      const birthdate = Doctor.birthdate;
      const address = Doctor.address;
      const degree = Doctor.degree
      const specialization = Doctor.specialization;
      const description = Doctor.description;
      if (
        name &&
        name != '' &&
        phone &&
        phone != ''
      ) {
        // console.log(name);
        //sql query
        const sql =
          'INSERT INTO Doctors (name,phone,gender,birthdate,address,degree,specialization,description) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *;';
        //exexute query
        const result = await conn.query(sql, [name, phone, gender, birthdate, address, degree, specialization, description]);
        //close connection
        conn.release();
        const newDoctor: Doctor = result.rows[0];
        // console.log(newDoctor);
        return newDoctor;
      } else {
        throw new Error('Data missing');
      }
    } catch (err) {
      throw new Error("Couldn't add this Doctor Error message:" + err);
    }
  }
  // update Doctor by id
  async update(Doctor: Doctor): Promise<Doctor> {
    try {
      // database connection
      const conn = await Client.connect();
      const id = Doctor.id;
      const name = Doctor.name;
      const phone = Doctor.phone;
      const gender = Doctor.gender;
      const birthdate = Doctor.birthdate;
      const address = Doctor.address;
      const degree = Doctor.degree
      const specialization = Doctor.specialization;
      const description = Doctor.description;
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
          'UPDATE Doctors SET name=($2),phone=($3),gender=($4),birthdate=($5),address=($6),degree=($7),specialization=($8),description=($9) WHERE id=($1) RETURNING *';
        //exexute query
        const result = await conn.query(sql, [id, name, phone, gender, birthdate, address, degree, specialization, description]);
        //close connection
        conn.release();
        const newDoctor: Doctor = result.rows[0];
        return newDoctor;
      } else {
        throw new Error('Data missing');
      }
    } catch (err) {
      throw new Error("Couldn't add this Doctor Error message:" + err);
    }
  }
  // delete Doctor by id
  async delete(id: number): Promise<number> {
    try {
      if (id && typeof id === 'number') {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'DELETE FROM Doctors WHERE id=($1)';
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
      throw new Error("Couldn't delete this Doctor Error message:" + err);
    }
  }
  // get Doctor by specialization
  async getDoctorBySpecialization(specialization: string): Promise<Doctor> {
    try {
      if (specialization && typeof specialization === 'string') {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'SELECT * FROM Doctors WHERE specialization=$1;';
        //exexute query
        const result = await conn.query(sql, [specialization]);
        //close connection
        conn.release();
        const Doctor: Doctor = result.rows[0];
        return Doctor;
      } else {
        throw new Error('You have entered wrong id');
      }
    } catch (err) {
      throw new Error("Couldn't get this Doctor Error message:" + err);
    }
  }
}

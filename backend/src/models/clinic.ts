import Client from '../database';
import dotenv from 'dotenv';

// to use .env file variables
dotenv.config();

// define Clinic type
export type Clinic = {
  id?: number;
  name: string;
  address?: string;
};
// define class for all needed functions to be used
export class ClinicClinic {
  // get all clinics
  async index(): Promise<Clinic[]> {
    try {
      // database connection
      const conn = await Client.connect();
      //sql query
      const sql = 'SELECT * FROM clinics;';
      //exexute query
      const result = await conn.query(sql);
      //close connection
      conn.release();
      const clinicsList: Clinic[] = result.rows;
      return clinicsList;
    } catch (err) {
      throw new Error("Couldn't get all clinics Error message:" + err);
    }
  }
  // get clinic by id
  async show(id: number): Promise<Clinic> {
    try {
      if (id && typeof id === 'number') {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'SELECT * FROM clinics WHERE id=$1;';
        //exexute query
        const result = await conn.query(sql, [id]);
        //close connection
        conn.release();
        const clinic: Clinic = result.rows[0];
        return clinic;
      } else {
        throw new Error('You have entered wrong id');
      }
    } catch (err) {
      throw new Error("Couldn't get this clinic Error message:" + err);
    }
  }
  // create new clinic
  async create(clinic: Clinic): Promise<Clinic> {
    try {
      // database connection
      const conn = await Client.connect();
      const name = clinic.name;
      const address = clinic.address;
      if (
        name &&
        name != '' &&
        address &&
        address != ''
      ) {
        // console.log(name);
        //sql query
        const sql =
          'INSERT INTO clinics (name,address) VALUES($1,$2) RETURNING *;';
        //exexute query
        const result = await conn.query(sql, [name, address]);
        //close connection
        conn.release();
        const newClinic: Clinic = result.rows[0];
        // console.log(newClinic);
        return newClinic;
      } else {
        throw new Error('Data missing');
      }
    } catch (err) {
      throw new Error("Couldn't add this clinic Error message:" + err);
    }
  }
  // update clinic by id
  async update(clinic: Clinic): Promise<Clinic> {
    try {
      // database connection
      const conn = await Client.connect();
      const id = clinic.id;
      const name = clinic.name;
      const address = clinic.address;
      if (
        name &&
        name != '' &&
        address &&
        address != '' 
      ) {
        //sql query
        const sql =
          'UPDATE clinics SET name=($2),address=($3) WHERE id=($1) RETURNING *';
        //exexute query
        const result = await conn.query(sql, [id, name, address]);
        //close connection
        conn.release();
        const newClinic: Clinic = result.rows[0];
        return newClinic;
      } else {
        throw new Error('Data missing');
      }
    } catch (err) {
      throw new Error("Couldn't add this clinic Error message:" + err);
    }
  }
  // delete clinic by id
  async delete(id: number): Promise<number> {
    try {
      if (id && typeof id === 'number') {
        // database connection
        const conn = await Client.connect();
        //sql query
        const sql = 'DELETE FROM clinics WHERE id=($1)';
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
      throw new Error("Couldn't delete this clinic Error message:" + err);
    }
  }
}

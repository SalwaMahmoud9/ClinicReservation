//patients.ts node.
import { Request, Response, Application } from 'express';
import { Patient, PatientClinic } from '../models/patient';
import tokenAuthentication from '../middlewares/tokenAuthentication';

// define prodcut Clinic class to use it
const patientClinic = new PatientClinic();

const patientsRoutes = (app: Application): void => {
  //get all patients
  app.get('/patients',tokenAuthentication, index);
  //get patient by id
  app.get('/patients/:id',tokenAuthentication ,show);
  //insert patient
  app.post('/patients', tokenAuthentication, create);
  // update patient by id
  app.put('/patients/:id', tokenAuthentication, update);
  // delete patient by id
  app.delete('/patients/:id', tokenAuthentication, deletePatients);
};
//get all patients
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const patients = await patientClinic.index();
    //check if there is data returned
    if (patients.length > 0) {
      res.json(patients);
    } else {
      res.send('No Result');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
//get patient by id
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if id in params
    if ('id' in req.params) {
      // if id defined
      if (req.params.id != undefined) {
        const id = parseInt(req.params.id as string);
        // if id defined correctly
        if (id > 0) {
          const patient = await patientClinic.show(id);
          // check if there is returned data
          if (patient) {
            res.json(patient);
          } else {
            res.send('No Result');
          }
        } else {
          res.send('Please add correct id greater than 0');
        }
      } else {
        res.send('Check your id');
      }
    } else {
      res.send('Please add your id paramter');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
//insert patient
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    // check params in request
    if (
      'name' in req.body &&
      req.body.name &&
      'phone' in req.body &&
      req.body.phone &&
      'gender' in req.body &&
      req.body.gender &&
      'birthdate' in req.body &&
      req.body.birthdate &&
      'address' in req.body &&
      req.body.address 
    ) {
      const name = req.body.name as string;
      const phone = req.body.phone as string;
      const gender = req.body.gender as string;
      const birthdate = req.body.birthdate as Date;
      const address = req.body.address as string;
      var description = ''
      if('description' in req.body)
      { 
        description = req.body.description as string;
      }
      //check parameters type
      if (typeof name == 'string' && typeof phone == 'string') {
        const patient: Patient = {
             name:name,
             phone:phone,
             gender:gender,
             birthdate:birthdate,
             address:address,
             description:description
        };
        const newPatient = await patientClinic.create(patient);
        console.log(newPatient)
        // check if there is returned data
        if (newPatient) {
          res.json(newPatient);
        } else {
          res.send('No Result');
        }
      } else {
        res.send('Check your parameters type');
      }
    } else {
      res.send('Check your parameters');
    }
    console.log(res)
  } catch (err) {
    // console.log(err)
    res.status(500).send(err);
    // res.send(err);
    
  }
};
// update patient by id
const update = async (req: Request, res: Response): Promise<void> => {
  try {
    if (
      'id' in req.params &&
      req.params.id &&
      'name' in req.body &&
      req.body.name &&
      'phone' in req.body &&
      req.body.phone &&
      'gender' in req.body &&
      req.body.gender &&
      'birthdate' in req.body &&
      req.body.birthdate &&
      'address' in req.body &&
      req.body.address 
    ) {
      const id = parseInt(req.params.id as string);
      const name = req.body.name as string;
      const phone = req.body.phone as string;
      const gender = req.body.gender as string;
      const birthdate = req.body.birthdate as Date;
      const address = req.body.address as string;
      var description = ''
      if('description' in req.body)
      {
        description = req.body.description as string;
      }
      const parsedBirthdate = new Date(req.body.birthdate);
      // check params types
      if (
        typeof id == 'number' &&
        typeof name == 'string' &&
        typeof phone == 'string'
      ) {
        const patient: Patient = {
          id: id,
          name:name,
          phone:phone,
          gender:gender,
          birthdate:birthdate,
          address:address,
          description:description
        };
        const newPatient = await patientClinic.update(patient);
        //check if there is returned data
        if (newPatient) {
          res.json(newPatient);
        } else {
          res.send('No Result');
        }
      } else {
        res.send('Check your parameters type');
      }
    } else {
      res.send('Check your parameters');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
// delete patient by id
const deletePatients = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if id in params
    if ('id' in req.params && req.params.id) {
      const id = parseInt(req.params.id as string);
      // if id defined correctly
      if (id > 0) {
        // get no of deleted patients
        const noOfDeletedOrders = await patientClinic.delete(id);
        res.json(noOfDeletedOrders);
      } else {
        res.send('Please add correct id greater than 0');
      }
    } else {
      res.send('Check your id');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export default patientsRoutes;

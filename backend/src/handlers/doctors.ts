//doctors.ts node.
import { Request, Response, Application } from 'express';
import { Doctor, DoctorClinic } from '../models/doctor';
import tokenAuthentication from '../middlewares/tokenAuthentication';

// define prodcut Clinic class to use it
const doctorClinic = new DoctorClinic();

const doctorsRoutes = (app: Application): void => {
  //get all doctors
  app.get('/doctors',tokenAuthentication, index);
  //get doctor by id
  app.get('/doctors/:id',tokenAuthentication ,show);
  //insert doctor
  app.post('/doctors', tokenAuthentication, create);
  // update doctor by id
  app.put('/doctors/:id', tokenAuthentication, update);
  // delete doctor by id
  app.delete('/doctors/:id', tokenAuthentication, deleteDoctors);
};
//get all doctors
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const doctors = await doctorClinic.index();
    //check if there is data returned
    if (doctors.length > 0) {
      res.json(doctors);
    } else {
      res.send('No Result');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
//get doctor by id
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if id in params
    if ('id' in req.params) {
      // if id defined
      if (req.params.id != undefined) {
        const id = parseInt(req.params.id as string);
        // if id defined correctly
        if (id > 0) {
          const doctor = await doctorClinic.show(id);
          // check if there is returned data
          if (doctor) {
            res.json(doctor);
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
//insert doctor
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
      req.body.address &&
      'degree' in req.body &&
      req.body.degree &&
      'specialization' in req.body &&
      req.body.specialization
    ) {
      const name = req.body.name as string;
      const phone = req.body.phone as string;
      const gender = req.body.gender as string;
      const birthdate = req.body.birthdate as Date;
      const address = req.body.address as string;
      const degree = req.body.degree as string;
      const specialization = req.body.specialization as string;
      var description = ''
      if ('description' in req.body)
      {
         description = req.body.description as string;
      }
      //check parameters type
      if (typeof name == 'string' && typeof phone == 'string') {
        const doctor: Doctor = {
             name:name,
             phone:phone,
             gender:gender,
             birthdate:birthdate,
             address:address,
             degree:degree,
             specialization:specialization,
             description:description
        };
        const newDoctor = await doctorClinic.create(doctor);
        // check if there is returned data
        if (newDoctor) {
          res.json(newDoctor);
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
    // console.log(err)
    // res.status(500).send(err);
    res.send(err);
    
  }
};
// update doctor by id
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
      req.body.address &&
      'degree' in req.body &&
      req.body.degree &&
      'specialization' in req.body &&
      req.body.specialization 
      
) {
      const id = parseInt(req.params.id as string);
      const name = req.body.name as string;
      const phone = req.body.phone as string;
      const gender = req.body.gender as string;
      const birthdate = req.body.birthdate as Date;
      const address = req.body.address as string;
      const degree = req.body.degree as string;
      const specialization = req.body.specialization as string;
      var description =''
      if('description' in req.body)
      {
         description = req.body.description as string;
      }
      const parsedBirthdate = new Date(req.body.birthdate);
      if (isNaN(parsedBirthdate.getTime())) {
          res.status(400).send("Invalid birthdate format.");
          return;
      }
      // check params types
      if (
        typeof id == 'number' &&
        typeof name == 'string' &&
        typeof phone == 'string'
      ) {
        const doctor: Doctor = {
          id: id,
          name:name,
          phone:phone,
          gender:gender,
          birthdate:birthdate,
          address:address,
          degree:degree,
          specialization:specialization,
          description:description
        };
        const newDoctor = await doctorClinic.update(doctor);
        //check if there is returned data
        if (newDoctor) {
          res.json(newDoctor);
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
// delete doctor by id
const deleteDoctors = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if id in params
    if ('id' in req.params && req.params.id) {
      const id = parseInt(req.params.id as string);
      // if id defined correctly
      if (id > 0) {
        // get no of deleted doctors
        const noOfDeletedOrders = await doctorClinic.delete(id);
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

export default doctorsRoutes;

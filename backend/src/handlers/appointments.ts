//appointments.ts node.
import { Request, Response, Application } from 'express';
import { Appointment, AppointmentClinic } from '../models/appointment';
import tokenAuthentication from '../middlewares/tokenAuthentication';

// define prodcut Clinic class to use it
const appointmentClinic = new AppointmentClinic();

const appointmentsRoutes = (app: Application): void => {
  //get all appointments
  app.get('/appointments',tokenAuthentication, index);
  //get appointment by id
  app.get('/appointments/:id',tokenAuthentication ,show);
  //get appointment Filter
  // [OPTIONAL] Appointments Filter (args: appointment clinic_id,,patient_id,patient_id)
  app.get(
    '/appointmentsFilter/:doctor_id/:patient_id/:clinic_id/:date',
    tokenAuthentication,
    getAppointmentByFilter
  );
  //insert appointment
  app.post('/appointments', create);
  // update appointment by id
  app.put('/appointments/:id', tokenAuthentication, update);
  // delete appointment by id
  app.delete('/appointments/:id', tokenAuthentication, deleteAppointments);
};
//get all appointments
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const appointments = await appointmentClinic.index();
    //check if there is data returned
    if (appointments.length > 0) {
      res.json(appointments);
    } else {
      res.send('No Result');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
//get appointment by id
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if id in params
    if ('id' in req.params) {
      // if id defined
      if (req.params.id != undefined) {
        const id = parseInt(req.params.id as string);
        // if id defined correctly
        if (id > 0) {
          const appointment = await appointmentClinic.show(id);
          // check if there is returned data
          if (appointment) {
            res.json(appointment);
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
// // get appointmentSearch
const getAppointmentByFilter = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    
    // check category in request
    if ('doctor_id' in req.params &&
        'patient_id' in req.params &&
        'clinic_id' in req.params) {
      if (req.params.doctor_id &&
        req.params.patient_id &&
        req.params.clinic_id) {
        const doctor_id = parseInt(req.params.doctor_id as string);
        const patient_id = parseInt(req.params.patient_id as string);
        const clinic_id = parseInt(req.params.clinic_id as string);
        const dateString = req.params.date as string;
        console.log(dateString);
        // const date = new Date(dateString); // Convert string to Date
        const appointments = await appointmentClinic.getAppointmentByFilter(doctor_id, patient_id, clinic_id,dateString);
        //check if there is data returned
        if (appointments.length > 0) {
          res.json(appointments);
        } else {
          res.send('No Result');
        }
      } else {
        res.send('Check your id');
      }
    } else {
      res.send('check category in params');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
//insert appointment
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    // check params in request
    console.log('start Create');
    console.log(req.body);
    if (
      'user_id' in req.body &&
      req.body.user_id &&
      'doctor_id' in req.body &&
      req.body.doctor_id &&
      'patient_id' in req.body &&
      req.body.patient_id &&
      'clinic_id' in req.body &&
      req.body.clinic_id &&
      'date' in req.body &&
      req.body.date &&
      'diagnosis' in req.body &&
      req.body.diagnosis &&
      'description' in req.body &&
      req.body.description
    ) {
      const doctor_id = parseInt(req.body.doctor_id as string);
      const patient_id = parseInt(req.body.patient_id as string);
      const clinic_id = parseInt(req.body.clinic_id as string);
      const user_id = parseInt(req.body.user_id as string);
      const date = req.body.date as Date;
      const diagnosis = req.body.diagnosis as string;
      const description = req.body.description as string;
      //check parameters type
      if (typeof user_id == 'number' && typeof doctor_id == 'number') {
        const appointment: Appointment = {
             user_id:user_id,
             doctor_id:doctor_id,
             patient_id:patient_id,
             clinic_id:clinic_id,
             date:date,
             description:description,
             diagnosis:diagnosis
        };
        const newAppointment = await appointmentClinic.create(appointment);
        // check if there is returned data
        if (newAppointment) {
          res.json(newAppointment);
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
// update appointment by id
const update = async (req: Request, res: Response): Promise<void> => {
  try {
    if (
      'id' in req.params &&
      req.params.id &&
      'doctor_id' in req.body &&
      req.body.doctor_id &&
      'patient_id' in req.body &&
      req.body.patient_id &&
      'date' in req.body &&
      req.body.date &&
      'clinic_id' in req.body &&
      req.body.clinic_id &&
      'user_id' in req.body &&
      req.body.user_id &&
      'diagnosis' in req.body &&
      req.body.diagnosis &&
      'description' in req.body &&
      req.body.description
    ) {
      const id = parseInt(req.params.id as string);
      const doctor_id = parseInt(req.body.doctor_id as string);
      const patient_id = parseInt(req.body.patient_id as string);
      const date = req.body.date as Date;
      const clinic_id = parseInt(req.body.clinic_id as string);
      const user_id = parseInt(req.body.user_id as string);
      const diagnosis = req.body.diagnosis as string;
      const description = req.body.description as string;
      const parsedBirthdate = new Date(req.body.date);
      if (isNaN(parsedBirthdate.getTime())) {
          res.status(400).send("Invalid date format.");
          return;
      }
      // check params types
      if (
        typeof id == 'number' &&
        typeof doctor_id == 'number'
      ) {
        const appointment: Appointment = {
          id: id,
          doctor_id:doctor_id,
          patient_id:patient_id,
          date:date,
          clinic_id:clinic_id,
          user_id:user_id,
          diagnosis:diagnosis,
          description:description
        };
        const newAppointment = await appointmentClinic.update(appointment);
        //check if there is returned data
        if (newAppointment) {
          res.json(newAppointment);
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
// delete appointment by id
const deleteAppointments = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if id in params
    if ('id' in req.params && req.params.id) {
      const id = parseInt(req.params.id as string);
      // if id defined correctly
      if (id > 0) {
        // get no of deleted appointments
        const noOfDeletedOrders = await appointmentClinic.delete(id);
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

export default appointmentsRoutes;

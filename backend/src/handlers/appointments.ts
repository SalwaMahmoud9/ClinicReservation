// import all needed files
import tokenAuthentication from '../middlewares/tokenAuthentication';
import { Request, Response, Application } from 'express';
import { AppointmentClinic } from '../models/appointment';

// define user Store class to use it
const appointmentClinic = new AppointmentClinic();
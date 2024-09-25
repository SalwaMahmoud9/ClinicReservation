import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/users';
import doctorRoutes from './handlers/doctors';
import patientRoutes from './handlers/patients';
import clinicRoutes from './handlers/clinics';
import appointmentRoutes from './handlers/appointments';

const address = '0.0.0.0:5000';

// define express
const app = express();
// //define port
// const port = 3000;

app.use(bodyParser.json());

userRoutes(app);
doctorRoutes(app);
patientRoutes(app);
clinicRoutes(app);
appointmentRoutes(app);

app.get('/', function (req: Request, res: Response) {
  res.send('start');
});

app.listen(5000, function () {
  console.log(`starting app on: ${address}`);
});

export default app;

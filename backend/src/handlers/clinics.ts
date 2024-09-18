//clinics.ts node.
import { Request, Response, Application } from 'express';
import { Clinic, ClinicClinic } from '../models/clinic';
import tokenAuthentication from '../middlewares/tokenAuthentication';

// define prodcut Clinic class to use it
const clinicClinic = new ClinicClinic();

const clinicsRoutes = (app: Application): void => {
  //get all clinics
  app.get('/clinics',tokenAuthentication, index);
  //get clinic by id
  app.get('/clinics/:id',tokenAuthentication ,show);
  // get clinic by category
  //[OPTIONAL] Clinics by category (args: clinic category)
//   app.get(
//     '/clinicsCategory/:category',
//     tokenAuthentication,
//     getClinicByCategory
//   );
  //insert clinic
  app.post('/clinics', tokenAuthentication, create);
  // update clinic by id
  app.put('/clinics/:id', tokenAuthentication, update);
  // delete clinic by id
  app.delete('/clinics/:id', tokenAuthentication, deleteClinics);
};
//get all clinics
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    const clinics = await clinicClinic.index();
    //check if there is data returned
    if (clinics.length > 0) {
      res.json(clinics);
    } else {
      res.send('No Result');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
//get clinic by id
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if id in params
    if ('id' in req.params) {
      // if id defined
      if (req.params.id != undefined) {
        const id = parseInt(req.params.id as string);
        // if id defined correctly
        if (id > 0) {
          const clinic = await clinicClinic.show(id);
          // check if there is returned data
          if (clinic) {
            res.json(clinic);
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
// // get clinic by category
// const getClinicByCategory = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     // check category in request
//     if ('category' in req.params) {
//       if (req.params.category) {
//         const category = req.params.category as string;
//         const clinic = await clinicClinic.getClinicByCategory(category);
//         // check if there is returned data
//         if (clinic) {
//           res.json(clinic);
//         } else {
//           res.send('No Result');
//         }
//       } else {
//         res.send('Check your id');
//       }
//     } else {
//       res.send('check category in params');
//     }
//   } catch (err) {
//     res.status(500).send(err);
//   }
// };
//insert clinic
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    // check params in request
    if (
      'name' in req.body &&
      req.body.name &&
      'address' in req.body &&
      req.body.address
    ) {
      const name = req.body.name as string;
      const address = req.body.address as string;
      
      //check parameters type
      if (typeof name == 'string') {
        const clinic: Clinic = {
             name:name,
             address:address
        };
        const newClinic = await clinicClinic.create(clinic);
        // check if there is returned data
        if (newClinic) {
          res.json(newClinic);
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
// update clinic by id
const update = async (req: Request, res: Response): Promise<void> => {
  try {
    if (
      'id' in req.params &&
      req.params.id &&
      'name' in req.body &&
      'address' in req.body &&
      req.body.address
    ) {
      const id = parseInt(req.params.id as string);
      const name = req.body.name as string;
      const address = req.body.address as string;
      if (
        typeof id == 'number' &&
        typeof name == 'string'
      ) {
        const clinic: Clinic = {
          id: id,
          name:name,
          address:address
        };
        const newClinic = await clinicClinic.update(clinic);
        //check if there is returned data
        if (newClinic) {
          res.json(newClinic);
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
// delete clinic by id
const deleteClinics = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if id in params
    if ('id' in req.params && req.params.id) {
      const id = parseInt(req.params.id as string);
      // if id defined correctly
      if (id > 0) {
        // get no of deleted clinics
        const noOfDeletedOrders = await clinicClinic.delete(id);
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

export default clinicsRoutes;

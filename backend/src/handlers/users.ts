// import all needed files
import { Request, Response, Application } from 'express';
import { User, UserClinic } from '../models/user';
import jwt from 'jsonwebtoken';
import tokenAuthentication from '../middlewares/tokenAuthentication';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
// to use .env file variables
dotenv.config();
// add pepper and salt to be used in hash password
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

// define user Store class to use it
const userClinic = new UserClinic();

const userRoutes = (app: Application): void => {
  //get all users
  app.get('/users', tokenAuthentication, index);
  //get all users by id
  app.get('/users/:id', tokenAuthentication, show);
  //create new user
  app.post('/users', create);
  // update user by id
  app.put('/users/:id', tokenAuthentication, update);
  // delete user by id
  app.delete('/users/:id', tokenAuthentication, deleteUser);
  // authenticate user
  // app.post('/users/:username', authenticate);
  app.post('/login', authenticate);
};
//get all users
const index = async (req: Request, res: Response): Promise<void> => {
  try {
    // get all users
    const users = await userClinic.index();
    if (users.length > 0) {
      res.json(users);
    } else {
      res.send('No Result');
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
//get all users by id
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if id in params
    if ('id' in req.params) {
      if (req.params.id) {
        const id = parseInt(req.params.id as string);
        // if id defined correctly
        if (id > 0) {
          const user = await userClinic.show(id);
          // check if there is returned data
          if (user) {
            res.json(user);
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
//create new user
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    // check params in request
    if (
      'username' in req.body &&
      req.body.username &&
      'type' in req.body &&
      req.body.type &&
      'password' in req.body &&
      req.body.password
    ) {
      const username = req.body.username as string;
      const type = req.body.type as string;
      const password = req.body.password as string;
      //check parameters type
      if (
        typeof password == 'string' &&
        typeof type == 'string' &&
        typeof username == 'string'
      ) {
        const user: User = {
          username: username,
          type: type,
          password: password
        };
        const newUser = await userClinic.create(user);
        // check if there is returned data
        if (newUser) {
          res.json(newUser);
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
// update user by id
const update = async (req: Request, res: Response): Promise<void> => {
  try {
    // check params in request
    if (
      'id' in req.params &&
      req.params.id &&
      'username' in req.body &&
      req.body.username &&
      'type' in req.body &&
      req.body.type &&
      'password' in req.body &&
      req.body.password
    ) {
      const id = parseInt(req.params.id as string);
      const username = req.body.username as string;
      const type = req.body.type as string;
      const password = req.body.password as string;
      const oldPassword = req.body.oldPassword as string;
    
      var savedOldPass = ''
      const user = await userClinic.show(id);
      if(user)
      {
        savedOldPass = user.password
      }
      console.log("savedOldPass"+savedOldPass)
      //check parameters types
      if (
        typeof id == 'number' &&
        typeof password == 'string' &&
        typeof type == 'string' &&
        typeof username == 'string' && bcrypt.compareSync(oldPassword + pepper, savedOldPass)
      ) {
        const user: User = {
          id: id,
          username: username,
          type: type,
          password: password
        };

        const newUser = await userClinic.update(user);
        // check if there is returned data
        if (newUser) {
          res.json(newUser);
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
// delete user by id
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    // check if id in params
    if ('id' in req.params && req.params.id) {
      const id = parseInt(req.params.id as string);
      // if id defined correctly
      if (id > 0) {
        // get no of deleted users
        const noOfDeletedOrders = await userClinic.delete(id);
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
// authenticate user
const authenticate = async (req: Request, res: Response): Promise<void> => {
  try {
    //check params in request
    if (
      'username' in req.body &&
      req.body.username &&
      'password' in req.body &&
      req.body.password
    ) {
      const username = req.body.username as string;
      const password = req.body.password as string;
      // get token secret from .env file
      const tokenSecret = process.env.TOKEN_SECRET as string;
      //check params type
      if (typeof password == 'string' && typeof username == 'string') {
        const newUser = await userClinic.authenticate(username, password);
        // set token
        const token = jwt.sign(
          {
            user: {
              id: newUser.id,
              name: newUser.username,
              type: newUser.type
            }
          },
          tokenSecret
        );
        res.json(token);
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

export default userRoutes;

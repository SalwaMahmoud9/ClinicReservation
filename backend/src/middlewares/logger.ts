// this is a logger to use middleware
import { Request, Response, NextFunction } from 'express';
const logger = (req: Request, res: Response, next: NextFunction): void => {
  next();
};
export default logger;

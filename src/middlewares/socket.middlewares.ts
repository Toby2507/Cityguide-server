import { NextFunction, Request, Response } from 'express';
import app from '../app';

const addSocketToRequest = async (req: Request, res: Response, next: NextFunction) => {
  res.locals.io = app.get('socketConn');
  next();
};

export default addSocketToRequest;

import { NextFunction, Request, Response } from "express";
import Errorhandler from "../Utils/Utilityclas.js";
import { Controllertype } from "../Types/Types.js";

export const Errormiddleware = (
  err: Errorhandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message ||= "Internal Server Error";
  err.statuscode ||= 500;

  return res.status(err.statuscode).json({
      success: false,
      message: err.message,
    });
};

export const TryCatch =
  (func: Controllertype) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req, res, next)).catch(next);
  };

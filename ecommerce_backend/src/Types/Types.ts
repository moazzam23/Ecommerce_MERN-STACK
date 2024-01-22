import { NextFunction, Request, Response } from "express";

export interface NewUserData {
  name: string;
  email: string;
  _id: string;
  gender: string;
  image: string;
  dob: Date;
}
export interface NewProductgData {
  name: string;
  price: number;
  stock: number;
  category: string;
}

export type Controllertype = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

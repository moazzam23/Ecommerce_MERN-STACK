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

export type Searchtype={
  category?:string;
  price?:number;
  search?:string;
  sort?:string;
  page?:string;
}

export interface basequery {
  name?:{
    $regex:string,
    $options:string
  },
  price?:{$lte:number};
    category?:string;

}

export type Revalidatecahesprops={
  product?:boolean,
  order?:boolean,
  admin?:boolean,
}
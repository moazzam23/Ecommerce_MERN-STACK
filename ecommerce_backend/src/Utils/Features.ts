import mongoose from "mongoose";
import { Revalidatecahesprops } from "../Types/Types.js";

export const ConnectDB = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/", {
    dbName: "Ecommerce_App",

  })
  .then(() => {
    console.log(`DB is connected to ${mongoose.connection.host}`);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
};

export const revalidateCaches= ({product,order,admin}:Revalidatecahesprops)=>{

  if(product){
    
  }
  if(order){

  }
  if(admin){

  }

}

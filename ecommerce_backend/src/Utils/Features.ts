import mongoose from "mongoose";
import { OrderItems, Revalidatecahesprops } from "../Types/Types.js";
import { MyCache } from "../App.js";
import { Product } from "../model/Product.js";
import { Order } from "../model/Order.js";

export const ConnectDB = (URI :string) => {
  mongoose.connect(URI, {
    dbName: "Ecommerce_App",

  })
  .then(() => {
    console.log(`DB is connected to ${mongoose.connection.host}`);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
};

export const revalidateCaches= async ({product,order,admin, userID}:Revalidatecahesprops)=>{

  if(product){
    const revalidateprop : string[]=["product-category","All-product","Latest-products"];
  const product = await Product.find({}).select("_id")

  product.forEach((i)=>{
revalidateprop.push(`products- ${i._id}`)
  })
    

    MyCache.del(revalidateprop)
  }
  if(order){
    const orderkey: string[]=["All-order",`myorder-${userID}`];
const order = await Order.find({}).select("_id")

order.forEach((i)=>{
orderkey.push(`Order-${i._id}`)
})
MyCache.del(orderkey)
  }
  if(admin){

  }

}


export const ReduceStock= async (order:OrderItems[])=>{
  for (let i = 0; i < order.length; i++) {
    const Order = order[i];
    
    const product = await Product.findById(Order.productID);

    if(!product) throw new Error("Product Not Found")

    product.stock -= Order.quantity;

    await product.save();
  }


}

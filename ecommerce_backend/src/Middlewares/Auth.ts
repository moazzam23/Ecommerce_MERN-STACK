import Errorhandler from "../Utils/Utilityclas.js";
import { User } from "../model/User.js";
import { TryCatch } from "./Error.js";

export const Adminonly = TryCatch(async(req,res,next)=>{

    const {id} = req.query;

    if(!id) return next(new Errorhandler("Unauthorized, Only Admin have Access", 401));
    
    const user = await User.findById(id);
    if(!user) return next(new Errorhandler("User Not Found", 400));

    if(user.role !== "admin") return next( new Errorhandler("You have no Admin Access", 400))

    next();
})
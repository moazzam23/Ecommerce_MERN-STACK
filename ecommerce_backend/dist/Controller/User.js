import { User } from "../model/User.js";
import { TryCatch } from "../Middlewares/Error.js";
import Errorhandler from "../Utils/Utilityclas.js";
export const Newuser = TryCatch(async (req, res, next) => {
    const { name, email, gender, dob, image, _id } = req.body;
    let user = await User.findById(_id);
    if (user) {
        return res.status(200).json({
            success: true,
            message: `welcome  ${user.name}`,
        });
    }
    if (!name || !email || !gender || !dob || !image || !_id)
        return next(new Errorhandler("All Fields are required", 400));
    user = await User.create({
        name,
        email,
        gender,
        dob: new Date(dob),
        image,
        _id,
    });
    return res.status(200).json({
        success: true,
        user,
        message: `Welcome ${user.name}`,
    });
});
export const Allusers = TryCatch(async (req, res, next) => {
    const user = await User.find({});
    return res.status(200).json({
        success: true,
        user,
    });
});
export const getUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
        return next(new Errorhandler("Invalid Id No User Found", 400));
    return res.status(200).json({
        success: true,
        user,
    });
});
export const deleteUser = TryCatch(async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user)
        return next(new Errorhandler("Invalid Id No User Found", 400));
    await user.deleteOne();
    return res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});

import mongoose from "mongoose";
import validator from "validator";
const userschema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "Please enter ID"]
    },
    image: {
        type: String,
        required: [true, "Please add Photo"]
    },
    name: {
        type: String,
        required: [true, "Please enter Name"]
    },
    email: {
        type: String,
        unique: [true, "Emial Already Exist"],
        required: [true, "Please enter email"],
        validate: validator.default.isEmail
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please enter Gender"]
    },
    dob: {
        type: Date,
        required: [true, "Please enter Date of Birth"]
    },
}, {
    timestamps: true,
});
userschema.virtual('age').get(function () {
    const birthDate = this.dob;
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    if (currentDate < new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
        return age - 1;
    }
    return age;
});
export const User = mongoose.model("User", userschema);

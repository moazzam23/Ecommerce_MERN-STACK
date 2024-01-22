import mongoose from "mongoose";
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

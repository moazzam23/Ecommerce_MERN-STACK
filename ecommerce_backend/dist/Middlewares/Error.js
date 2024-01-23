export const Errormiddleware = (err, req, res, next) => {
    err.message || (err.message = "Internal Server Error");
    err.statuscode || (err.statuscode = 500);
    if (err.name === "CastError")
        err.message = "Invalid ID";
    // if(err.statuscode === 11000) err.message= "Duplicate Data"
    return res.status(err.statuscode).json({
        success: false,
        message: err.message,
    });
};
export const TryCatch = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};

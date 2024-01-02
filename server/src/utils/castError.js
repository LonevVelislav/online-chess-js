const { MongooseError } = require("mongoose");
const { JsonWebTokenError } = require("jsonwebtoken");

const castError = (err) => {
    if (err.name === "CastError") {
        return "404: Ivalid Path!";
    }
    if (err instanceof MongooseError) {
        const msgs = Object.values(err.errors).map((el) => el.message);
        return msgs[0];
    }
    if (err.name === "MongoServerError" && err.code === 11000) {
        const msg = "username already in use!";
        return msg;
    }

    if (err instanceof JsonWebTokenError) {
        const msg = "Not authorized login to get access!";
        return msg;
    }

    return err.message;
};

module.exports = castError;

const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;
const expiresIn = process.env.TOKEN_EXPARATION;

const signUserToken = (id) => {
    return jwt.sign({ id: id }, secret, {
        expiresIn,
    });
};

exports.createAndSendToken = (user, statusCode, res) => {
    const token = signUserToken(user._id);

    const cookieOptions = {
        expiresIn: new Date(Date.now() + expiresIn * 24 * 60 * 60 * 10000),
        httpOnly: true,
        secure: true,
    };

    res.cookie("jwt", token, cookieOptions);
    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user,
        },
    });
};

const router = require("express").Router();

const User = require("../models/User");
const castError = require("../utils/castError");
const uploadPhoto = require("../middlewares/uploadPhoto");
const { createAndSendToken } = require("../utils/userToken");
const { protect } = require("../middlewares/authMiddleware");

router.post("/register", async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
            password: req.body.password,
            guest: req.body.guest,
        });

        createAndSendToken(newUser, 200, res);
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: castError(err),
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new Error("pleace provide username and password");
        }
        const user = await User.findOne({ username }).select("+password");
        if (!user || !(await user.correntPassword(password, user.password))) {
            throw new Error("invalid username or password");
        }
        createAndSendToken(user, 200, res);
    } catch (err) {
        res.status(401).json({
            status: "fail",
            message: castError(err),
        });
    }
});

router.patch("/updateUser", protect, uploadPhoto(), async (req, res) => {
    try {
        if (req.body.password) {
            throw new Error("cant change password!");
        }
        const updatedObj = {};
        console.log(req.body);
        if (req.file) {
            updatedObj.imagefile = req.file;
            updatedObj.image = req.file.originalname;
        }
        if (req.body.username) {
            updatedObj.username = req.body.username;
        }

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { ...updatedObj },
            { runValidators: true, new: true }
        );

        res.status(200).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: castError(err),
        });
    }
});

module.exports = router;

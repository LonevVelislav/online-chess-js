const router = require("express").Router();

const User = require("../models/User");
const castError = require("../utils/castError");
const uploadPhoto = require("../middlewares/uploadPhoto");
const { createAndSendToken } = require("../utils/userToken");
const { protect } = require("../middlewares/authMiddleware");

router.get("/exist/:id", async (req, res) => {
    try {
        const userExist = await User.findById(req.params.id);
        console.log(userExist);
        if (userExist) {
            res.status(200).json({
                status: "success",
                data: {
                    exist: true,
                },
            });
        } else {
            res.status(200).json({
                status: "success",
                data: {
                    exist: false,
                },
            });
        }
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: castError(err),
        });
    }
});

router.post("/register", async (req, res) => {
    try {
        const newUser = await User.create({
            username: req.body.username,
        });

        createAndSendToken(newUser, 200, res);
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: castError(err),
        });
    }
});

router.patch("/updateUser", protect, uploadPhoto(), async (req, res) => {
    try {
        const updatedObj = {};
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

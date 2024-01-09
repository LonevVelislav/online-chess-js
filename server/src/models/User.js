const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is requred!"],
        unique: true,
        trim: true,
        maxLength: [20, "username is too long, 20 characters max"],
    },
    password: {
        type: String,
        required: [true, "password is required!"],
        minlength: [3, "password must be at least 3 characters long"],
        trim: true,
        select: false,
    },
    playing: {
        type: Boolean,
    },
});

userSchema.pre("save", async function (next) {
    if (this.isNew) {
        this.password = await bcrypt.hash(this.password, 12);
        this.playing = false;
    }
    next();
});

userSchema.methods.correntPassword = async function (
    incomPassowrd,
    correctPassword
) {
    return await bcrypt.compare(incomPassowrd, correctPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

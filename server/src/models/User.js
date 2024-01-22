const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs-extra");
const sharp = require("sharp");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is requred!"],
        unique: true,
        trim: true,
        maxLength: [50, "username is too long, 50 characters max"],
    },
    playing: {
        type: Boolean,
    },
    imagefile: {
        type: Object,
        default: {},
        select: false,
    },
    image: {
        type: String,
        default: "default.jpeg",
    },
});

userSchema.pre(/^find/, async function (next) {
    if (this.op === "findOneAndUpdate" && this._update.imagefile) {
        const pathToServer = path.resolve("../server/src/public/photos");
        const dir = `${pathToServer}/${this._conditions._id}`;
        this.filename = this._update.imagefile.originalname;

        if (fs.existsSync(dir)) {
            await fs.emptyDir(dir);
            if (this._update.imagefile) {
                sharp(this._update.imagefile.buffer)
                    .resize(500, 500)
                    .toFormat("jpeg")
                    .jpeg({ quality: 90 })
                    .toFile(`${dir}/${this.filename}`);
            }
        } else {
            fs.mkdirSync(dir, { recursive: true });
            if (this._update.imagefile) {
                sharp(this._update.imagefile.buffer)
                    .resize(500, 500)
                    .toFormat("jpeg")
                    .jpeg({ quality: 90 })
                    .toFile(`${dir}/${this.filename}`);
            }
        }
    }
    this.imagefile = undefined;
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

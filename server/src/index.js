const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config();
const router = require("./router");

app.use(cors());

//config
app.use(express.json());

mongoose
    .connect(
        process.env.DATABASE.replace("<PASSWORD>", process.env.PASSWORD_DB)
    )
    .then(() => console.log("DB connection successfull"))
    .catch((err) => console.log("Failed to connect to DB!"));

app.use("/", router);
app.use("*", (req, res) => {
    res.redirect("/404");
});

app.listen(process.env.PORT, () =>
    console.log(`app is running on port... ${process.env.PORT}`)
);

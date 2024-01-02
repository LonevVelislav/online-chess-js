const router = require("express").Router();

router.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "main app is on 'http://localhost:3010/chess-js/chess-menu'",
    });
});

router.get("/404", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: "Invalid path!",
    });
});

module.exports = router;

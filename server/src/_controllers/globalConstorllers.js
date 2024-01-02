const router = require("express").Router();

router.get("/404", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: "Invalid path!",
    });
});

module.exports = router;

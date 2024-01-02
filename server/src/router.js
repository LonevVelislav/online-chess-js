const router = require("express").Router();
const globalControllers = require("./_controllers/globalConstorllers");
const gameControllers = require("./_controllers/gameControllers");
const userControllers = require("./_controllers/userControllers");

router.use(globalControllers);
router.use("/for-the-king/games", gameControllers);
router.use("/for-the-king/users", userControllers);
module.exports = router;

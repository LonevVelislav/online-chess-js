const router = require("express").Router();
const globalControllers = require("./_controllers/globalConstorllers");
const gameControllers = require("./_controllers/gameControllers");

router.use(globalControllers);
router.use("/for-the-king/chess-menu", gameControllers);
module.exports = router;

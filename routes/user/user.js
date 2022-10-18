const Router = require("express");
const router = new Router();
const userController = require("../controllers/user_controller");
const authMiddleware = require("../middleware/auth_middleware");

router.post("/connect", userController.connect);

module.exports = router;

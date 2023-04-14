const express = require("express");
const userCtrl = require("../controller/userController.js");
const auth = require("../middleware/auth.js");
const { isAdmin } = require("../middleware/roleCheck.js");

const router = express.Router();

router.route("/register").post(userCtrl.registerUser);
router.route("/login").post(userCtrl.loginUser);
router.route("/logout").post(auth, userCtrl.logoutUser);
// router.route("/").get(auth, userCtrl.getUser);
router.route("/all").get(auth, isAdmin, userCtrl.getAllEmp);

module.exports = router;

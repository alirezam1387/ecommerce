const express = require("express");
const router = express.Router();
const { register, login, getRefreshToken, logout } = require("../controllers/Users");

router.post("/create_user", register);
router.post("/login", login);
router.get("/get_access_token", getRefreshToken);
router.delete('/logout', logout)

module.exports = router;

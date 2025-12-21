const express = require("express");
const router = express.Router();
const { register } = require("../controllers/Users");

router.post("/create_user", register);

module.exports = router;

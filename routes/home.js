const path = require("path");
const express = require("express");
const router = express.Router();

const homeController = require("../controller/home");
router.get("/", homeController.getHomePage);

module.exports = router;
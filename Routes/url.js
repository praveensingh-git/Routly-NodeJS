const express = require("express");
const router = express.Router();
const { generateNewShortURL,getAnalytics } = require("../Controllers/url");

router.post("/", generateNewShortURL);
module.exports = router;

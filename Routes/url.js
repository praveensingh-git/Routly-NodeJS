const express = require("express");
const router = express.Router();
const { generateNewShortURL, getAnalytics, deleteURL } = require("../Controllers/url");
router.delete("/:shortId", deleteURL);
router.post("/", generateNewShortURL);
module.exports = router;

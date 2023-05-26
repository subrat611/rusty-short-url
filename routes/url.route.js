const express = require("express");
const {
  handleGenerateShortURL,
  handleRedirectShortURL,
  handleAnalyticsShortURL,
} = require("../controllers/url.controller");

const router = express.Router();

router.post("/", handleGenerateShortURL);

router.get("/:id", handleRedirectShortURL);
router.get("/analytics/:id", handleAnalyticsShortURL);

module.exports = router;

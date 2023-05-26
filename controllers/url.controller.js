const URL = require("../models/url.model");
const { nanoid } = require("nanoid");

async function handleGenerateShortURL(req, res) {
  const url = req.body.url;

  if (!url) {
    return res.status(400).json({ message: "url required" });
  }

  const shortId = nanoid(8);
  await URL.create({
    shortId: shortId,
    redirectURL: url,
    visitHistory: [],
  });
  return res.status(201).json({ id: shortId });
}

async function handleRedirectShortURL(req, res) {
  const shortId = req.params.id;

  // 1st argument -> finding
  // 2nd argument -> updating
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  res.redirect(entry.redirectURL);
}

async function handleAnalyticsShortURL(req, res) {
  const shortId = req.params.id;

  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateShortURL,
  handleRedirectShortURL,
  handleAnalyticsShortURL,
};

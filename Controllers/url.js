const shortid = require("shortid");
const URL = require("../Models/url");


async function generateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });

  const shortID = shortid(8);
  await URL.create({
    shortID: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return res.render("home", { id: shortID });
  //return res.json({ id: shortID });
}

async function getAnalytics(req, res) {
  const shortId = req.params.shortid;
  const result = await URL.findOne({ shortid });
  res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}
async function deleteURL(req, res) {
  const shortId = req.params.shortId;
  
  try {
    // Only allow deletion if the URL belongs to the logged-in user
    const result = await URL.findOneAndDelete({ 
      shortID: shortId,
      createdBy: req.user._id 
    });
    
    if (!result) {
      return res.status(404).json({ error: "URL not found or not authorized" });
    }
    
    return res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ error: "Server error" });
  }
}
module.exports = {
  generateNewShortURL,
  getAnalytics,
  deleteURL
};

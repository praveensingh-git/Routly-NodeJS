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
  });
  return res.render('home',{ id: shortID })
  //return res.json({ id: shortID });
}

async function getAnalytics(req,res){
  const shortId=req.params.shortid
  const result=await URL.findOne({shortid})
  res.json({totalClicks:result.visitHistory.length,analytics:result.visitHistory})
}

module.exports = {
  generateNewShortURL,
  getAnalytics
};

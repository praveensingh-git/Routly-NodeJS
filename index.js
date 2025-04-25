const express = require("express");
const path = require("path");
const cookieParser=require('cookie-parser')
const PORT = 8000;
const app = express();
const URL = require("./Models/url");
const urlRoute = require("./Routes/url");
const {restrictToLoggedinUserOnly,checkAuth}=require('./middleware/auth')

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

const { connectToMongoDB } = require("./connection/connect");
const { getAnalytics } = require("./Controllers/url");
const userRoutes = require("./Routes/user");
const staticRouter = require("./Routes/staticRouter");

connectToMongoDB("mongodb://localhost:27017/short_URL")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.log("Error in connection with MongoDB \n", err);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/test", async (req, res) => {
  // return res.send("<h1>hi from Server</h1>")

  const allURLS = await URL.find({});
  // return res.end(`
  //    <!DOCTYPE html>
  // <html>
  // <head>
  //   <title>URL Shortener</title>
  // </head>
  // <body>
  //   <h1>Shortened URLs</h1>
  //   <ul>
  //     ${allURLS.map(url => `
  //       <li>
  //         Short ID: ${url.shortID} <br>
  //         Original URL: <a href="${url.redirectURL}">${url.redirectURL}</a> <br>
  //         Visits: ${url.visitHistory.length}
  //       </li>
  //     `).join('')}
  //   </ul>
  // </body>
  // </html>
  //   `)
  return res.render("home", {
    urls: allURLS,
  });
});
app.use("/url",restrictToLoggedinUserOnly,urlRoute);
app.use("/user",userRoutes);
app.use("/",checkAuth, staticRouter);
app.get("/url/:shortId", async (req, res) => {
  const entry = await URL.findOneAndUpdate(
    { shortID: req.params.shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } },
    { new: true } // Returns the updated document
  );

  if (!entry) {
    return res.status(404).send("URL not found");
  }

  res.redirect(entry.redirectURL);
});

app.get("/analytics/:shortId", getAnalytics);

app.listen(PORT, () => console.log("Server Started at PORT:" + PORT));

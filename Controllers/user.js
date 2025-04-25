const {v4:uuidv4}=require('uuid')
const User = require("../Models/user");
const { getUser, setUser } = require('../Service/auth');

async function userSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}

async function userLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({email,password});
  if (!user)
    return res.render("login", { error: "Invalid username or password" });

  // const sessionId=uuidv4();
  const token=setUser(user)
  res.cookie('uid',token)
  return res.redirect("/");
}


module.exports = {
  userSignup,
  userLogin,
};

const { getUser } = require("../Service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;
    
    if (!userUid) return res.redirect('/login');
    
    try {
      const user = await getUser(userUid);
      if (!user) {
        res.clearCookie('uid');
        return res.redirect('/login');
      }
      
      req.user = user;
      next();
    } catch (err) {
      console.error("Authentication error:", err);
      res.clearCookie('uid');
      return res.redirect('/login');
    }
  }

async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;
    
    try {
        if (userUid) {
            const user = await getUser(userUid);
            req.user = user; // Attach user if exists
        }
        next(); // Always proceed to next middleware
    } catch (err) {
        console.error("Authentication check error:", err);
        next(); // Still proceed even if error occurs
    }
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth
};
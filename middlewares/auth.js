const Model = require("./../models/user.model");

let auth = (req, res, next) => {
  let token = req.cookies.auth;
  Model.userProfile.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        error: true,
        message:
          "You can't access this page because you have already logged out. Please login again",
        isAuth: false,
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };

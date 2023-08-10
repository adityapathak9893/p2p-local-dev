const Model = require("./../models/user.model");

let auth = (req, res, next) => {
  let token = req.cookies.auth;
  Model.userProfile.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        error: true,
        message: "you are not logged in"
      });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };

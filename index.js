const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Model = require("./models/user.model");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const db = require("./config/config").get(process.env.NODE_ENV);
const { auth } = require("./middlewares/auth");
const path = require("path");

const app = express();
const userProfile = Model.userProfile;
const buyOffers = Model.buyOffers;
const sellOffers = Model.sellOffers;

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function(_, res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"), function(err){
    res.status(500).send(err);
  });
});

// database connection
mongoose.Promise = global.Promise;
mongoose
  .connect(db.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((con) => {
    console.log("database is connected");
  })
  .catch((err) => {
    console.log(err);
  });

// adding new user (sign-up route)
app.post("/api/register", function (req, res) {
  const newuser = new userProfile(req.body);
  userProfile.findOne({ email: newuser.email }).then((user) => {
    if (user)
      return res.status(400).json({ auth: false, message: "email exits" });
    newuser
      .save()
      .then((doc) => {
        res.status(200).json({
          succes: true,
          user: doc,
        });
      })
      .catch((err) => {
        if (err) {
          return res.status(400).json({ success: false });
        }
      });
  });
});

// login user
app.post("/api/login", function (req, res) {
  let token = req.cookies.auth;
  userProfile.findByToken(token, (err, user) => {
    if (err) return res(err);
    if (!!user) {
      return res.status(400).json({
        error: true,
        message: "You are already logged in",
      });
    } else {
      userProfile.findOne({ email: req.body.email }).then(function (user) {
        if (!user)
          return res.json({
            isAuth: false,
            message: " Auth failed ,email not found",
          });

        user.comparepassword(req.body.password, (err, isMatch) => {
          if (!isMatch)
            return res.json({
              isAuth: false,
              message: "password doesn't match",
            });

          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            res.cookie("auth", user.token).json({
              isAuth: true,
              id: user._id,
              email: user.email,
            });
          });
        });
      });
    }
  });
});

// get logged in user
app.get("/api/profile", auth, (req, res) => {
  return res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    phone: req.user.phone,
    userName: req.user.userName,
  });
});

//logout user
app.get("/api/logout", auth, function (req, res) {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200);
  });
});

// place buy offer
app.post("/api/placeBuyOffer", auth, (req, res) => {
  const newBuyOffer = new buyOffers({
    ...req.body,
    email: req.user.email,
    userName: req.user.userName,
  });
  newBuyOffer
    .save()
    .then((doc) => {
      res.status(200).json({
        succes: true,
        buyOffer: doc,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({ success: false });
      }
    });
});

//get only logged-in user's buy offers
app.get("/api/getMyBuyOffers", auth, (req, res) => {
  buyOffers
    .find({ email: req.user.email })
    .then((docs) => {
      res.status(200).json({
        succes: true,
        buyOffers: docs,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({ success: false });
      }
    });
});

//get all buy Offers (this can be seen without login)
app.get("/api/allBuyOffers", (req, res) => {
  buyOffers
    .find()
    .then((docs) => {
      res.status(200).json({
        succes: true,
        buyOffers: docs,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({ success: false });
      }
    });
});

// place sell offer
app.post("/api/placeSellOffer", auth, (req, res) => {
  const newSellOffer = new sellOffers({
    ...req.body,
    email: req.user.email,
    userName: req.user.userName,
  });
  newSellOffer
    .save()
    .then((doc) => {
      res.status(200).json({
        succes: true,
        sellOffer: doc,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({ success: false });
      }
    });
});

//get only logged-in user's sell offers
app.get("/api/getMysellOffers", auth, (req, res) => {
  sellOffers
    .find({ email: req.user.email })
    .then((docs) => {
      res.status(200).json({
        succes: true,
        sellOffers: docs,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({ success: false });
      }
    });
});

//get all sell Offers (this can be seen without login)
app.get("/api/allSellOffers", (req, res) => {
  buyOffers
    .find()
    .then((docs) => {
      res.status(200).json({
        succes: true,
        sellOffers: docs,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({ success: false });
      }
    });
});

// listening port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});

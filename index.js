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
const feedbacks = Model.feedbacks;

const allowedOrigins = [
  "https://gold-careful-drill.cyclic.app",
  "http://localhost:3000",
];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || origin === undefined) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  headers: ["Content-Type"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options("*", cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./client/build")));

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
app.post("/api/signup", function (req, res) {
  const newuser = new userProfile(req.body);
  userProfile.findOne({ email: newuser.email }).then((user) => {
    if (user)
      return res.status(400).json({
        auth: false,
        message: "User's email already exits, Please sign-in",
      });
    newuser
      .save()
      .then((doc) => {
        res.status(200).json({
          success: true,
          user: doc,
        });
      })
      .catch((err) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: "Problem encountered while registering, Please try again",
          });
        }
      });
  });
});

// login user
app.post("/api/signin", function (req, res) {
  let token = req.cookies.auth;
  userProfile.findByToken(token, (err, user) => {
    if (err) return res.send(err);
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
            message: "Auth failed ,email not found",
          });

        user.comparepassword(req.body.password, (err, isMatch) => {
          if (!isMatch)
            return res.json({
              isAuth: false,
              message: "password doesn't match",
            });

          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            res
              .cookie("auth", user.token, {
                sameSite: "none",
                secure: true,
              })
              .json({
                isAuth: true,
                token: user.token,
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
app.get("/api/getSignedInUserProfile", auth, (req, res) => {
  return res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    phone: req.user.phone,
    userName: req.user.userName,
  });
});

//logout user
app.get("/api/signout", auth, function (req, res) {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.status(200).json({
      success: true,
      message: "signed-out successfully",
    });
  });
});

app.post("/api/placeMyBuyOffer", auth, (req, res) => {
  const newBuyOffer = new buyOffers({
    ...req.body,
    email: req.user.email,
    userName: req.user.userName,
  });
  newBuyOffer
    .save()
    .then((doc) => {
      res.status(200).json({
        success: true,
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
        success: true,
        buyOffers: docs,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err });
      }
    });
});

//get all buy Offers (this can be seen without login)
app.get("/api/getBuyOffersWithFilters", (req, res) => {
  const {
    cryptoCurrency,
    minAmount,
    preferredCurrency,
    paymentMethod,
    offerLocation,
    offerOwnerLocation,
  } = req.query;

  const query = {};

  if (cryptoCurrency !== "") {
    query.cryptoCurrency = cryptoCurrency;
  }

  if (minAmount !== "") {
    query.minAmount = { $gte: Number(minAmount) };
  }

  if (preferredCurrency !== "") {
    query.preferredCurrency = preferredCurrency;
  }

  if (paymentMethod !== "") {
    query.paymentMethod = paymentMethod;
  }

  if (offerLocation !== "") {
    query.offerLocation = offerLocation;
  }

  if (offerOwnerLocation !== "") {
    query.offerOwnerLocation = offerOwnerLocation;
  }

  /* const query = {
    cryptoCurrency: cryptoCurrency,
    minAmount: { $gte: Number(minAmount) },
    paymentMethod: paymentMethod,
    preferredCurrency: preferredCurrency,
    offerLocation: offerLocation,
    offerOwnerLocation: offerOwnerLocation,
  }; */
  buyOffers
    .find(query)
    .then((docs) => {
      res.status(200).json({
        success: true,
        buyOffers: docs,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
    });
});

// place sell offer
app.post("/api/placeMySellOffer", auth, (req, res) => {
  const newSellOffer = new sellOffers({
    ...req.body,
    email: req.user.email,
    userName: req.user.userName,
  });
  newSellOffer
    .save()
    .then((doc) => {
      res.status(200).json({
        success: true,
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
        success: true,
        sellOffers: docs,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
    });
});

//get all sell Offers (this can be seen without login)
app.get("/api/getSellOffersWithFilters", (req, res) => {
  const {
    cryptoCurrency,
    minAmount,
    preferredCurrency,
    paymentMethod,
    offerLocation,
    offerOwnerLocation,
  } = req.query;

  const query = {};

  if (cryptoCurrency !== "") {
    query.cryptoCurrency = cryptoCurrency;
  }

  if (minAmount !== "") {
    query.minAmount = { $gte: Number(minAmount) };
  }

  if (preferredCurrency !== "") {
    query.preferredCurrency = preferredCurrency;
  }

  if (paymentMethod !== "") {
    query.paymentMethod = paymentMethod;
  }

  if (offerLocation !== "") {
    query.offerLocation = offerLocation;
  }

  if (offerOwnerLocation !== "") {
    query.offerOwnerLocation = offerOwnerLocation;
  }

  /* const query = {
    cryptoCurrency: cryptoCurrency,
    minAmount: { $gte: Number(minAmount) },
    paymentMethod: paymentMethod,
    preferredCurrency: preferredCurrency,
    offerLocation: offerLocation,
    offerOwnerLocation: offerOwnerLocation,
  }; */
  sellOffers
    .find(query)
    .then((docs) => {
      res.status(200).json({
        success: true,
        sellOffers: docs,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
    });
});

// submit feedback
app.post("/api/submitFeedback", auth, (req, res) => {
  const newFeedbackSubmit = new feedbacks({
    ...req.body,
    givenBy_userName: req.user.userName,
  });
  newFeedbackSubmit
    .save()
    .then((doc) => {
      res.status(200).json({
        success: true,
        message: "Feedback submitted!",
        feedbacks: doc,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err });
      }
    });
});

// get all submitted feedbacks given by the signed-in user
app.get("/api/getFeedbacksSubmittedByMe", auth, (req, res) => {
  feedbacks
    .find({ givenBy_userName: req.user.userName })
    .then((docs) => {
      res.status(200).json({
        success: true,
        feedbacks: docs,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err });
      }
    });
});

// get all submitted feedbacks given by the signed-in user
app.get("/api/getFeedbacksReceivedToMe", auth, (req, res) => {
  feedbacks
    .find({ userName: req.user.userName })
    .then((docs) => {
      res.status(200).json({
        success: true,
        feedbacks: docs,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err });
      }
    });
});

//get the feedbacks given to the specific user
app.get("/api/getUserFeedbacks", (req, res) => {
  const userName = req.query.selectedUserName;
  feedbacks
    .find({ userName: userName })
    .then((docs) => {
      res.status(200).json({
        success: true,
        feedbacks: docs,
      });
    })
    .catch((err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
    });
});

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

// listening port
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});

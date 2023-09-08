const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const confiq = require("../config/config").get(process.env.NODE_ENV);
const salt = 10;

const UserProfile = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userName: { type: String, required: true },
  walletAddress: { type: String, required: true },
  token: { type: String },
});

const BuyOffers = new mongoose.Schema({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  cryptoCurrency: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  preferredCurrency: { type: String, required: true },
  cryptoCurrencyRate: { type: String, required: true },
  minAmount: { type: Number, required: true },
  maxAmount: { type: Number, required: true },
  offerMargin: { type: Number, required: true },
  offersTags: { type: [String], required: true },
  offerLocation: { type: String, required: true },
  offerOwnerLocation: { type: String, required: true },
});

const SellOffers = new mongoose.Schema({
  email: { type: String, required: true },
  userName: { type: String, required: true },
  cryptoCurrency: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  preferredCurrency: { type: String, required: true },
  cryptoCurrencyRate: { type: String, required: true },
  minAmount: { type: Number, required: true },
  maxAmount: { type: Number, required: true },
  offerMargin: { type: Number, required: true },
  offersTags: { type: [String] },
  offerLocation: { type: String, required: true },
  offerOwnerLocation: { type: String, required: true },
});

const Feedbacks = new mongoose.Schema({
  userName: { type: String, required: true },
  givenBy_userName: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

//hashing the user password
UserProfile.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(salt, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

//comparing the user password when user tries to login
UserProfile.methods.comparepassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(next);
    cb(null, isMatch);
  });
};

// generate token when user logged in
UserProfile.methods.generateToken = function (cb) {
  var user = this;
  var token = jwt.sign(user._id.toHexString(), confiq.SECRET);

  user.token = token;
  user
    .save()
    .then(function (user) {
      cb(null, user);
    })
    .catch((err) => {
      cb(err);
    });
};

// find by token
UserProfile.statics.findByToken = function (token, cb) {
  var user = this;
  jwt.verify(token, confiq.SECRET, function (err, decode) {
    user
      .findOne({ _id: decode, token: token })
      .then(function (user) {
        cb(null, user);
      })
      .catch((err) => {
        cb(err);
      });
  });
};

//delete token when logout
UserProfile.methods.deleteToken = function (token, cb) {
  var user = this;
  user
    .updateOne({ $unset: { token: 1 } })
    .then(function (user) {
      cb(null, user);
    })
    .catch((err) => {
      return cb(err);
    });
};

const userProfile = mongoose.model("UserProfile", UserProfile);
const buyOffers = mongoose.model("BuyOffers", BuyOffers);
const sellOffers = mongoose.model("SellOffers", SellOffers);
const feedbacks = mongoose.model("Feedbacks", Feedbacks);

module.exports = {
  userProfile: userProfile,
  buyOffers: buyOffers,
  sellOffers: sellOffers,
  feedbacks: feedbacks,
};

const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE:
      "mongodb+srv://adityapathak9893:India1234@cluster0.hlxkgrc.mongodb.net/localBitWolf?retryWrites=true&w=majority",
  },
  default: {
    SECRET: "mysecretkey",
    DATABASE: "mongodb://localhost:27017/localBitWolf",
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};

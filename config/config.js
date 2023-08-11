const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE:
      "mongodb+srv://adityapathak9893:India1234@cluster0.hlxkgrc.mongodb.net/?retryWrites=true&w=majority",
  },
  default: {
    SECRET: "mysecretkey",
    DATABASE: "mongodb://localhost:27017/p2p-local",
  },
};

exports.get = function get(env) {
  console.log('env', env);
  return config[env] || config.default;
};

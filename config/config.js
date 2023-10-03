const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE:
      "mongodb+srv://resapple2:Drdc5245@cluster0.nx3zebl.mongodb.net/localBitWolf?retryWrites=true&w=majority",
  },
  default: {
    SECRET: "mysecretkey",
    //DATABASE: "mongodb://localhost:27017/localBitWolf",
	DATABASE : "mongodb+srv://resapple2:Drdc5245@cluster0.nx3zebl.mongodb.net/localBitWolf?retryWrites=true&w=majority",
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};

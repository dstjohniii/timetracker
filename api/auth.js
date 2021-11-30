const passport = require("passport");
const jwt = require("jsonwebtoken");

const opts = {
  secretOrKey: "sooperSekrit",
};

const authenticate = (user) => {
  if (user) return jwt.sign({ id: user.id }, opts.secretOrKey);
  throw new Error("no user found");
};

module.exports = authenticate;

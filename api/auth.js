const passport = require("passport");
const jwt = require("jsonwebtoken");

const opts = {
  secretOrKey: "sooperSekrit",
};

const generateJwtToken = (user) => {
  if (user) return jwt.sign({ id: user.id }, opts.secretOrKey);
  throw new Error("no user found");
};

const authenticate = (request) => {
  const header = request.req.headers.authorization;

  // not found
  if (!header) return { isAuth: false };

  // token
  const token = header.split(" ");

  // token not found
  if (!token) return { isAuth: false };

  let decodeToken;

  try {
    decodeToken = jwt.verify(token[1], opts.secretOrKey);
  } catch (err) {
    return { isAuth: false };
  }

  // in case any error found
  if (!decodeToken) return { isAuth: false };

  // token decoded successfully, and extracted data
  return { isAuth: true, userId: decodeToken.id };
};

module.exports = {
  generateJwtToken,
  authenticate,
};

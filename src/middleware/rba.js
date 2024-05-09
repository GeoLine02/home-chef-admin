//role based authentication
const jwt = require("jsonwebtoken");
const {
  jwt: { secret },
} = require("../config/index");

function rba(roles = []) {
  return (req, res, next) => {
    try {
      if (!roles.length) {
        return next()
      }

      const { token } = req.body;

      if (!token) {
        throw new Error("Please provide auth token");
      }

      const jwtData = jwt.verify(token, secret);

      if (!jwtData.role || !roles.includes(jwtData.role)) {
        return res.status(403).send({ msg: "has no access" });
      }

      next();
    } catch (error) {
      res.send(500);
    }
  };
}

module.exports = {
  rba,
};

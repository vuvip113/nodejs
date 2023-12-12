const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authMiddleWare = (req, res, next) => {
  //   console.log("checkToken", req.headers.token);
  const token = req.headers.token.split(" ")[1];
  // const token = req.headers.token; 
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authemtication co quyen admin",
        status: "ERROR",
      });
    }

    if (user?.isAdmin) {
      next();
    } else {
      return res.status(404).json({
        message: "The authemtication co quyen admin 2",
        status: "ERROR",
      });
    }
  });
};

const authUserMiddleWare = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
    if (err) {
      return res.status(404).json({
        message: "The authemtication",
        status: "ERROR",
      });
    }

    if (user?.isAdmin || user?.id === userId) {
      next();
    } else {
      return res.status(404).json({
        message: "The authemtication",
        status: "ERROR",
      });
    }
  });
};

module.exports = {
  authMiddleWare,
  authUserMiddleWare,
};

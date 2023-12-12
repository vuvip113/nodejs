const jwt = require("jsonwebtoken");

const genneralAccessToken = async (payload) => {
  //   console.log("playlog", payload);
  const access_token = jwt.sign(
    {
      // ...payload,
      payload,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "30s" }
  );

  return access_token;
};

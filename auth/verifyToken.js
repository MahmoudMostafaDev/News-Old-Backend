const jwt = require("jsonwebtoken");
function verifyToken(req, res, next) {
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];
  console.log(token);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user);
    req.user = user.username;
    next();
  });
}

module.exports = verifyToken;

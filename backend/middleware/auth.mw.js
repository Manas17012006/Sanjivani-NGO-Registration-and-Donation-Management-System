const jwt=require('jsonwebtoken');
async function userAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader)
      return res.json({ success: false, message: "No token" });

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
  } catch (err) {
    return res.send({ success: true, message: err.message });
  }
}
module.exports={userAuth};

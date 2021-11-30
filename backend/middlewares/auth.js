const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = async(req, res, next) => {
    const authHeader = req.headers.authorization;
    let decodedToken;
    if (!authHeader) {
        res.status(401).json({ "msg": "Not authenticated" });
    }
    try {
        decodedToken = await jwt.verify(authHeader, config.secret);
    } catch (e) {
        res.status(500).json({ "msg": "Token expired please login again" });
    }
    if (!decodedToken) {
        res.status(401).json({ "msg": "Not authenticated" })
    }
    req.userdata = decodedToken;
    next()
}
"user strict"
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
module.exports = class UserHelper {
    constructor() {}

    static async genHash(pass) {
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(pass, salt)
        return hashPass;
    }
    static async comparePass(pass, userPass) {
        return await bcrypt.compare(pass, userPass);
    }
    static async genToken(userObj) {
        let token = await jwt.sign(userObj, config.secret, { expiresIn: '1d' });
        return token;
    }
}
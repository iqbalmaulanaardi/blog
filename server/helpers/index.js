var crypto = require('crypto');
var jwt = require('jsonwebtoken');
require('dotenv').config();

class Helper {
    static cryptPass(password) {
        let _salt = crypto.randomBytes(256).toString('hex')
        let pass = crypto.createHmac('sha256', _salt).update(password).digest('hex')
        let obj = {
            salt: _salt,
            pass: pass
        }
        return obj
    }
    static getToken(obj) {
        let token = jwt.sign(obj, process.env.JWT_SECRET);
        return token;
    }
    static verifyToken(token) {
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded
    }
    static getCryptedPass(password, salt) {
        let result = crypto.createHmac('sha256', salt).update(password).digest('hex')
        return result
    }
}
module.exports = Helper
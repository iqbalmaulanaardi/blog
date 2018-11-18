var User = require('../models/users.js')
var Helper = require('../helpers/index.js')
class UserController {
    static signup(req, res) {
        User.create({
                email: req.body.email,
                password: req.body.password
            })
            .then((createdUser) => {
                res.status(200).json(createdUser)
            })
            .catch((err) => {
                res.status(400).json({
                    message: err
                })
            })
    }
    static signin(req, res) {
        User.findOne({ email: req.body.email })
            .then(function(data) {
                if (data) {
                    let pass = Helper.getCryptedPass(req.body.password, data.salt)
                    if (data.password === pass) {
                        let obj = {
                            id: data.id,
                            email: req.body.email
                        }
                        let token = Helper.getToken(obj);

                        res.status(200).json({
                            token: token,
                            email: req.body.email
                        })
                    } else {
                        res.status(500).json({
                            message: `Incorrect password`
                        })
                    }
                } else {
                    res.status(500).json({
                        message: `Incorrect Email`
                    })
                }
            })
            .catch(function(err) {
                res.status(500).json({
                    message: err.message
                })
            })
    }
}
module.exports = UserController
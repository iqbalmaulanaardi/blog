var User = require('../models/users.js')
var Helper = require('../helpers/index.js')
var Article = require('../models/articles.js')
var Comment = require('../models/comments.js')
class Middleware {
    static isLogin(req, res, next) {
        if (req.headers["token"] !== undefined) {
            let decoded = Helper.verifyToken(req.headers["token"]);
            User.findOne({
                    email: decoded.email
                })
                .then(function(data) {
                    if (data) {
                        req.logged_in_user = data
                        next()
                    } else {
                        next(res.status(500).json({
                            message: `Something went wrong`
                        }))
                    }
                })
                .catch(function(err) {
                    next(res.status(500).json({
                        message: `Something went wrong`
                    }))
                })
        } else {
            next(res.status(500).json({
                message: `Please signin first`
            }))
        }
    }
    static isOwner(req, res, next) {
        Article.findOne({
                _id: req.params.id
            })
            .then((data) => {
                if (String(data.user_id) !== String(req.logged_in_user._id)) {
                    next(res.status(401).json({
                        message: `Invalid User Credentials`
                    }))
                } else if (String(data.user_id) === String(req.logged_in_user._id)) {
                    next()
                }
            })
            .catch((err) => {
                next(res.status(401).json({
                    message: `Article's not found`
                }))
            })
    }
    static isCommentOwner(req, res, next) {
        Comment.findOne({
                _id: req.params.comment_id
            })
            .then((data) => {
                if (!data) {
                    next(res.status(401).json({
                        message: `Comment's not found`
                    }))
                } else if (String(data.user_id) !== String(req.logged_in_user._id)) {
                    next(res.status(401).json({
                        message: `Invalid User Credentials`
                    }))
                } else if (String(data.user_id) === String(req.logged_in_user._id)) {
                    next()
                }
            })
            .catch((err) => {
                next(res.status(401).json({
                    message: `Comment's not found`
                }))
            })
    }
}
module.exports = Middleware
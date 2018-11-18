var Comment = require('../models/comments.js')
var Helper = require('../helpers/index.js')
class CommentController {
    static createComment(req, res) {
        Comment.create({
                content: req.body.content,
                user_id: req.logged_in_user._id,
                article_id: req.params.article_id,
                createdAt: new Date()
            })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                })
            })
    }
    static getComment(req, res) {
        Comment.find({
                article_id: req.params.article_id
            }).populate('user_id')
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                })
            })
    }
    static deleteComment(req, res) {
        Comment.deleteOne({
                _id: req.params.comment_id
            })
            .then(() => {
                Comment.find({
                        article_id: req.params.article_id
                    }).populate('user_id')
                    .then((data) => {
                        res.status(200).json(data)
                    })
            })
            .catch((err) => {
                res.status(500).json({
                    message: err
                })
            })
    }
    static getOneComment(req, res) {
        Comment.findOne({
                _id: req.params.comment_id
            }).populate('user_id')
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error get one'
                })
            })
    }
}
module.exports = CommentController
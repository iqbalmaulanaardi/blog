var express = require('express')
var router = express.Router();
var Comment = require('../controllers/comments.js')
var Middleware = require('../middlewares/index.js')
router.post('/:article_id', Middleware.isLogin, Comment.createComment);
router.get('/:article_id', Comment.getComment);
router.delete('/:article_id/:comment_id', Middleware.isLogin, Middleware.isCommentOwner, Comment.deleteComment)
router.get('/one/:comment_id', Middleware.isLogin, Comment.getOneComment)
module.exports = router
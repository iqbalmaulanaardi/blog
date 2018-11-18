var express = require('express');
var router = express.Router();
var Article = require('../controllers/articles.js');
var Middleware = require('../middlewares/index.js');
const multer = require('multer');
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // no larger than 5mb
    }
});

router.post('/', Middleware.isLogin, upload.single('image'), Article.createArticle);
router.get('/', Middleware.isLogin, Article.getArticles);
router.get('/all/articles', Article.getAll);
router.get('/one/:article_id', Article.getOneArticle);
router.delete('/:id', Middleware.isLogin, Middleware.isOwner, Article.deleteArticle);
router.put('/:id', Middleware.isLogin, Middleware.isOwner, Article.updateArticle);
router.post('/uploadImage', upload.single('file'), Article.uploadImage)

module.exports = router
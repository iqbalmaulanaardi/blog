var express = require('express');
var router = express.Router();
var Helper = require('../helpers/index.js');
var Middleware = require('../middlewares/index.js');
var User = require('../models/users.js')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/verify', function(req, res, next) {
    // console.log('ini token', req.headers["token"])
    if (req.headers["token"]) {
        let decoded = Helper.verifyToken(req.headers["token"]);
        User.findOne({
                email: decoded.email
            })
            .then(function(data) {
                if (data) {
                    req.logged_in_user = data
                    res.status(200).json({
                        message: 'Valid Token'
                    })
                } else {
                    res.status(500).json({
                        message: `Something went wrong`
                    })
                }
            })
            .catch(function(err) {
                res.status(500).json({
                    message: `Something went wrong`
                })
            })
    } else {
        res.status(500).json({
            message: `Please signin first`
        })
    }
})
module.exports = router;
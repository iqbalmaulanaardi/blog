require('dotenv').config()
var Article = require('../models/articles.js')
var Helper = require('../helpers/index.js')
const { Storage } = require('@google-cloud/storage')
const crypto = require('crypto')
const path = require('path')
const googleCloudStorage = new Storage({
    projectId: process.env.GCLOUD_PROJECT,
    keyFilename: process.env.KEYFILE_PATH
});
const bucket = googleCloudStorage.bucket('e-commerce-storage');


class ArticleController {
    static createArticle(req, res) {
        const newFileName = crypto.randomBytes(16).toString('hex') + path.extname(req.file.originalname)
        const blob = bucket.file(newFileName);

        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        blobStream.on("error", err => {
            next(err);
            return;
        });

        blobStream.on("finish", () => {
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            // Make the image public to the web (since we'll be displaying it in browser)
            blob.makePublic().then(() => {
                Article.create({
                        title: req.body.title,
                        content: req.body.content,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        user_id: req.logged_in_user._id,
                        image: publicUrl,
                        comments: []
                    })
                    .then((data) => {
                        res.status(200).json(data)
                    })
                    .catch((err) => {
                        res.status(500).json({
                            message: err.message
                        })
                    })
            });
        });
        blobStream.end(req.file.buffer);

    }
    static getArticles(req, res) {
        Article.find({
                user_id: req.logged_in_user._id
            }).populate('user_id').populate('comments')
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error get'
                })
            })
    }
    static getAll(req, res) {
        Article.find({}).populate('user_id').populate('comments')
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error get'
                })
            })
    }
    static deleteArticle(req, res) {
        Article.deleteOne({
                _id: req.params.id
            })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error delete'
                })
            })
    }
    static updateArticle(req, res) {
        Article.updateOne({
                _id: req.params.id
            }, {
                title: req.body.title,
                content: req.body.content,
                updatedAt: new Date()
            })
            .then((data) => {
                res.status(200).json(data)
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'Error update'
                })
            })
    }
    static getOneArticle(req, res) {
        Article.findOne({
                _id: req.params.article_id
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
    static uploadImage(req, res) {
        const newFileName = crypto.randomBytes(16).toString('hex') + path.extname(req.file.originalname)
        const blob = bucket.file(newFileName);

        const blobStream = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype
            }
        });

        blobStream.on("error", err => {
            next(err);
            return;
        });

        blobStream.on("finish", () => {
            // The public URL can be used to directly access the file via HTTP.
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

            // Make the image public to the web (since we'll be displaying it in browser)
            blob.makePublic().then(() => {
                res.status(200).json(publicUrl)
            });
        });
        blobStream.end(req.file.buffer);
    }
}
module.exports = ArticleController
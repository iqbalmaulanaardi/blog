const chai = require('chai');
const chaihttp = require('chai-http');
const expect = chai.expect;
const app = require('../app.js');
chai.use(chaihttp);
var mongooose = require('mongoose');

var Helper = require('../helpers/index.js');

const User = require('../models/users.js');
const Comment = require('../models/comments.js');
const Article = require('../models/articles.js');

describe('POST /articles route test', function(done) {
    let tmp_user_id = ''
    let tmp_token = ''
    let tmp_comment = ''
    let tmp_article = {}
    before(function(done) {
        User.deleteMany({})
            .then(function() {

            })
        Article.deleteMany({})
            .then(function() {

            })
        Comment.deleteMany({})
            .then(function() {

            })
        done()
    })
    before(function(done) {
        User.create({
                email: 'user1@mail.com',
                password: '123456'
            })
            .then(function(createdUser) {
                let obj = {
                    _id: createdUser._id,
                    email: createdUser.email
                };
                tmp_token = Helper.getToken(obj)
                tmp_user_id = obj._id
                done()
            })
            .catch(function(err) {
                console.log(err)
            })
    });
    before(function(done) {
        Comment.create({
                content: 'A comment here',
                user_id: tmp_user_id
            })
            .then(function(data) {
                tmp_comment = data
                done()
            })
    });
    beforeEach(function(done) {
        tmp_article = {
            title: 'A Title',
            content: 'Many text for contents',
            createdAt: new Date(),
            updatedAt: new Date(),
            user_id: tmp_user_id,
            comments: [tmp_comment]
        }
        done()
    });
    it("should return created article if article was created", function(done) {
        chai
            .request(app)
            .post('/articles')
            .send(tmp_article)
            .set({
                token: tmp_token
            })
            .end(function(req, res) {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('object')
                done()
            })
    })
    it("should return error if user not login", function(done) {
        chai
            .request(app)
            .post('/articles')
            .send(tmp_article)
            .set({})
            .end(function(req, res) {
                expect(res).to.have.status(500)
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal(`Please signin first`)
                done()
            })
    })
    it("should return error if article's user_id is empty", function(done) {
        tmp_article.user_id = ''
        chai
            .request(app)
            .post('/articles')
            .send(tmp_article)
            .set({})
            .end(function(req, res) {
                expect(res).to.have.status(500)
                expect(res.body.message).to.be.equal(`Please signin first`)
                done()
            })
    })
    after(function(done) {
        User.deleteMany({}).then(function(data) {})
        Article.deleteMany({}).then(function(data) {})
        Comment.deleteMany({}).then(function(data) {})
        done()
    })
});
describe('GET /articles route test', function() {
    let tmp_user_id = ''
    let tmp_token = ''
    let tmp_comment = ''
    let tmp_article = {}
    let tmp_article_id = ''
    let tmp_user_id2 = ''
    let tmp_token2 = ''
    let tmp_comment2 = ''
    let tmp_article2 = {}
    let tmp_article_id2 = ''
    before(function(done) {
        User.deleteMany({})
            .then(function() {

            })
        Article.deleteMany({})
            .then(function() {

            })
        Comment.deleteMany({})
            .then(function() {

            })
        done()
    })
    before(function(done) {
        User.create({
                email: 'user1@mail.com',
                password: '123456'
            })
            .then(function(createdUser) {
                let obj = {
                    _id: createdUser._id,
                    email: createdUser.email
                };
                tmp_token = Helper.getToken(obj)
                tmp_user_id = obj._id
                User.create({
                        email: 'user2@mail.com',
                        password: '123456'
                    })
                    .then(function(createdUser2) {
                        let obj2 = {
                            _id: createdUser2._id,
                            email: createdUser2.email
                        };
                        tmp_token2 = Helper.getToken(obj2)
                        tmp_user_id2 = obj2._id
                        done()
                    })
            })
            .catch(function(err) {
                console.log(err)
            })
    });
    before(function(done) {
        Comment.create({
                content: 'A comment here',
                user_id: tmp_user_id
            })
            .then(function(data) {
                tmp_comment = data
                Comment.create({
                        content: 'A comment here',
                        user_id: tmp_user_id2
                    })
                    .then(function(data2) {
                        tmp_comment2 = data2
                        done()
                    })
            })
    });
    beforeEach(function(done) {
        tmp_article = {
            title: 'A Title',
            content: 'Many text for contents',
            createdAt: new Date(),
            updatedAt: new Date(),
            user_id: tmp_user_id,
            comments: [tmp_comment]
        }
        tmp_article2 = {
            title: 'A Title2',
            content: 'Many text for contents2',
            createdAt: new Date(),
            updatedAt: new Date(),
            user_id: tmp_user_id2,
            comments: [tmp_comment2]
        }
        Article.create(tmp_article)
            .then(function() {
                Article.create(tmp_article2)
                    .then(function() {
                        done()
                    })
            })
    });

    it('should return articles of a user if status 200', function(done) {
        chai
            .request(app)
            .get(`/articles/${tmp_user_id2}`)
            .set({
                token: tmp_token
            })
            .end(function(err, res) {
                expect(res).to.have.status(200)
                expect(res.body).to.be.an('array')
                done()
            })
    })
    it('should return all articles from all users', function(done) {
        chai
            .request(app)
            .get(`/articles`)
            .end(function(err, res) {
                expect(res).to.have.status(200)
                done()
            })
    })

    after(function(done) {
        User.deleteMany({}).then(function(data) {})
        Article.deleteMany({}).then(function(data) {})
        Comment.deleteMany({}).then(function(data) {})
        done()
    })
})
describe('DELETE /articles route test', function() {
    let tmp_user_id = ''
    let tmp_token = ''
    let tmp_comment = ''
    let tmp_article = {}
    let tmp_article_id = ''
    let tmp_user_id2 = ''
    let tmp_token2 = ''
    let tmp_comment2 = ''
    let tmp_article2 = {}
    let tmp_article_id2 = ''
    let notfound = ''
    before(function(done) {
        User.deleteMany({})
            .then(function() {

            })
        Article.deleteMany({})
            .then(function() {

            })
        Comment.deleteMany({})
            .then(function() {

            })
        done()
    })
    before(function(done) {
        User.create({
                email: 'user1@mail.com',
                password: '123456'
            })
            .then(function(createdUser) {
                let obj = {
                    _id: createdUser._id,
                    email: createdUser.email
                };
                tmp_token = Helper.getToken(obj)
                tmp_user_id = obj._id
                User.create({
                        email: 'user2@mail.com',
                        password: '123456'
                    })
                    .then(function(createdUser2) {
                        let obj2 = {
                            _id: createdUser2._id,
                            email: createdUser2.email
                        };
                        tmp_token2 = Helper.getToken(obj2)
                        tmp_user_id2 = obj2._id
                        done()
                    })
            })
            .catch(function(err) {
                console.log(err)
            })
    });
    before(function(done) {
        Comment.create({
                content: 'A comment here',
                user_id: tmp_user_id
            })
            .then(function(data) {
                tmp_comment = data
                Comment.create({
                        content: 'A comment here',
                        user_id: tmp_user_id2
                    })
                    .then(function(data2) {
                        tmp_comment2 = data2
                        done()
                    })
            })
    });
    beforeEach(function(done) {
        tmp_article = {
            title: 'A Title',
            content: 'Many text for contents',
            createdAt: new Date(),
            updatedAt: new Date(),
            user_id: tmp_user_id,
            comments: [tmp_comment]
        }
        tmp_article2 = {
            title: 'A Title2',
            content: 'Many text for contents2',
            createdAt: new Date(),
            updatedAt: new Date(),
            user_id: tmp_user_id2,
            comments: [tmp_comment2]
        }
        Article.create(tmp_article)
            .then(function(result1) {
                tmp_article_id = result1._id
                Article.create(tmp_article2)
                    .then(function(result2) {
                        tmp_article_id2 = result2._id
                        done()
                    })
            })
    });

    it('should return success if status 200', function(done) {
        chai
            .request(app)
            .delete(`/articles/${tmp_article_id}`)
            .set({
                token: tmp_token
            })
            .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(200)
                done()
            })
    });
    it('should return error if target article\'s user_id is not the same as logged in user_id', function(done) {
        chai
            .request(app)
            .delete(`/articles/${tmp_article_id}`)
            .set({
                token: tmp_token2
            })
            .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(401)
                expect(res.body.message).to.be.equal(`Invalid User Credentials`)
                done()
            })
    })
    it('should return error if target article\'s  is not found', function(done) {
        notfound = 'thisisidthatwillmakearticlenotfound'
        chai
            .request(app)
            .delete(`/articles/thisisidthatwillmakearticlenotfound`)
            .set({
                token: tmp_token2
            })
            .end(function(err, res) {
                expect(res).to.have.status(401)
                expect(res.body.message).to.be.equal(`Article's not found`)
                done()
            })
    })
    after(function(done) {
        User.deleteMany({}).then(function(data) {})
        Article.deleteMany({}).then(function(data) {})
        Comment.deleteMany({}).then(function(data) {})
        done()
    })
})
describe('PUT /articles route test', function() {
    let tmp_user_id = ''
    let tmp_token = ''
    let tmp_comment = ''
    let tmp_article = {}
    let tmp_article_id = ''
    let tmp_user_id2 = ''
    let tmp_token2 = ''
    let tmp_comment2 = ''
    let tmp_article2 = {}
    let tmp_article_id2 = ''
    let notfound = ''
    before(function(done) {
        User.deleteMany({})
            .then(function() {

            })
        Article.deleteMany({})
            .then(function() {

            })
        Comment.deleteMany({})
            .then(function() {

            })
        done()
    })
    before(function(done) {
        User.create({
                email: 'user1@mail.com',
                password: '123456'
            })
            .then(function(createdUser) {
                let obj = {
                    _id: createdUser._id,
                    email: createdUser.email
                };
                tmp_token = Helper.getToken(obj)
                tmp_user_id = obj._id
                User.create({
                        email: 'user2@mail.com',
                        password: '123456'
                    })
                    .then(function(createdUser2) {
                        let obj2 = {
                            _id: createdUser2._id,
                            email: createdUser2.email
                        };
                        tmp_token2 = Helper.getToken(obj2)
                        tmp_user_id2 = obj2._id
                        done()
                    })
            })
            .catch(function(err) {
                console.log(err)
            })
    });
    before(function(done) {
        Comment.create({
                content: 'A comment here',
                user_id: tmp_user_id
            })
            .then(function(data) {
                tmp_comment = data
                Comment.create({
                        content: 'A comment here',
                        user_id: tmp_user_id2
                    })
                    .then(function(data2) {
                        tmp_comment2 = data2
                        done()
                    })
            })
    });
    beforeEach(function(done) {
        tmp_article = {
            title: 'A Title',
            content: 'Many text for contents',
            createdAt: new Date(),
            updatedAt: new Date(),
            user_id: tmp_user_id,
            comments: [tmp_comment]
        }
        tmp_article2 = {
            title: 'A Title2',
            content: 'Many text for contents2',
            createdAt: new Date(),
            updatedAt: new Date(),
            user_id: tmp_user_id2,
            comments: [tmp_comment2]
        }
        Article.create(tmp_article)
            .then(function(result1) {
                tmp_article_id = result1._id
                Article.create(tmp_article2)
                    .then(function(result2) {
                        tmp_article_id2 = result2._id
                        done()
                    })
            })
    });
    it('should return success if status 200', function(done) {
        chai
            .request(app)
            .put(`/articles/${tmp_article_id}`)
            .send({
                title: 'Updated test',
                content: 'Updated Content'
            })
            .set({
                token: tmp_token
            })
            .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(200)
                expect(res.body.nModified).to.not.equal(0)
                done()
            })
    });
    it('should return error if target article\'s user_id is not the same as logged in user_id', function(done) {
        chai
            .request(app)
            .put(`/articles/${tmp_article_id}`)
            .send({
                title: 'Updated test',
                content: 'Updated Content'
            })
            .set({
                token: tmp_token2
            })
            .end(function(err, res) {
                console.log(res.body)
                expect(res).to.have.status(401)
                expect(res.body.message).to.be.equal(`Invalid User Credentials`)
                done()
            })
    })
    it('should return error if target article\'s  is not found', function(done) {
        chai
            .request(app)
            .put(`/articles/thisisidthatwillmakearticlenotfound`)
            .set({
                token: tmp_token2
            })
            .end(function(err, res) {
                expect(res).to.have.status(401)
                expect(res.body.message).to.be.equal(`Article's not found`)
                done()
            })
    })
    after(function(done) {
        User.deleteMany({}).then(function(data) {})
        Article.deleteMany({}).then(function(data) {})
        Comment.deleteMany({}).then(function(data) {})
        done()
    })
})
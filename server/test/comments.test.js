// const chai = require('chai');
// const chaihttp = require('chai-http');
// const expect = chai.expect;
// const app = require('../app.js');
// chai.use(chaihttp);
// var mongooose = require('mongoose');

// var Helper = require('../helpers/index.js');

// const User = require('../models/users.js');
// const Comment = require('../models/comments.js');
// const Article = require('../models/articles.js');
// // describe('POST /comments route test', function() {

// //     let tmp_user_id = ''
// //     let tmp_token = ''
// //     let tmp_comment = ''
// //     let tmp_article = {}
// //     let tmp_article_id = ''
// //     let tmp_user_id2 = ''
// //     let tmp_token2 = ''
// //     let tmp_comment2 = ''
// //     let tmp_article2 = {}
// //     let tmp_article_id2 = ''
// //     let notfound = ''
// //     before(function(done) {
// //         User.deleteMany({})
// //             .then(function() {

// //             })
// //         Article.deleteMany({})
// //             .then(function() {

// //             })
// //         Comment.deleteMany({})
// //             .then(function() {

// //             })
// //         done()
// //     })
// //     before(function(done) {
// //         User.create({
// //                 email: 'user1@mail.com',
// //                 password: '123456'
// //             })
// //             .then(function(createdUser) {
// //                 let obj = {
// //                     _id: createdUser._id,
// //                     email: createdUser.email
// //                 };
// //                 tmp_token = Helper.getToken(obj)
// //                 tmp_user_id = obj._id
// //                 User.create({
// //                         email: 'user2@mail.com',
// //                         password: '123456'
// //                     })
// //                     .then(function(createdUser2) {
// //                         let obj2 = {
// //                             _id: createdUser2._id,
// //                             email: createdUser2.email
// //                         };
// //                         tmp_token2 = Helper.getToken(obj2)
// //                         tmp_user_id2 = obj2._id
// //                         done()
// //                     })
// //             })
// //             .catch(function(err) {
// //                 console.log(err)
// //             })
// //     });
// //     before(function(done) {
// //         tmp_article = {
// //             title: 'A Title',
// //             content: 'Many text for contents',
// //             createdAt: new Date(),
// //             updatedAt: new Date(),
// //             user_id: tmp_user_id
// //         }
// //         tmp_article2 = {
// //             title: 'A Title2',
// //             content: 'Many text for contents2',
// //             createdAt: new Date(),
// //             updatedAt: new Date(),
// //             user_id: tmp_user_id2
// //         }
// //         Article.create(tmp_article)
// //             .then(function(result1) {
// //                 tmp_article_id = result1._id
// //                 Article.create(tmp_article2)
// //                     .then(function(result2) {
// //                         tmp_article_id2 = result2._id
// //                         done()
// //                     })
// //             })
// //             .catch((err) => {

// //             })
// //     });
// //     before(function(done) {
// //         console.log('ini', tmp_article_id)
// //         Comment.create({
// //                 content: 'A comment here',
// //                 user_id: tmp_user_id,
// //                 article_id: tmp_article_id
// //             })
// //             .then(function(data) {
// //                 tmp_comment = data
// //                 Comment.create({
// //                         content: 'A comment here',
// //                         user_id: tmp_user_id2,
// //                         article_id: tmp_article_id2
// //                     })
// //                     .then(function(data2) {
// //                         tmp_comment2 = data2
// //                         done()
// //                     })
// //             })
// //     });

// //     it('should return success if status 200', function(done) {
// //         chai
// //             .request(app)
// //             .post(`/comments/${tmp_article_id}`)
// //             .send(tmp_comment)
// //             .set({
// //                 token: tmp_token
// //             })
// //             .end(function(err, res) {
// //                 console.log(res.body)
// //                 expect(res).to.have.status(200)
// //                 done()
// //             })
// //     });
// //     it("should return error if user not login", function(done) {
// //         chai
// //             .request(app)
// //             .post(`/comments/${tmp_article_id}`)
// //             .send(tmp_comment)
// //             .set({})
// //             .end(function(req, res) {
// //                 expect(res).to.have.status(500)
// //                 expect(res.body).to.have.property('message')
// //                 expect(res.body.message).to.equal(`Please signin first`)
// //                 done()
// //             })
// //     })
// //     after(function(done) {
// //         User.deleteMany({}).then(function(data) {})
// //         Article.deleteMany({}).then(function(data) {})
// //         Comment.deleteMany({}).then(function(data) {})
// //         done()
// //     })
// // })
// // describe('DELETE /comment route test', function() {
// //     let tmp_user_id = ''
// //     let tmp_token = ''
// //     let tmp_comment = ''
// //     let tmp_article = {}
// //     let tmp_article_id = ''
// //     let tmp_user_id2 = ''
// //     let tmp_token2 = ''
// //     let tmp_comment2 = ''
// //     let tmp_article2 = {}
// //     let tmp_article_id2 = ''
// //     let notfound = ''
// //     before(function(done) {
// //         User.deleteMany({})
// //             .then(function() {

// //             })
// //         Article.deleteMany({})
// //             .then(function() {

// //             })
// //         Comment.deleteMany({})
// //             .then(function() {

// //             })
// //         done()
// //     })
// //     before(function(done) {
// //         User.create({
// //                 email: 'user1@mail.com',
// //                 password: '123456'
// //             })
// //             .then(function(createdUser) {
// //                 let obj = {
// //                     _id: createdUser._id,
// //                     email: createdUser.email
// //                 };
// //                 tmp_token = Helper.getToken(obj)
// //                 tmp_user_id = obj._id
// //                 User.create({
// //                         email: 'user2@mail.com',
// //                         password: '123456'
// //                     })
// //                     .then(function(createdUser2) {
// //                         let obj2 = {
// //                             _id: createdUser2._id,
// //                             email: createdUser2.email
// //                         };
// //                         tmp_token2 = Helper.getToken(obj2)
// //                         tmp_user_id2 = obj2._id
// //                         done()
// //                     })
// //             })
// //             .catch(function(err) {
// //                 console.log(err)
// //             })
// //     });
// //     before(function(done) {
// //         tmp_article = {
// //             title: 'A Title',
// //             content: 'Many text for contents',
// //             createdAt: new Date(),
// //             updatedAt: new Date(),
// //             user_id: tmp_user_id
// //         }
// //         tmp_article2 = {
// //             title: 'A Title2',
// //             content: 'Many text for contents2',
// //             createdAt: new Date(),
// //             updatedAt: new Date(),
// //             user_id: tmp_user_id2
// //         }
// //         Article.create(tmp_article)
// //             .then(function(result1) {
// //                 tmp_article_id = result1._id
// //                 Article.create(tmp_article2)
// //                     .then(function(result2) {
// //                         tmp_article_id2 = result2._id
// //                         done()
// //                     })
// //             })
// //     });
// //     beforeEach(function(done) {
// //         Comment.create({
// //                 content: 'A comment here',
// //                 user_id: tmp_user_id,
// //                 article_id: tmp_article_id
// //             })
// //             .then(function(data) {
// //                 tmp_comment = data
// //                 Comment.create({
// //                         content: 'A comment here',
// //                         user_id: tmp_user_id2,
// //                         article_id: tmp_article_id2
// //                     })
// //                     .then(function(data2) {
// //                         tmp_comment2 = data2
// //                         done()
// //                     })
// //             })
// //     });

// //     it('should return success if status 200', function(done) {
// //         chai
// //             .request(app)
// //             .delete(`/comments/${tmp_article_id}/${tmp_comment._id}`)
// //             .set({
// //                 token: tmp_token
// //             })
// //             .end(function(err, res) {
// //                 console.log(res.body)
// //                 expect(res).to.have.status(200)
// //                 done()
// //             })
// //     });
// //     it('should return error if target comment\'s user_id is not the same as logged in user_id', function(done) {
// //         chai
// //             .request(app)
// //             .delete(`/comments/${tmp_article_id}/${tmp_comment._id}`)
// //             .set({
// //                 token: tmp_token2
// //             })
// //             .end(function(err, res) {
// //                 console.log(res.body)
// //                 expect(res).to.have.status(401)
// //                 expect(res.body.message).to.be.equal(`Invalid User Credentials`)
// //                 done()
// //             })
// //     })
// //     it('should return error if target comments\'s  is not found', function(done) {
// //         notfound = 'thisisidthatwillmakearticlenotfound'
// //         chai
// //             .request(app)
// //             .delete(`/comments/${tmp_article_id}/thisisidthatwillmakearticlenotfound`)
// //             .set({
// //                 token: tmp_token2
// //             })
// //             .end(function(err, res) {
// //                 expect(res).to.have.status(401)
// //                 expect(res.body.message).to.be.equal(`Comment's not found`)
// //                 done()
// //             })
// //     })
// //     after(function(done) {
// //         User.deleteMany({}).then(function(data) {})
// //         Article.deleteMany({}).then(function(data) {})
// //         Comment.deleteMany({}).then(function(data) {})
// //         done()
// //     })
// // });
// describe('GET /comments route test', function() {
//     let tmp_user_id = ''
//     let tmp_token = ''
//     let tmp_comment = ''
//     let tmp_article = {}
//     let tmp_article_id = ''
//     let tmp_user_id2 = ''
//     let tmp_token2 = ''
//     let tmp_comment2 = ''
//     let tmp_article2 = {}
//     let tmp_article_id2 = ''
//     let notfound = ''
//     before(function(done) {
//         User.deleteMany({})
//             .then(function() {

//             })
//         Article.deleteMany({})
//             .then(function() {

//             })
//         Comment.deleteMany({})
//             .then(function() {

//             })
//         done()
//     })
//     before(function(done) {
//         User.create({
//                 email: 'user1@mail.com',
//                 password: '123456'
//             })
//             .then(function(createdUser) {
//                 let obj = {
//                     _id: createdUser._id,
//                     email: createdUser.email
//                 };
//                 tmp_token = Helper.getToken(obj)
//                 tmp_user_id = obj._id
//                 User.create({
//                         email: 'user2@mail.com',
//                         password: '123456'
//                     })
//                     .then(function(createdUser2) {
//                         let obj2 = {
//                             _id: createdUser2._id,
//                             email: createdUser2.email
//                         };
//                         tmp_token2 = Helper.getToken(obj2)
//                         tmp_user_id2 = obj2._id
//                         done()
//                     })
//             })
//             .catch(function(err) {
//                 console.log(err)
//             })
//     });
//     before(function(done) {
//         tmp_article = {
//             title: 'A Title',
//             content: 'Many text for contents',
//             createdAt: new Date(),
//             updatedAt: new Date(),
//             user_id: tmp_user_id
//         }
//         tmp_article2 = {
//             title: 'A Title2',
//             content: 'Many text for contents2',
//             createdAt: new Date(),
//             updatedAt: new Date(),
//             user_id: tmp_user_id2
//         }
//         Article.create(tmp_article)
//             .then(function(result1) {
//                 tmp_article_id = result1._id
//                 Article.create(tmp_article2)
//                     .then(function(result2) {
//                         tmp_article_id2 = result2._id
//                         done()
//                     })
//             })
//     });
//     beforeEach(function(done) {
//         Comment.create({
//                 content: 'A comment here',
//                 user_id: tmp_user_id,
//                 article_id: tmp_article_id
//             })
//             .then(function(data) {
//                 tmp_comment = data
//                 Comment.create({
//                         content: 'A comment here',
//                         user_id: tmp_user_id2,
//                         article_id: tmp_article_id2
//                     })
//                     .then(function(data2) {
//                         tmp_comment2 = data2
//                         done()
//                     })
//             })
//     });

//     it('should return comments of an article if status 200', function(done) {
//         chai
//             .request(app)
//             .get(`/comments/${tmp_article_id}`)
//             .set({
//                 token: tmp_token
//             })
//             .end(function(err, res) {
//                 expect(res).to.have.status(200)
//                 expect(res.body).to.be.an('array')
//                 done()
//             })
//     })
//     it('should return a comment', function(done) {
//         chai
//             .request(app)
//             .get(`/comments/one/${tmp_comment._id}`)
//             .set({
//                 token: tmp_token
//             })
//             .end(function(err, res) {
//                 expect(res).to.have.status(200)
//                 done()
//             })
//     })
//     it('should not return a comment if user not login ', function(done) {
//         chai
//             .request(app)
//             .get(`/comments/one/${tmp_comment._id}`)
//             .set({})
//             .end(function(err, res) {
//                 expect(res).to.have.status(500)
//                 expect(res.body).to.have.property('message')
//                 expect(res.body.message).to.equal(`Please signin first`)
//                 done()
//             })
//     })

//     after(function(done) {
//         User.deleteMany({}).then(function(data) {})
//         Article.deleteMany({}).then(function(data) {})
//         Comment.deleteMany({}).then(function(data) {})
//         done()
//     })
// })
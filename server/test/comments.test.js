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
// describe('POST /comments route test', function() {
//     let tmp_user_id = ''
//     let tmp_token = ''
//     let tmp_comment = ''
//     let tmp_user_id2 = ''
//     let tmp_token2 = ''
//     let tmp_comment2 = ''
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
//     beforeEach(function(done) {
//         tmp_comment = {
//             content: 'Many text for contents',
//             user_id: tmp_user_id
//         };
//         tmp_comment2 = {
//             content: 'Many text for contents2',
//             user_id: tmp_user_id2
//         };
//         done();
//         // Comment.create({
//         //         content: 'A comment here',
//         //         user_id: tmp_user_id
//         //     })
//         //     .then(function(data) {
//         //         tmp_comment = data
//         //         Comment.create({
//         //                 content: 'A comment here',
//         //                 user_id: tmp_user_id2
//         //             })
//         //             .then(function(data2) {
//         //                 tmp_comment2 = data2
//         //                 done()
//         //             })
//         //     })
//     });
//     it('should return success if status 200', function(done) {
//         chai
//             .request(app)
//             .post(`/comments`)
//             .send(tmp_comment)
//             .set({
//                 token: tmp_token
//             })
//             .end(function(err, res) {
//                 console.log(res.body)
//                 expect(res).to.have.status(200)
//                 done()
//             })
//     });
//     it("should return error if user not login", function(done) {
//         chai
//             .request(app)
//             .post('/comments')
//             .send(tmp_comment)
//             .set({})
//             .end(function(req, res) {
//                 expect(res).to.have.status(500)
//                 expect(res.body).to.have.property('message')
//                 expect(res.body.message).to.equal(`Please signin first`)
//                 done()
//             })
//     })
//     it("should return error if comment's user_id is null", function(done) {
//         tmp_comment.user_id = null
//         chai
//             .request(app)
//             .post('/comments')
//             .send(tmp_comment)
//             .set({
//                 token: tmp_token
//             })
//             .end(function(req, res) {
//                 expect(res).to.have.status(500)
//                 expect(res.body.message.errors.user_id.message).to.be.equal(`Comment must have a user`)
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
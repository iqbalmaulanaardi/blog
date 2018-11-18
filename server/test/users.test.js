// const chai = require('chai');
// const chaihttp = require('chai-http');
// const expect = chai.expect;
// const app = require('../app.js');
// chai.use(chaihttp);

// var mongooose = require('mongoose');
// const User = require('../models/users.js');

// describe('POST /users route test', function() {
//     it(`should return success if status 200`, function(done) {
//         chai
//             .request(app)
//             .post('/users')
//             .send({
//                 'email': 'user1@mail.com',
//                 'password': '123456'
//             })
//             .end(function(err, res) {
//                 expect(err).to.be.null;
//                 expect(res).have.status(200);
//                 expect(res.body).to.be.an('object');
//                 done();
//             })
//     });
//     it(`should return error if password not hashed `, function(done) {
//         chai
//             .request(app)
//             .post('/users')
//             .send({
//                 'email': 'user1@mail.com',
//                 'password': '123456'
//             })
//             .end(function(err, res) {
//                 expect(res.body.password).not.equal('12345')
//                 done();
//             })
//     });
//     it(`should return error if email not unique`, function(done) {
//         chai
//             .request(app)
//             .post('/users')
//             .send({
//                 'email': 'user1@mail.com',
//                 'password': '123456'
//             })
//             .end(function(err, res) {
//                 let tmp = res.body.message.errors.email || undefined
//                 expect(res).status(400);
//                 expect(tmp.message).to.be.equal('Email is already taken');
//                 done();
//             })
//     });
//     it(`should return error if email not valid`, function(done) {
//         chai
//             .request(app)
//             .post('/users')
//             .send({
//                 'email': 'user1mail.com',
//                 'password': '123456'
//             })
//             .end(function(err, res) {
//                 let tmp = res.body.message.errors.email || undefined
//                 expect(res).status(400);
//                 expect(tmp.message).to.be.equal('Invalid Email Format');
//                 done();
//             })
//     });
//     it(`should return error if password empty`, function(done) {
//         chai
//             .request(app)
//             .post('/users')
//             .send({
//                 email: 'user1@mail.com',
//                 password: ''
//             })
//             .end(function(err, res) {
//                 let tmp = res.body.message.errors.password || undefined
//                 expect(res).status(400);
//                 expect(tmp.message).to.be.equal('EMPTY_STRING');
//                 done();
//             })
//     });

// });

// describe('POST /users/signin route test', function() {
//     it(`should return success if status 200`, function(done) {
//         chai
//             .request(app)
//             .post('/users/signin')
//             .send({
//                 'email': 'user1@mail.com',
//                 'password': '123456'
//             })
//             .end(function(err, res) {
//                 expect(err).to.be.null;
//                 expect(res).have.status(200);
//                 expect(res.body).to.be.an('object');
//                 expect(res.body).to.have.property('token');
//                 done();
//             })
//     });
//     it('should return error if user not found', function(done) {
//         chai
//             .request(app)
//             .post('/users/signin')
//             .send({
//                 'email': 'gohan@mail.com',
//                 'password': '123456'
//             })
//             .end(function(err, res) {
//                 expect(res).have.status(500);
//                 expect(res.body).to.be.an('object');
//                 expect(res.body.message).equal('Incorrect Email');
//                 done();
//             })
//     });
//     it('should return error if password incorrect', function(done) {
//         chai
//             .request(app)
//             .post('/users/signin')
//             .send({
//                 'email': 'user1@mail.com',
//                 'password': 'passwordsalahantonio'
//             })
//             .end(function(err, res) {
//                 console.log('ini', res.body);
//                 expect(res).have.status(500);
//                 expect(res.body).to.be.an('object');
//                 expect(res.body.message).equal('Incorrect password');
//                 done();
//             })
//     });
// })
// after(function(done) {
//     var NODE_ENV = 'test'
//     mongooose.connect('mongodb://127.0.0.1/blog_' + NODE_ENV, { useNewUrlParser: true }, function() {
//         console.log('mongoose connected')
//         User.deleteOne({ email: 'user1@mail.com' })
//             .then(() => {
//                 done()
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     })
// });
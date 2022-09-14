import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index.js';
import mongoose from 'mongoose';

// Configure chai
chai.use(chaiHttp);
chai.should();

console.log(`DB connection state: ${mongoose.connection.readyState}`);

describe("App", () => {
    describe("GET /", () => {
        // Test to create a user
        it("should create a user", (done) => {
            chai.request(app)
                .post('/api/user')
                .send({ name: 'tomtest', info: 'likes jerry' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to create a duplicate user
        it("should not create a user with duplicate name", (done) => {
            chai.request(app)
                .post('/api/user')
                .send({ name: 'tomtest', info: 'duplicate name' })
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to update a user
        it("should update a user", (done) => {
            chai.request(app)
                .put('/api/user')
                .send({ name: 'tomtest', info: 'dislikes jerry' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to update a user but with missing info
        it("should not update a user due to missing data", (done) => {
            chai.request(app)
                .put('/api/user')
                .send({ name: 'tomtest' })
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to query a user
        it("should get a user", (done) => {
            chai.request(app)
                .get('/api/user')
                .send({ name: 'tomtest' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to query a non-existent user
        it("should not get a missing user", (done) => {
            chai.request(app)
                .get('/api/user')
                .send({ name: 'tommissing' })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to query all users
        it("should get all users", (done) => {
            chai.request(app)
                .get('/api/user/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
         
        // Test to delete a user
        it("should delete a user", (done) => {
            chai.request(app)
                .delete('/api/user')
                .send({ name: 'tomtest' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        // Test to delete a user that has already been deleted
        it("should not delete an already deleted user", (done) => {
            chai.request(app)
                .delete('/api/user')
                .send({ name: 'tomtest' })
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });
});
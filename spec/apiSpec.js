process.env.NODE_ENV = 'test'
const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const seed = require('../seed/test.seed')
const PORT = require('../config').PORT[process.env.NODE_ENV];
const ROOT = `http://localhost:${PORT}/api`;

//server 
require('../server');

before(function (done) {
    this.timeout(10000); // added timeout of 10 seconds, to allow seeding to complete
    mongoose.connection.once('connected', () => {
        mongoose.connection.db.dropDatabase(() => {
            console.log('Dropped DB');
            seed(() => {
                done()
            });
        });
    });
});
describe('API ROUTES', () => {
    describe('GET /api', () => {
        it('should return the status is OK', (done) => {
            request(ROOT)
                .get('/')
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.status).to.equal('OK');
                    done();
                })
        });
    });

    describe('GET /api/articles', () => {
        it('should return the status is OK', (done) => {
            request(ROOT)
                .get('/articles')
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.articles.length > 0).to.equal(true);
                    done();
                })
        });
    });

    describe('GET /api/topics', () => {
        it('should return the status is OK', (done) => {
            request(ROOT)
                .get('/topics')
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.topics.length === 3).to.equal(true);
                    done();
                })
        });
    });

    describe('GET /api/topics/:topic_id/articles', () => {
        it('should return the status is OK', (done) => {
            request(ROOT)
                .get('/topics/football/articles')
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.articles.length > 0).to.equal(true);
                    done();
                })
        });
        it('should return an empty array if topic is invalid', (done) => {
            request(ROOT)
                .get('/topics/futbal/articles')
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.articles.length === 0).to.equal(true);
                    done();
                })
        });
    });    

    describe('GET /api/articles/:article_id/comments', () => {
        // it('should return the status is OK', (done) => {
        //     request(ROOT)
        //         .get('/articles/58de7c9aadaa770995a23f8c/comments')
        //         .end((error, response) => {
        //             if (error) throw error;
        //             expect(response.statusCode).to.equal(200);
        //             console.log(response)
        //             expect(response.bod).to.equal(true);
        //             done();
        //         })
        // });
        // it('should return an empty array if article_id is invalid', (done) => {
        //     request(ROOT)
        //         .get('/articles/INVALIDID/comments')
        //         .end((error, response) => {
        //             if (error) throw error;
        //             expect(response.statusCode).to.equal(200);
        //             console.log(response)
        //             expect(response.body.comments).to.eql({"comments": []});
        //             done();
        //         })
        // });
    });    

});


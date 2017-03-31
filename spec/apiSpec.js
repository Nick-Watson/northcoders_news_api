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
    this.timeout(7000); // added timeout of 7 seconds, to allow seeding to complete
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

});




    // describe('GET /api/articles', () => {
    //     it('should return the status is OK', (done) => {
    //         request(ROOT)
    //             .get('/articles')
    //             .end((error, response) => {
    //                 if (error) throw error;
    //                 expect(response.statusCode).to.equal(200);
    //                 console.log(response);
    //                 expect(response.body.status).to.equal('OK');
    //                 done();
    //             })
    //     });
    // });
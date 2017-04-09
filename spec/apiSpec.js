process.env.NODE_ENV = 'test';
const expect = require('chai').expect;
const request = require('supertest');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const seed = require('../seed/test.seed');
const PORT = require('../config').PORT[process.env.NODE_ENV];
const ROOT = `http://localhost:${PORT}/api`;

// server 
require('../server');

let sampleIds, invalidId, incorrectId;
before(function (done) {
    mongoose.connection.once('connected', () => {
        mongoose.connection.db.dropDatabase(() => {
            console.log('Dropped DB');
            seed((idsObj) => {
                sampleIds = idsObj;
                // also save some invalid IDs to test for errors
                // explain the difference between an invalid/incorrect ID
                invalidId = sampleIds.article_id.toString().split('');
                invalidId[invalidId.length - 1] =  '5345';
                invalidId = invalidId.join('');

                // take an ID from another database
                incorrectId = '5841a06fed9db244975922c3';
                console.log(invalidId);

                done();
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
                });
        });
    });

    describe('GET /api/articles', () => {
        it('should return an object containing all the articles', (done) => {
            request(ROOT)
                .get('/articles')
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.articles.length > 0).to.equal(true);
                    done();
                });
        });
    });

    describe('GET /api/topics', () => {
        it('should return an object containing an array of all the topics', (done) => {
            request(ROOT)
                .get('/topics')
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.topics.length === 3).to.equal(true);
                    done();
                });
        });
    });

    describe('GET /api/topics/:topic_id/articles', () => {
        it('should return an object containing an array of all the articles for that topic parameter', (done) => {
            request(ROOT)
                .get('/topics/football/articles')
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.articles.length > 0).to.equal(true);
                    done();
                });
        });
        it('should return an empty array if topic is invalid', (done) => {
            request(ROOT)
                .get('/topics/futbal/articles')
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.articles.length === 0).to.equal(true);
                    done();
                });
        });
    });    

    describe('GET /api/articles/:article_id/comments', () => {
        it('should return an object containing an array of all the comments for that article', (done) => {
            request(ROOT)
                .get(`/articles/${sampleIds.article_id}/comments`)
                .end((error, response) => {
                    if (error) throw error;

                    expect(response.statusCode).to.equal(200);
                    expect(response.body.comments.length > 0).to.equal(true);
                    done();
                });
        });
        it('should return an empty array if article_id is incorrect', (done) => {
            request(ROOT)
                .get(`/articles/${incorrectId}/comments`)
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body).to.eql({'comments': []});
                    done();
                });
        });
        
        it('should return an error if the article_id is invalid', (done) => {
            request(ROOT)
                .get(`/articles/${invalidId}/comments`)
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(400);
                    expect(response.body.stack_trace.name).to.eql('CastError');
                    done();
                });
        });
    }); 

    describe('GET /api/articles/:article_id', () => {
        it('should return an object containing the article data', (done) => {
            request(ROOT)
                .get(`/articles/${sampleIds.article_id}`)
                .end((error, response) => {
                    if (error) throw error;

                    expect(response.statusCode).to.equal(200);
                    expect(typeof response.body.article === 'object').to.equal(true);
                    expect(response.body.article._id).to.equal(String(sampleIds.article_id));
                    done();
                });
        });  

        it('should return an error if the article_id is invalid', (done) => {
            request(ROOT)
                .get(`/articles/${invalidId}`)
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(400);
                    expect(response.body.stack_trace.name).to.eql('CastError');
                    done();
                });
        });
    }); 
    
    describe('GET /api/comments/:comment_id', () => {
        it('should return an object containing the comment data', (done) => {
            request(ROOT)
                .get(`/comments/${sampleIds.comment_id}`)
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect(typeof response.body.comment === 'object').to.equal(true);
                    expect(response.body.comment._id).to.equal(String(sampleIds.comment_id));
                    done();
                });
        });  
        
        it('should return an error not found if comment id is invalid', (done) => {
            request(ROOT)
                .get(`/comments/${invalidId}`)
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(400);
                    expect(response.body.stack_trace.name).to.eql('CastError');
                    done();
                });
        });  
    }); 
    
    describe('POST /api/articles/:article_id/comments', () => {
        it('should create a a comment with a belongs_to value of article_id', (done) => {
            request(ROOT)
                .post(`/articles/${sampleIds.article_id}/comments`).send({comment: 'hello'})
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(201);
                    expect(typeof response.body.comment === 'object').to.equal(true);
                    expect(response.body.comment.body).to.equal('hello');
                    done();  
                });
        });  
    }); 
    
    describe('PUT /api/articles/:article_id', () => {
        it('should increment an articles votes property by 1 if a parameter of up is passed', (done) => {
            request(ROOT)
                .put(`/articles/${sampleIds.article_id}?vote=up`)
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.STATUS === 'SUCCESS').to.equal(true);
                    done();  
                });
        });  
        
        it('should decrement an articles votes property by 1 if a parameter of down is passed', (done) => {
            request(ROOT)
                .put(`/articles/${sampleIds.article_id}?vote=down`)
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.STATUS === 'SUCCESS').to.equal(true);
                    done();  
                });
        });  
    }); 
    
    describe('PUT /api/comments/:comment_id', () => {
        it('should increment a comments votes property by 1 if a parameter of up is passed', (done) => {
            request(ROOT)
                .put(`/comments/${sampleIds.comment_id}?vote=up`)
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.STATUS === 'SUCCESS').to.equal(true);
                    done();  
                });
        });  
        
        it('should decrement a comments votes property by 1 if a parameter of down is passed', (done) => {
            request(ROOT)
                .put(`/comments/${sampleIds.comment_id}?vote=down`)
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(200);
                    expect(response.body.STATUS === 'SUCCESS').to.equal(true);
                    done();  
                });
        });  
    }); 

    describe('DELETE /api/comments/comment_id', () => {
        it('should delete a comment and return a 204 status code if the comment was created by a northcoder', (done) => {
            request(ROOT)
                .delete(`/comments/${sampleIds.comment_id}`)
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(204);
                    done();  
                });
        });  
        it('should return a 403 stating permissions invalid if the comment was created by a non-northcoder', (done) => {
            request(ROOT)
                .delete(`/comments/${sampleIds.non_northcoder_comment}`)
                .end((error, response) => {
                    if (error) throw error;
                    expect(response.statusCode).to.equal(403);
                    done();  
                });
        });  
    }); 

});


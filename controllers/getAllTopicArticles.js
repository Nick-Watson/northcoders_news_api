const articlesModel = require('../models/articles');
const commentsModel = require('../models/comments');
const async = require('async');

function getAllTopicArticles (req, res, next) {
    const topicId = req.params.topic_id;

    articlesModel.find({belongs_to: topicId}, function (error, articles) {
        if (error) {
            return next(error);
        }
        async.mapSeries(articles, countArticleComments, function (error, result) {
            if (error) {
                next(error);
            }
            res.status(200).send({articles: result});
        });        
    });   
}

function countArticleComments (article, done) {
            commentsModel.find({belongs_to: article._id}, function (error, comments) {
                if (error) {
                    return done(error);
                }
                article = article.toObject();
                article.comments = comments.length;
                done(null, article);
            });
        }
        
module.exports = getAllTopicArticles;
const articlesModel = require('../models/articles');
const commentsModel = require('../models/comments');
const async = require('async');


function getAllArticles (req, res, next) {
    articlesModel.find({}, function (error, articles) {
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

module.exports = getAllArticles;
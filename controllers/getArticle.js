const articlesModel = require('../models/articles');
const commentsModel = require('../models/comments');
const async = require('async');

function getArticle (req, res, next) {
  async.waterfall([
    function (next) {
        const articleId = req.params.article_id;
        articlesModel.findById(articleId, function (error, article) {
            if (error) {
                return next(error);
            }
            next(null, article);
        });
    },
    function (article, done) {
        commentsModel.find({belongs_to: article._id}, function (error, comments) {
            if (error) {
                return done(error);
            }
            article = article.toObject();
            article.comment_count = comments.length;
            done(null, article);
        });        
    }
  ], function (error, result) {
        if (error) {
            return next(error);
        }
        res.status(200).send({article: result});
  });
 }


module.exports = getArticle;

// incorrectId gives 500 internal server error. message 'no such article found'
// invalidId gives 500 internal server error. message Invalid ID
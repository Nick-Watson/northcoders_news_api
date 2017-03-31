const commentsModel = require('../models/comments')

function getAllCommentsForArticle (req, res, next) {
    const articleId = req.params.article_id;

    commentsModel.find({belongs_to:articleId}, function (error, comments) {
        if (error) {
            return next(error)
        }
        res.status(200).send({comments: comments});
    });   
}

module.exports = getAllCommentsForArticle
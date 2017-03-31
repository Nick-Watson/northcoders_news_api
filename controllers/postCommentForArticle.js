const commentsModel = require('../models/comments')

function postCommentForArticle(req, res, next) {

    const articleId = req.params.article_id;
    const commentBody = req.body.comment
    const comment = new commentsModel({body: commentBody, belongs_to: articleId})

    comment.save(function (error, comment) {
        if (error) {
            return next(error)
        }
        res.status(201).send({ comment: comment });
    })
}

module.exports = postCommentForArticle
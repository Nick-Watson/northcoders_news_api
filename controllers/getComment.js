const commentsModel = require('../models/comments')

function getComment (req, res, next) {
    const commentId = req.params.comment_id;

    commentsModel.find({_id: commentId}, function (error, comment) {
        if (error) {
            return next(error)
        }
        res.status(200).send({comment: comment});
    });   
}

module.exports = getComment
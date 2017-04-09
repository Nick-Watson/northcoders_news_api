const commentsModel = require('../models/comments');

function getComment (req, res, next) {
    const commentId = req.params.comment_id;

    commentsModel.findById(commentId, function (error, comment) {
        if (error) {
            return next(error);
        }
        res.status(200).send({comment: comment});
    });   
}

module.exports = getComment;

// invalidId/incorrectId should be a 404 not found
const commentsModel = require('../models/comments');

function deleteComment (req, res, next) {
    const commentId = req.params.comment_id;

    commentsModel.findByIdAndRemove({_id: commentId}, function (error, comment) {
        if (error) {
            return next(error);
        }
        else if (comment.created_by !== 'northcoder') {
            res.status(403).send({INVALID_PERMISSIONS: 'comment not created by northcoder'});
        }
        else {res.status(204).send();}
    });
}

module.exports = deleteComment;
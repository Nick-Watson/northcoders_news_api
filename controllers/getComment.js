const commentsModel = require('../models/comments')

function getComment (req, res) {
    const commentId = req.params.comment_id;

    commentsModel.find({_id: commentId}, function (error, comment) {
        if (error) {
            return res.status(500).send({error: error});
        }
        res.status(200).send({comment: comment});
    });   
}

module.exports = getComment
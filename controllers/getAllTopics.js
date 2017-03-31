const topicsModel = require('../models/topics')

function getAllTopics (req, res, next) {
    topicsModel.find({}, function (error, topics) {
        if (error) {
            return next(error)
        }
        res.status(200).send({topics: topics});
    });   
}

module.exports = getAllTopics
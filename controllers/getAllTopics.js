const topicsModel = require('../models/topics')

function getAllTopics (req, res) {
    topicsModel.find({}, function (error, topics) {
        if (error) {
            return res.status(500).send({error: error});
        }
        res.status(200).send({topics: topics});
    });   
}

module.exports = getAllTopics
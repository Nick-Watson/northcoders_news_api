const articlesModel = require('../models/articles')

function getAllTopicArticles (req, res) {
    const topicId = req.params.topic_id;

    articlesModel.find({belongs_to: topicId}, function (error, articles) {
        if (error) {
            return res.status(500).send({error: error});
        }
        res.status(200).send({articles: articles});
    });   
}

module.exports = getAllTopicArticles
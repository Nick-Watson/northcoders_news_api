const articlesModel = require('../models/articles')

function getAllArticles (req, res) {
    articlesModel.find({}, function (error, articles) {
        if (error) {
            return res.status(500).send({error: error});
        }
        res.status(200).send({articles: articles});
    });   
}

module.exports = getAllArticles
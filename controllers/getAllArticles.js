const articlesModel = require('../models/articles')

function getAllArticles (req, res, next) {
    articlesModel.find({}, function (error, articles) {
        if (error) {
            return next(error)
        }
        res.status(200).send({articles: articles});
    });   
}

module.exports = getAllArticles
const articlesModel = require('../models/articles');

function voteArticle (req, res, next) {
    const articleId = req.params.article_id;
    const query = queryBuilder(req.query);

    articlesModel.findOneAndUpdate({_id: articleId}, query, {new: true}, function (error, result) {
        if (error) {
            return next(error);
        }
        console.log(result);
        res.status(200).send(result);
    });
}

function queryBuilder (urlQuery) {
    let query;
    for (var key in urlQuery) {
        if (key === 'vote') {
            if (urlQuery[key] === 'up') {
                query = {$inc:{votes: 1}};
            }
            if (urlQuery[key] === 'down') {
                query = {$inc:{votes: -1}};
            }
        }

    }
    return query;
}

module.exports = voteArticle;
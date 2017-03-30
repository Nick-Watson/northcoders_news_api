const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const getAllTopics = require('../controllers/getAllTopics')
const getAllTopicArticles = require('../controllers/getAllTopicArticles')
const getAllArticles = require('../controllers/getAllArticles')
const getAllCommentsForArticle = require('../controllers/getAllCommentsForArticle')
const postCommentForArticle = require('../controllers/postCommentForArticle')

router.route('/').get(function (req, res) {
    res.status(200).send({status: 'OK'});
});

router.route('/topics').get(getAllTopics);

router.route('/articles').get(getAllArticles);

router.route('/topics/:topic_id/articles').get(getAllTopicArticles);

router.route('/articles/:article_id/comments').get(getAllCommentsForArticle).post(postCommentForArticle);

module.exports = router

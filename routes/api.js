const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const getAllTopics = require('../controllers/getAllTopics')
const getAllTopicArticles = require('../controllers/getAllTopicArticles')
const getAllArticles = require('../controllers/getAllArticles')
const getAllCommentsForArticle = require('../controllers/getAllCommentsForArticle')
const postCommentForArticle = require('../controllers/postCommentForArticle')
const voteArticle = require('../controllers/voteArticle')
const getArticle = require('../controllers/getArticle')
const getComment= require('../controllers/getComment')
const voteComment = require('../controllers/voteComment')
const deleteComment = require('../controllers/deleteComment')
const getUserProfile = require('../controllers/getUserProfile')


router.route('/').get(function (req, res) {
    res.status(200).send({status: 'OK'});
});

router.route('/topics').get(getAllTopics);

router.route('/articles').get(getAllArticles);

router.route('/articles/:article_id').get(getArticle);

router.route('/comments/:comment_id').get(getComment);

router.route('/topics/:topic_id/articles').get(getAllTopicArticles);

router.route('/articles/:article_id/comments').get(getAllCommentsForArticle).post(postCommentForArticle);

router.route('/articles/:article_id').put(voteArticle);

router.route('/comments/:comment_id').put(voteComment).delete(deleteComment);

router.route('/users/:username').get(getUserProfile)

module.exports = router

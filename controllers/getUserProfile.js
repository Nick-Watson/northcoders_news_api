const usersModel = require('../models/users')

function getUserProfile (req, res, next) {
    const userName = req.params.username;

    usersModel.find({username: userName}, function (error, user) {
        if (error) {
            return next(error);
        }
        res.status(200).send({user: user});
    });   
}

module.exports = getUserProfile
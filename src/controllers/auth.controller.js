const db = require('../models');

const User = db.user;
const now = new Date();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.checkUserRegistered = function (name) {
    return User.findOne({
        where: {
            username: name,
        }
    }).then(function (user) {
        if (user) {
            return user.id;
        } else {
            return 'null';
        }
    });
}

exports.register = async (req, res) => {
    const username = req.body.username;
    const checkUser = this.checkUserRegistered(username);
    const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: 86400 // 24 hours
    });
    if (checkUser != 'null') {
        res.status(409).send({
            statusCode: 409,
            statusMessage: 'Username already exist',
            statusDescription: 'Username already exist, please try another username'
        });
    }
    const userData = {
        username: username,
        name: req.body.name,
        password: bcrypt.hashSync(req.body.password, 8),
        createdAt: now,
        updatedAt: now
    };

    User.create(userData).then(user => {
        res.status(201).send({
            statusCode: 201,
            statusMessage: 'Created',
            statusDescription: 'Resource created',
            result: {
                'errorCode': '00',
                'errorMessage': 'Success',
                'data': {
                    "accessToken": token,
                    "accessTokenExpiresAt": '',
                    'accessTokenExpiresIn': '',
                    'refreshToken': '',
                    'refreshTokenExpiresAt': '',
                    'refreshTokenExpiresIn': '',
                },
            },
        });
    }).catch(err => {
        res.status(400).send({
            statusCode: 400,
            statusMessage: 'Bad Request',
            statusDescription: 'Request is invalid, missing parameters?'
        });
    });

};

exports.signIn = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({
        where: {
            username: username,
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({
                statusCode: 404,
                statusMessage: 'Not Found',
                statusDescription: 'User not found'
            });
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({
                statusCode: 401,
                statusMessage: 'Unauthorized',
                statusDescription: 'Invalid Password'
            });
        }
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });
        res.status(200).send({
            statusCode: 201,
            statusMessage: 'OK',
            statusDescription: 'Success',
            result: {
                'errorCode': '00',
                'errorMessage': 'Success',
                'data': {
                    "accessToken": token,
                    "accessTokenExpiresAt": '',
                    'accessTokenExpiresIn': '',
                    'refreshToken': '',
                    'refreshTokenExpiresAt': '',
                    'refreshTokenExpiresIn': '',
                },
            },
        });
    }).catch(err => {
        res.status(500).send({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            statusDescription: 'Something went wrong on our side.'
        });
    });
};
const express = require('express');
const userModel = require('../models/user');
const passport = require('passport');
const router = express.Router();

module.exports = () => {
    router.post("/register", (req, res, next) => {
        userModel.create(req.body)
            .then((newUser) => {
                req.logIn(newUser, function (err) {
                    if (err) { return next(err); }
                    res.status(200).json(newUser)
                });
                // res.status(200).json(newUser);
            })
            .catch((err) => {
                res.status(500).json(err)
            });
    });
    router.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(400).json({
                    status: "false",
                    message: "Введен неверный логин или пароль"
                })
            }
            req.logIn(user, function (err) {
                if (err) { return next(err); }
                res.status(200).json(user)
            })
        })(req, res, next);
    });
    return router
};
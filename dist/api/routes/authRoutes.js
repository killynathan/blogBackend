'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _apihelpers = require('../apihelpers');

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (router) {
	router.post('/register', function (req, res, next) {
		if (!req.body.username || !req.body.password) return (0, _apihelpers.handleError)(res, 'missing username/password', 'missing username/password', 400);

		_User2.default.findOne({ 'username': req.body.username }, function (err, user) {
			if (err) {
				(0, _apihelpers.handleError)(res, err.message, "failed to get user");
			} else {
				if (user) {
					res.status(400).json({
						message: 'user already exists'
					});
				} else {
					var newUser = new _User2.default();
					newUser.local.email = req.body.email;
					newUser.setPassword(req.body.password);
					newUser.username = req.body.username;
					newUser.profile.name = req.body.username;
					newUser.blogpostsUrl = '/users/' + req.body.username + '/blogposts';
					newUser.save(function (err, user) {
						if (err) (0, _apihelpers.handleError)(res, err.message, 'failed to create user');else return res.status(201).json({
							message: 'created new user',
							data: user
						});
					});
				}
			}
		});
	});

	router.post('/login', function (req, res, next) {

		_passport2.default.authenticate('local', function (err, user, info) {
			if (err) return (0, _apihelpers.handleError)(res, err.message, 'failed to authenticate user');
			if (!user) return (0, _apihelpers.handleError)(res, 'wrong email/pass', 'wrong email/pass', 400);
			req.login(user, function (err) {
				if (err) return (0, _apihelpers.handleError)(res, err.message, 'failed to login');
				return res.status(200).json({ message: 'logged in', data: user, token: user.generateJWT() });
			});
		})(req, res, next);
	});
};
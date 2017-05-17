'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

function handleError(res, reason, message, code) {
	console.log("ERROR: " + reason);
	res.status(code || 500).json({ error: message });
}

router.get('/', function (req, res) {
	res.status(200).json({
		status_message: 'hi'
	});
});

router.post('/users', function (req, res, next) {
	var newUser = new _User2.default(req.body);
	newUser.save(function (err, user) {
		if (err) handleError(res, err.message, "Failed to create new user");else {
			res.status(201).json({
				message: 'success',
				data: user
			});
		}
	});
});

router.get('/users', function (req, res, next) {
	_User2.default.find(function (err, users) {
		if (err) {
			handleError(res, err.message, "Failed to get users");
		} else {
			res.status(200).json({
				message: 'success',
				data: users
			});
		}
	});
});

router.get('/users/:name', function (req, res, next) {
	_User2.default.findOne({ 'username': req.params.name }, function (err, user) {
		if (err) {
			handleError(res, err.message, "failed to get user");
		} else {
			if (user) {
				res.status(200).json({
					message: 'success',
					data: user
				});
			} else {
				handleError(res, "user not found", "user not found", 404);
			}
		}
	});
});

router.get('/users/:name/public', function (req, res, next) {
	_User2.default.findOne({ 'username': req.params.name }, function (err, user) {
		if (err) {
			handleError(res, err.message, "failed to get user");
		} else {
			if (user) {
				res.status(200).json({
					message: 'success',
					data: {
						profile: user.profile,
						username: user.username,
						blogPosts: user.blogPosts
					}
				});
			} else {
				handleError(res, "user not found", "user not found", 404);
			}
		}
	});
});

router.delete('/users/:name', function (req, res) {
	_User2.default.deleteOne({ 'username': req.params.name }, function (err, info) {
		if (err) handleError(res, err.message, "Failed to delete user");else res.status(200).json({ message: 'success', data: info });
	});
});

// router.put('/users/:name', (req, res, next) => {
// 	User.findOne({'username': req.params.name}, (err, user) => {
// 		if (err) {
// 			return res.json({message: err});
// 		}
// 		else {
// 			if (user) {
// 				user.blogPosts.unshift({title:'test', body: 'test'});

// 				user.save((err) => {
// 					if (err) res.send(err);

// 					res.send({message: 'user updated'});
// 				});
// 			}
// 			else {
// 				res.send('couldnt find user');
// 			}
// 		}
// 	});
// });

router.put('/users/:name', function (req, res, next) {
	_User2.default.findOneAndUpdate({ 'username': req.params.name }, req.body, function (err, user) {
		if (err) {
			return res.send(err);
		} else {
			res.send('sueccess');
		}
	});
});

router.post('/register', function (req, res, next) {
	if (!req.body.username || !req.body.password) return handleError(res, 'missing username/password', 'missing username/password', 400);

	_User2.default.findOne({ 'username': req.body.username }, function (err, user) {
		if (err) {
			handleError(res, err.message, "failed to get user");
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
				newUser.save(function (err, user) {
					if (err) handleError(res, err.message, 'failed to create user');else return res.status(201).json({
						message: 'created new user',
						data: user
					});
				});
			}
		}
	});
});

router.post('/registerTest', _passport2.default.authenticate('local-signup', {
	successRedirect: '/',
	failureRedirect: '/registerTest'
}));

router.post('/login', function (req, res, next) {

	_passport2.default.authenticate('local', function (err, user, info) {
		if (err) return handleError(res, err.message, 'failed to authenticate user');
		if (!user) return handleError(res, 'wrong email/pass', 'wrong email/pass', 400);
		req.login(user, function (err) {
			if (err) return handleError(res, err.message, 'failed to login');
			return res.status(200).json({ message: 'logged in', data: user, token: user.generateJWT() });
		});
	})(req, res, next);
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();

	return res.redirect('/');
};

exports.default = router;
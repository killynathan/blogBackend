'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _User = require('../../models/User');

var _User2 = _interopRequireDefault(_User);

var _Blogpost = require('../../models/Blogpost');

var _Blogpost2 = _interopRequireDefault(_Blogpost);

var _apiHelpers = require('../apiHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (router) {
	router.post('/users', function (req, res, next) {
		var newUser = new _User2.default(req.body);
		newUser.save(function (err, user) {
			if (err) (0, _apiHelpers.handleError)(res, err.message, "Failed to create new user");else {
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
				(0, _apiHelpers.handleError)(res, err.message, "Failed to get users");
			} else {
				res.status(200).json({
					message: 'success',
					data: users
				});
			}
		});
	});

	router.get('/users/:name', function (req, res, next) {
		_User2.default.findOne({ 'username': req.params.name }, 'profile username', function (err, user) {
			if (err) {
				(0, _apiHelpers.handleError)(res, err.message, "failed to get user");
			} else {
				if (user) {
					res.status(200).json({
						message: 'success',
						data: user
					});
				} else {
					(0, _apiHelpers.handleError)(res, "user not found", "user not found", 404);
				}
			}
		});
	});

	router.get('/users/:name/public', function (req, res, next) {
		_User2.default.findOne({ 'username': req.params.name }, 'profile username blogPosts', function (err, user) {
			if (err) {
				(0, _apiHelpers.handleError)(res, err.message, "failed to get user");
			} else {
				if (user) {
					res.status(200).json({
						message: 'success',
						data: user
					});
				} else {
					(0, _apiHelpers.handleError)(res, "user not found", "user not found", 404);
				}
			}
		});
	});

	router.delete('/users/:name', function (req, res) {
		_User2.default.deleteOne({ 'username': req.params.name }, function (err, info) {
			if (err) return (0, _apiHelpers.handleError)(res, err.message, "Failed to delete user");else res.status(200).json({ message: 'success', data: info });
		});
	});

	router.put('/users/:name', function (req, res, next) {
		_User2.default.findOneAndUpdate({ 'username': req.params.name }, req.body, function (err, user) {
			if (err) {
				return res.send(err);
			} else {
				res.send('success');
			}
		});
	});

	router.get('/users/:name/blogposts', function (req, res, next) {
		_Blogpost2.default.find({ 'author': req.params.name, 'draft': false }, null, { sort: '-date' }, function (err, blogposts) {
			if (err) return (0, _apiHelpers.handleError)(res, err.message, 'Failed to get blogposts');
			return (0, _apiHelpers.handleSuccess)(res, 'got users blogposts', blogposts);
		});
	});
};
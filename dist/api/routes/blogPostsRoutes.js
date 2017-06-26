'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Blogpost = require('../../models/Blogpost');

var _Blogpost2 = _interopRequireDefault(_Blogpost);

var _apiHelpers = require('../apiHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (router) {
	router.get('/blogPosts', function (req, res, next) {
		_Blogpost2.default.find(function (err, doc) {
			if (err) return (0, _apiHelpers.handleError)(res, err.message, 'failed to get blogposts');
			return (0, _apiHelpers.handleSuccess)(res, 'success', doc);
		});
	});

	router.get('/blogPosts/:id', function (req, res, next) {
		_Blogpost2.default.findById(req.params.id, function (err, doc) {
			if (err) return (0, _apiHelpers.handleError)(res, err.message, 'failed to get blogpost', 400);else {
				if (doc) {
					if (doc.private) return (0, _apiHelpers.handleSuccess)(res, "not found", null);else if (doc.anonymous) {
						doc.author = 'anonymous';
						return (0, _apiHelpers.handleSuccess)(res, 'success', doc);
					}
					return (0, _apiHelpers.handleSuccess)(res, 'success', doc);
				}
				(0, _apiHelpers.handleSuccess)(res, "not found", null);
			}
		});
	});

	router.post('/blogPosts', function (req, res, next) {
		var newBlogpost = new _Blogpost2.default(req.body);
		console.log(req.body);
		newBlogpost.save(function (err, doc) {
			if (err) return (0, _apiHelpers.handleError)(res, err.message, 'failed to create post');
			return (0, _apiHelpers.handleSuccess)(res, 'success', doc);
		});
	});

	router.delete('/blogPosts/:id', function (req, res, next) {
		_Blogpost2.default.deleteOne({ _id: req.params.id }, function (err, doc) {
			if (err) return (0, _apiHelpers.handleError)(res, err.message, 'failed to delete post');
			return (0, _apiHelpers.handleSuccess)(res, 'success', doc);
		});
	});

	router.put('/blogPosts/:id', function (req, res, next) {
		_Blogpost2.default.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, doc) {
			if (err) return (0, _apiHelpers.handleError)(res, err.message, 'failed to update post');
			return (0, _apiHelpers.handleSuccess)(res, 'success', doc);
		});
	});
};
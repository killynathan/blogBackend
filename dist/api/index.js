'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _blogPostsRoutes = require('./routes/blogPostsRoutes');

var _blogPostsRoutes2 = _interopRequireDefault(_blogPostsRoutes);

var _usersRoutes = require('./routes/usersRoutes');

var _usersRoutes2 = _interopRequireDefault(_usersRoutes);

var _authRoutes = require('./routes/authRoutes');

var _authRoutes2 = _interopRequireDefault(_authRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

(0, _blogPostsRoutes2.default)(router);

(0, _usersRoutes2.default)(router);

(0, _authRoutes2.default)(router);

router.get('/', function (req, res) {
	res.status(200).json({
		status_message: 'hiyo!'
	});
});

exports.default = router;
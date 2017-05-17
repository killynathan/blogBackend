'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSchema = _mongoose2.default.Schema({
	local: {
		email: String,
		hash: String,
		salt: String
	},
	username: String,
	dateCreated: { type: Date, default: Date.now },
	blogPosts: [{ title: String, body: String }],
	profile: {
		name: { type: String, default: 'hi' },
		description: { type: String, default: 'Welcome to my blog!' }
	}
});

UserSchema.methods.setPassword = function (password) {
	this.local.salt = _crypto2.default.randomBytes(16).toString('hex');
	this.local.hash = _crypto2.default.pbkdf2Sync(password, this.local.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function (password) {
	var hash = _crypto2.default.pbkdf2Sync(password, this.local.salt, 1000, 64).toString('hex');
	return hash === this.local.hash;
};

UserSchema.methods.generateJWT = function () {
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return _jsonwebtoken2.default.sign({
		_id: this._id,
		username: this.username,
		exp: parseInt(exp.getTime() / 1000)
	}, 'SECRET');
};

var User = _mongoose2.default.model('User', UserSchema);

exports.default = User;
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _passportLocal = require('passport-local');

var _User = require('../models/User');

var _User2 = _interopRequireDefault(_User);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export const (passport) => {
// 	passport.serializeUser = (user, done) => {
// 		done(null, user.id);
// 	};

// 	passport.deserializeUser = (id, done) {
// 		User.findById(id, (err, user) => {
// 			done(err, user);
// 		});
// 	};

// 	passport.use('local-signup', new LocalStrategy(
// 		(req, username, password, done) => {
// 			User.findOne({
// 				'local.username': username
// 			}, (err, user) => {
// 				if (err) return done(err);

// 				if (user) return done(null, false);

// 				else {
// 					var newUser = new User();
// 					newUser.local.username 
// 				}
// 			})
// 		}
// 	))

// 	passport.use('local-login', new LocalStrategy((username, password, done) => {
// 		User.findOne({'local.username': username}, (err, user) => {
// 			if (err) return done(err);
// 			if (!user) return done(null, false, {message: 'incorrect username'});
// 			if (!user.validPassword(password))
// 				return done(null, false, {message: 'incorrect password'});
// 			return done(null, user);
// 		});
// 	}))


// }

_passport2.default.serializeUser(function (user, done) {
	done(null, user.id);
});

_passport2.default.deserializeUser(function (id, done) {
	_User2.default.findById(id, function (err, user) {
		done(err, user);
	});
});

_passport2.default.use('local-signup', new _passportLocal.Strategy({
	usernameField: 'username',
	passwordField: 'password',
	emailField: 'email'
}, function (username, password, email, done) {
	_User2.default.findOne({
		'local.username': username
	}, function (err, user) {
		if (err) return done(err);

		if (user) return done(null, false, { message: 'username already exists' });else {
			var newUser = new _User2.default();
			newUser.local.username = username;
			newUser.setPassword(password);
			newUser.local.email = email;
			newUser.profile.name = username;
			newUser.save(function (err, user) {
				if (err) throw err;
				return done(null, user);
			});
		}
	});
}));

_passport2.default.use(new _passportLocal.Strategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function (req, email, password, done) {
	_User2.default.findOne({ 'local.email': email }, function (err, user) {
		if (err) return done(err);
		if (!user) return done(null, false, { message: 'incorrect email' });
		if (!user.validPassword(password)) return done(null, false, { message: 'incorrect password' });
		return done(null, user);
	});
}));

exports.default = _passport2.default;
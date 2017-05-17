import {Strategy as LocalStrategy} from 'passport-local';
import User from '../models/User';
import passport from 'passport';

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

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});

passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		emailField: 'email'
	},
	(username, password, email, done) => {
		User.findOne({
			'local.username': username
		}, (err, user) => {
			if (err) return done(err);

			if (user) return done(null, false, {message: 'username already exists'});

			else {
				var newUser = new User();
				newUser.local.username = username;
				newUser.setPassword(password);
				newUser.local.email = email;
				newUser.profile.name = username;
				newUser.save((err, user) => {
					if (err) throw(err);
					return done(null, user);
				});
			}
		})
	}
));

passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	(req, email, password, done) => {
		User.findOne({'local.email': email}, (err, user) => {
			if (err) return done(err);
			if (!user) return done(null, false, {message: 'incorrect email'});
			if (!user.validPassword(password))
				return done(null, false, {message: 'incorrect password'});
			return done(null, user);
		});
	}
));

export default passport;
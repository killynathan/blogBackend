import mongoose from 'mongoose';
import {handleError, handleSuccess} from '../apihelpers';
import passport from 'passport';
import User from '../../models/User';

export default (router) => {
	router.post('/register', (req, res, next) => {
		if (!req.body.username || !req.body.password) 
			return handleError(res, 'missing username/password', 'missing username/password', 400);


		User.findOne({'username': req.body.username}, (err, user) => {
			if (err) {
				handleError(res, err.message, "failed to get user");
			}
			else {
				if (user) {
					res.status(400).json({
						message: 'user already exists'
					});
				}
				else {
					var newUser = new User();
					newUser.local.email = req.body.email;
					newUser.setPassword(req.body.password);
					newUser.profile.username = req.body.username;
					newUser.profile.nickname = req.body.username;
					newUser.save((err, user) => {
						if (err) handleError(res, err.message, 'failed to create user');
						else return res.status(201).json({
							message: 'created new user',
							data: user
						});
					});
				}
			}
		});
	});

	router.post('/login', (req, res, next) => {

		passport.authenticate('local', 
			(err, user, info) => {
				if (err) return handleError(res, err.message, 'failed to authenticate user');
				if (!user) return handleError(res, 'wrong email/pass', 'wrong email/pass', 400);
				req.login(user, (err) => {
					if (err) return handleError(res, err.message, 'failed to login');
					return res.status(200).json({message: 'logged in', data: user, token: user.generateJWT()});
				});
			}
		)(req, res, next);
	});
};
import mongoose from 'mongoose';
import User from '../../models/User';
import Blogpost from '../../models/Blogpost';
import {handleError, handleSuccess} from '../apiHelpers';

export default (router) => {
	router.post('/users', (req, res, next) => {
		var newUser = new User(req.body);
		newUser.save((err, user) => {
			if (err) handleError(res, err.message, "Failed to create new user");
			else {
				res.status(201).json({
					message: 'success',
					data: user
				});
			}
		})
	});

	router.get('/users', (req, res, next) => {
		User.find((err, users) => {
			if (err) {
				handleError(res, err.message, "Failed to get users");
			}
			else {
				res.status(200).json({
					message: 'success',
					data: users
				});
			}
		});
	});

	router.get('/users/:name', (req, res, next) => {
		User.findOne({'username': req.params.name}, 'profile username', (err, user) => {
			if (err) {
				handleError(res, err.message, "failed to get user");
			}
			else {
				if (user) {
					res.status(200).json({
						message: 'success',
						data: user
					});
				}
				else {
					handleError(res, "user not found", "user not found", 404);
				}
			}
		});
	});

	router.get('/users/:name/public', (req, res, next) => {
		User.findOne({'username': req.params.name}, 'profile username blogPosts', (err, user) => {
			if (err) {
				handleError(res, err.message, "failed to get user");
			}
			else {
				if (user) {
					res.status(200).json({
						message: 'success',
						data: user
					});
				}
				else {
					handleError(res, "user not found", "user not found", 404);
				}
			}
		});
	});

	router.delete('/users/:name', (req, res) => {
		User.deleteOne({'username': req.params.name}, (err, info) => {
			if (err) return handleError(res, err.message, "Failed to delete user");
			else res.status(200).json({message: 'success', data: info});
		});
	});

	router.put('/users/:name', (req, res, next) => {
		User.findOneAndUpdate({'username': req.params.name}, req.body, (err, user) => {
			if (err) {
				return res.send(err);
			}
			else {
				res.send('success');
			}
		});
	});

	router.get('/users/:name/blogposts', (req, res, next) => {
		Blogpost.find({'author': req.params.name, 'draft': false}, null, {sort: '-date'}, (err, blogposts) => {
			if (err) return handleError(res, err.message, 'Failed to get blogposts');
			return handleSuccess(res, 'got users blogposts', blogposts);
		});
	});
};
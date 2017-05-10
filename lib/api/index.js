import express from 'express';
const router = express.Router();

import mongoose from 'mongoose';
import User from '../models/User';

function handleError(res, reason, message, code) {
	console.log("ERROR: " + reason);
	res.status(code || 500).json({error: message});
}

router.get('/', (req, res) => {
	res.status(200).json({
		status_message: 'hi'
	});
});

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
	User.findOne({'username': req.params.name}, (err, user) => {
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
	User.findOne({'username': req.params.name}, (err, user) => {
		if (err) {
			handleError(res, err.message, "failed to get user");
		}
		else {
			if (user) {
				res.status(200).json({
					message: 'success',
					data: {
						profile: user.profile,
						blogPosts: user.blogPosts
					}
				});
			}
			else {
				handleError(res, "user not found", "user not found", 404);
			}
		}
	});
});

router.delete('/users/:name', (req, res) => {
	User.deleteOne({'username': req.params.name}, (err, user) => {
		if (err) handleError(res, err.message, "Failed to delete user");
		else res.status(200).json({message: 'success', data: user});
	});
})

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

router.put('/users/:name', (req, res, next) => {
	User.findOneAndUpdate({'username': req.params.name}, req.body, (err, user) => {
		if (err) {
			return res.send(err);
		}
		else {
			res.send('sueccess');
		}
	});
});

export default router;
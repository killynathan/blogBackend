import express from 'express';
const router = express.Router();

import mongoose from 'mongoose';
import User from '../models/User';

router.get('/', (req, res) => {
	res.send(
		'hi'
	);
});

router.post('/users', (req, res, next) => {
	var newUser = new User(req.body);
	newUser.save((err, user) => {
		if (err) return console.log(err);
		else {
			res.json({
				message: 'success'
			});
		}
	})
});

router.get('/users', (req, res, next) => {
	User.find((err, users) => {
		if (err) {
			return console.log(err);
		}
		else {
			res.json({
				message: 'success',
				data: users
			});
		}
	});
});

router.get('/users/:name', (req, res, next) => {
	User.findOne({'username': req.params.name}, (err, user) => {
		if (err) {
			return res.json({message: err});
		}
		else {
			if (user) {
				res.json({
					message: 'success',
					data: user
				});
			}
			else {
				res.send('couldnt find');
			}
		}
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
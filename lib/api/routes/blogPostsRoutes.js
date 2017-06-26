import mongoose from 'mongoose';
import Blogpost from '../../models/Blogpost';
import {handleError, handleSuccess} from '../apiHelpers';

export default (router) => {
	router.get('/blogPosts', (req, res, next) => {
		Blogpost.find((err, doc) => {
			if (err) return handleError(res, err.message, 'failed to get blogposts');
			return handleSuccess(res, 'success', doc);
		});
	});

	router.get('/blogPosts/:id', (req, res, next) => {
		Blogpost.findById(req.params.id, (err, doc) => {
			if (err) return handleError(res, err.message, 'failed to get blogpost', 400);
			else {
				if (doc) {
					if (doc.private) return handleSuccess(res, "not found", null);
					else if (doc.anonymous) {
						doc.author = 'anonymous';
						return handleSuccess(res, 'success', doc);
					}
					return handleSuccess(res, 'success', doc);
				}
				handleSuccess(res, "not found", null);
			}
		});
	});

	router.post('/blogPosts', (req, res, next) => {
		var newBlogpost = new Blogpost(req.body);
		console.log(req.body);
		newBlogpost.save((err, doc) => {
			if (err) return handleError(res, err.message, 'failed to create post');
			return handleSuccess(res, 'success', doc);
		});
	});

	router.delete('/blogPosts/:id', (req, res, next)=> {
		Blogpost.deleteOne({_id: req.params.id}, (err, doc)=> {
			if (err) return handleError(res, err.message, 'failed to delete post');
			return handleSuccess(res, 'success', doc);
		});
	});

	router.put('/blogPosts/:id', (req, res, next)=> {
		Blogpost.findOneAndUpdate({_id: req.params.id}, req.body, (err, doc)=>{
			if (err) return handleError(res, err.message, 'failed to update post');
			return handleSuccess(res, 'success', doc);
		});
	});

};
import express from 'express';
var router = express.Router();

import mongoose from 'mongoose';

import blogPostsRoutes from './routes/blogPostsRoutes';
blogPostsRoutes(router);
import usersRoutes from './routes/usersRoutes';
usersRoutes(router);
import authRoutes from './routes/authRoutes';
authRoutes(router);

router.get('/', (req, res) => {
	res.status(200).json({
		status_message: 'hi'
	});
});

export default router;
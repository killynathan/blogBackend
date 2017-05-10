import mongoose from 'mongoose';
import User from './lib/models/User';
mongoose.connect('mongodb://test:test@ds133321.mlab.com:33321/lifebook');
console.log('connected');
// User.update(
// 	{username: 'nate'},
// 	{profile: 'hi'}, 
// 	{multi: true},
// 	(err, data) => {
// 		if (err) {
// 			console.log(err);
// 			return;
// 		}
// 		console.log(data);
// 		return;
// 	});

User.findOne({username: 'nate'}, (err, user) => {
	if (err) {
		console.log(err);
		return;
	}

	user.profile = {
		name: 'nate',
		description: 'testing 1 2 3'
	};
	user.save();
});

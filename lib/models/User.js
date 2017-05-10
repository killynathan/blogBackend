import mongoose from 'mongoose';

var UserSchema = mongoose.Schema({
	username: String,
	blogPosts: [{title: String, body: String}],
	profile: {
		name: String,
		description: String
	}
});

var User = mongoose.model('User', UserSchema);

export default User;
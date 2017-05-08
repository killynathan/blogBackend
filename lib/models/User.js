import mongoose from 'mongoose';

var UserSchema = mongoose.Schema({
	username: String,
	blogPosts: [{title: String, body: String}]
});

var User = mongoose.model('User', UserSchema);

export default User;
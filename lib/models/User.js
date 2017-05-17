import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

var UserSchema = mongoose.Schema({
	local: {
		email: String,
		hash: String,
		salt: String
	},
	username: String,
	dateCreated: {type: Date, default: Date.now},
	blogPosts: [{title: String, body: String}],
	profile: {
		name: {type: String, default: 'hi'},
		description: {type: String, default: 'Welcome to my blog!'}
	}
});

UserSchema.methods.setPassword = function(password) {
	this.local.salt = crypto.randomBytes(16).toString('hex');
	this.local.hash = crypto.pbkdf2Sync(password, this.local.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.local.salt, 1000, 64).toString('hex');
	return hash === this.local.hash;
};

UserSchema.methods.generateJWT = function() {
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 60);

	return jwt.sign({
		_id: this._id,
		username: this.username,
		exp: parseInt(exp.getTime() / 1000),
	}, 'SECRET');
}


var User = mongoose.model('User', UserSchema);

export default User;
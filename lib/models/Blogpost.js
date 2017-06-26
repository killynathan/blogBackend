import mongoose, {Schema} from 'mongoose';

var BlogpostSchema = mongoose.Schema({
	title: {type: String, required: true},
	body: {type: String, required: true},
	author: String,
	draft: {type: Boolean, default: false},
	private: {type: Boolean, default: false},
	anonymous: {type: Boolean, default: false},
	date: {type: Date, default: Date.now},
	likes: {type: Number, default: 0}
});

var Blogpost = mongoose.model('Blogpost', BlogpostSchema);

export default Blogpost;
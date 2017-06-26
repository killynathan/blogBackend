'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlogpostSchema = _mongoose2.default.Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
	author: String,
	draft: { type: Boolean, default: false },
	private: { type: Boolean, default: false },
	anonymous: { type: Boolean, default: false },
	date: { type: Date, default: Date.now },
	likes: { type: Number, default: 0 }
});

var Blogpost = _mongoose2.default.model('Blogpost', BlogpostSchema);

exports.default = Blogpost;
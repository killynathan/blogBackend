"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.handleError = handleError;
exports.handleSuccess = handleSuccess;
function handleError(res, reason, message, code) {
	console.log("ERROR: " + reason);
	res.status(code || 500).json({ error: message });
}

function handleSuccess(res, _message, _data, code) {
	res.status(code || 200).json({
		message: _message,
		data: _data
	});
}
const mongoose = require('mongoose');
// const Photo = require('./photos.js');

const userSchema = mongoose.Schema ({
	userName: {type: String, required: true, unique: true},
	password: String,
	// photos: [Photo.schema]
});

module.exports = mongoose.model('User', userSchema);
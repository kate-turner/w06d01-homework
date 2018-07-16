const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/photoSite')

mongoose.connection.on('connected', () => {
	console.log("Shazam! Mongoose is in the house!");
});
mongoose.connection.on('error', (err) => {
	console.log(err, "DAYUM");
});
mongoose.connection.on('disconnected', () => {
	console.log("Mongoose out!");
});
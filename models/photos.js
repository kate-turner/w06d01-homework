// const mongoose = require('mongoose');

// const photoSchema = mongoose.Schema({
// 	url: {type: String, required: true},
// 	description: String
// });

// module.exports = new mongoose.model('Photo', photoSchema);

// const mongoose = require(“mongoose”);


const photoSchema = new mongoose.Schema({
    name: String,
    image: [String]
});


const Photos = mongoose.model(“Photos”, photoSchema);

module.exports = Photos;



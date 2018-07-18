const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    name: String,
    image: {type: String, required: true}
});

module.exports = mongoose.model('Photo', photoSchema);


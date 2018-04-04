// Describes structure of data the will be stored in document in the database
// provides constructor for making Bird object

var mongoose = require('mongoose');

var birdSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},  // Bird common name
    description: String,  // description of bird
    averageEggs: { type: Number, min: 1, max: 50 },
    endangered: { type: Boolean, default: false}, // is the species threatened?
    datesSeen: [ Date ]  // Array of dates bird was seen
});

var Bird = mongoose.model('Bird', birdSchema);

module.exports = Bird;
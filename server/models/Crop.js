const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: { type: String },
  state: { type: String },  // State in which the crop is suitable
  season: { type: String },  // Season for the crop (Spring, Summer, etc.)
  price: { type: Number },
});

module.exports = mongoose.model('Crop', cropSchema);

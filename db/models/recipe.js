const mongoose = require('mongoose')

var RecipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1
  },
  link: {
    type: String,
    required: true,
    minlength: 1
  },
  tags: {
    type: Array,
    required: true
  }
});

var Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = { Recipe };

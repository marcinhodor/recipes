const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectID } = require('mongodb');
const http = require('http');

var { mongoose } = require('./db/mongoose.js');
var { Recipe } = require('./db/models/recipe.js');

const port = process.env.PORT || 3000;
// const publicPath = path.join(__dirname, 'public');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// retrieve all recipes
app.get('/api/recipes', (req, res) => {
  Recipe.find().then((recipes) => {
    res.send({
      recipes
    });
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// save new recipe
app.post('/api/recipes', (req, res) => {
  var recipe = new Recipe({
    title: req.body.title,
    link: req.body.link,
    tags: req.body.tags
  });

  recipe.save().then((doc) => {
    res.send(doc);
  }).catch((e) => {
    res.status(400).send(e);
    console.log(e);
  });
});

// update recipe
app.patch('/api/recipes', (req, res) => {
  // console.log(req.body);
  var id = req.body.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

  Recipe.findByIdAndUpdate(id, {
    title: req.params.title,
    link: req.params.link,
    tags: req.params.tags
  }).then((recipe) => {
    if (!recipe) {
      console.log('Recipe not found');
      return res.status(404).send();
    };

    res.send(recipe);
  }).catch((e) => {
    res.status(404).send();
    console.log(e);
  });
});

// delete a recipe
app.delete('/api/recipes/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  };

  Recipe.findByIdAndRemove(id).then((recipe) => {
    if (!recipe) {
      console.log('Recipe not found');
      return res.status(404).send();
    };

    res.send(recipe);
  }).catch((e) => {
    res.status(404).send();
    console.log(e);
  });
});

app.listen(port, () => {
  console.log(`server up on port: ${port}`)
});
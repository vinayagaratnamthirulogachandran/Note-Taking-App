const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejs = require('ejs');


const app = express();
const Note = require('./models/note');
const notesRouter = require('./routes/notes');
require('dotenv').config();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Your controller or route handler
app.get('/', async (req, res) => {
  try {
    const notes = await Note.find();
    res.render('index', { notes }); // pass the notes object to the template
  } catch (err) {
    console.log(err);
    res.render('error/500');
  }
});


mongoose.connect('mongodb://localhost/notes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/', notesRouter);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server Has Started`);
});


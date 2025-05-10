const express = require('express');
const chalk = require('chalk');
const fs = require('fs/promises');
const { addNote, getNotes } = require('./notes.controller');
const { log } = require('console');

const port = 4000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'pages');
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
  });
});

app.post('/', async (req, res) => {
  await addNote(req.body.title);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
  });
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});

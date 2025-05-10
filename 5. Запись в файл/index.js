const express = require('express');
const chalk = require('chalk');
const path = require('path');
const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require('./notes.controller');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'pages');

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    // notes: [],
    created: false,
  });
});

app.post('/', async (req, res) => {
  await addNote(req.body.title);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true,
  });
});

app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id);
  res.status(200).json({ message: 'Note deleted' });
});

app.put('/:id', async (req, res) => {
  const success = await updateNote(req.params.id, req.body.title);
  if (success) {
    res.status(200).json({ message: 'Note updated' });
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

const port = 4000;

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});

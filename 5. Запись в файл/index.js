const express = require('express');
const chalk = require('chalk');
const path = require('path');
const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require('./notes.controller');

const port = 4000;

const app = express();
app.use(express.json());
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
  console.log('id', req.params.id);

  await removeNote(req.params.id);
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false,
  });
});

let notes = [
  { id: '1746815301387', title: 'Пример' },
  // другие заметки...
];

app.put('/:id', async (req, res) => {
  const noteId = req.params.id;
  const newTitle = req.body.title;

  const success = await updateNote(noteId, newTitle);

  if (success) {
    res.status(200).json({ message: 'Note updated' });
  } else {
    res.status(404).json({ message: 'Note not found' });
  }
});

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`));
});

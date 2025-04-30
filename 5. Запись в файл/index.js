const yargs = require('yargs');

const pkg = require('./package.json');

const {
  addNote,
  printNotes,
  removeNote,
} = require('../5. Запись в файл/notes.controller');

yargs.version(pkg.version);

// Команда: add
yargs.command({
  command: 'add',
  describe: 'Add new note to list',
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

// Команда: list
yargs.command({
  command: 'list',
  describe: 'Print all notes',
  handler() {
    printNotes();
  },
});

// Команда: remove
yargs.command({
  command: 'remove',
  describe: 'Remove note by id',
  builder: {
    id: {
      type: 'string',
      describe: 'Note unic id',
      demandOption: true,
    },
  },
  handler({ id }) {
    removeNote(id);
  },
});

yargs.parse();

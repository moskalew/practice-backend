const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function getNotes() {
  try {
    const data = await fs.readFile(notesPath, 'utf-8');
    return Array.isArray(JSON.parse(data)) ? JSON.parse(data) : [];
  } catch (e) {
    console.error(chalk.red('Failed to read notes:', e));
    return [];
  }
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes, null, 2));
}

async function addNote(title) {
  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await saveNotes(notes);
  console.log(chalk.bgGreen('Note was added!'));
}

async function removeNote(id) {
  const notes = await getNotes();
  const updatedNotes = notes.filter((note) => note.id !== id);
  await saveNotes(updatedNotes);
  console.log(chalk.red(`Note with id="${id}" has been removed`));
}

async function updateNote(id, newTitle) {
  const notes = await getNotes();
  const note = notes.find((note) => note.id === id);

  if (!note) {
    console.log(chalk.yellow(`Note with id="${id}" not found`));
    return false;
  }

  note.title = newTitle;
  await saveNotes(notes);
  console.log(chalk.green(`Note with id="${id}" was updated`));
  return true;
}

async function printNotes() {
  const notes = await getNotes();
  console.log(chalk.bgBlue('Here is the list of notes:'));
  notes.forEach((note) =>
    console.log(chalk.white(note.id), chalk.blue(note.title))
  );
}

module.exports = {
  getNotes,
  addNote,
  removeNote,
  updateNote,
  printNotes,
};

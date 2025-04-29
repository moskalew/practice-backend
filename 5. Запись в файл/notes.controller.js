const fs = require('fs/promises');
const path = require('path');
const { array } = require('yargs');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
  const notes = await getNotes();
  console.log(notes);

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
}

addNote('Test!');

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

module.exports = {
  addNote,
  getNotes,
};

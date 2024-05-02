import { insertDB, getDB, saveDB } from "./db.js";

export const newNote = async (note, tags) => {
  const newNote = {
    id: Date.now(),
    content: note,
    tags: tags || [],
  };

  await insertDB(newNote);
  return newNote;
};

export const allNotes = async () => {
  const db = await getDB();
  return db.notes;
};

export const findNotes = async (filter) => {
  const db = await getDB();
  return db.notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );
};

export const removeNote = async (id) => {
    const db = await getDB();
    const noteIndex = db.notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
        return undefined;
    }
    db.notes.splice(noteIndex, 1);
    await saveDB(db);
    return id;
}

export const removeAllNotes = async () => {
    await saveDB({ notes: [] });
    return true;
}
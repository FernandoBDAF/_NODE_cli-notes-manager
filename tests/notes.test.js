import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.js");
const { newNote, allNotes, removeNote } = await import("../src/notes.js");

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

test("newNote inserts data and returns it", async () => {
    const data = { 
        id: Date.now(), 
        content: "note", 
        tags: ["hello"] 
    };
    
    insertDB.mockResolvedValue(data);
    
    const result = await newNote(data.content, data.tags);
    
    expect(result).toEqual(data);
});
  
test('getAllNotes returns all notes', async () => {
const db = {
    notes: ['note1', 'note2', 'note3']
};
getDB.mockResolvedValue(db);

const result = await allNotes();
expect(result).toEqual(db.notes);
});

test('removeNote does nothing if id is not found', async () => {
const notes = [
    { id: Date.now(), content: 'note 1' },
    { id: Date.now(), content: 'note 2' },
    { id: Date.now(), content: 'note 3' },
];
saveDB.mockResolvedValue(notes);

const idToRemove = 4;
const result = await removeNote(idToRemove);
expect(result).toBeUndefined();
});
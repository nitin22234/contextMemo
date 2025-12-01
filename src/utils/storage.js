const STORAGE_KEY = 'contextmemo_notes';

export async function getAllNotes() {
    try {
        const result = await chrome.storage.local.get(STORAGE_KEY);
        return result[STORAGE_KEY] || [];
    } catch (error) {
        console.error('Error getting notes:', error);
        return [];
    }
}

export async function getNotesByUrl(url) {
    try {
        const notes = await getAllNotes();
        const normalizedUrl = normalizeUrl(url);
        return notes.filter(note => normalizeUrl(note.url) === normalizedUrl);
    } catch (error) {
        console.error('Error getting notes by URL:', error);
        return [];
    }
}

export async function saveNote(note) {
    try {
        const notes = await getAllNotes();
        const newNote = {
            ...note,
            id: generateId(),
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        notes.push(newNote);
        await chrome.storage.local.set({ [STORAGE_KEY]: notes });
        return newNote;
    } catch (error) {
        console.error('Error saving note:', error);
        throw error;
    }
}

export async function updateNote(id, updates) {
    try {
        const notes = await getAllNotes();
        const index = notes.findIndex(note => note.id === id);

        if (index === -1) {
            throw new Error('Note not found');
        }

        notes[index] = {
            ...notes[index],
            ...updates,
            updatedAt: Date.now()
        };

        await chrome.storage.local.set({ [STORAGE_KEY]: notes });
        return notes[index];
    } catch (error) {
        console.error('Error updating note:', error);
        throw error;
    }
}

export async function deleteNote(id) {
    try {
        const notes = await getAllNotes();
        const filteredNotes = notes.filter(note => note.id !== id);
        await chrome.storage.local.set({ [STORAGE_KEY]: filteredNotes });
        return true;
    } catch (error) {
        console.error('Error deleting note:', error);
        return false;
    }
}

export async function searchNotes(query) {
    try {
        const notes = await getAllNotes();
        const lowerQuery = query.toLowerCase();
        return notes.filter(note =>
            note.content.toLowerCase().includes(lowerQuery) ||
            note.selectedText.toLowerCase().includes(lowerQuery) ||
            note.url.toLowerCase().includes(lowerQuery)
        );
    } catch (error) {
        console.error('Error searching notes:', error);
        return [];
    }
}

export async function clearAllNotes() {
    try {
        await chrome.storage.local.remove(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing notes:', error);
        return false;
    }
}

export async function exportNotes() {
    try {
        const notes = await getAllNotes();
        return JSON.stringify(notes, null, 2);
    } catch (error) {
        console.error('Error exporting notes:', error);
        throw error;
    }
}

export async function importNotes(jsonString) {
    try {
        const importedNotes = JSON.parse(jsonString);
        const existingNotes = await getAllNotes();

        const mergedNotes = [...existingNotes];
        importedNotes.forEach(importedNote => {
            if (!mergedNotes.find(note => note.id === importedNote.id)) {
                mergedNotes.push(importedNote);
            }
        });

        await chrome.storage.local.set({ [STORAGE_KEY]: mergedNotes });
        return true;
    } catch (error) {
        console.error('Error importing notes:', error);
        return false;
    }
}

function generateId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function normalizeUrl(url) {
    try {
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
    } catch {
        return url;
    }
}

export function onStorageChange(callback) {
    chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName === 'local' && changes[STORAGE_KEY]) {
            callback(changes[STORAGE_KEY].newValue || []);
        }
    });
}

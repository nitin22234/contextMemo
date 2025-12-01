import React, { useState, useEffect, useRef } from 'react';
import { saveNote } from '../utils/storage';

const NoteInput = ({ position, selectedText, domLocator, onClose, onSave }) => {
    const [noteContent, setNoteContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleSave = async () => {
        if (!noteContent.trim()) return;

        setIsSaving(true);
        try {
            const note = {
                url: window.location.href,
                content: noteContent,
                selectedText,
                domLocator
            };

            const savedNote = await saveNote(note);
            onSave(savedNote);
            onClose();
        } catch (error) {
            console.error('Failed to save note:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    // Use fixed positioning for true overlay - calculate position relative to viewport
    const style = {
        position: 'fixed',
        left: `${Math.min(position.x, window.innerWidth - 340)}px`,
        top: `${Math.min(position.y + 10, window.innerHeight - 350)}px`,
        zIndex: 2147483647,
    };

    return (
        <div
            style={style}
            className="w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden font-sans text-gray-800 animate-slide-up"
        >
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    <span className="text-sm font-bold text-white tracking-wide">Add Note</span>
                </div>
                <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/20 rounded-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <div className="p-4">
                <div className="mb-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                    <p className="text-xs font-medium text-yellow-800 mb-1">Selected Text:</p>
                    <p className="text-xs text-gray-700 italic line-clamp-3">"{selectedText}"</p>
                </div>

                <textarea
                    ref={inputRef}
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your note here... (Press Enter to save, Esc to cancel)"
                    className="w-full h-32 p-3 text-sm border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none resize-none transition-all placeholder-gray-400"
                />

                <div className="flex justify-end gap-2 mt-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all hover:shadow-md active:scale-95"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={!noteContent.trim() || isSaving}
                        className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none active:scale-95 flex items-center gap-2"
                    >
                        {isSaving ? (
                            <>
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Save Note
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteInput;

import React, { useState } from 'react';

const NoteList = ({ notes, onDelete, onJumpTo }) => {
    const [viewingNote, setViewingNote] = useState(null);

    if (notes.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <p>No notes found.</p>
                <p className="text-xs mt-2">Highlight text on any page and right-click to add a note.</p>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-3">
                {notes.map(note => (
                    <div key={note.id} className="bg-white p-3 rounded-lg shadow border border-gray-100 hover:border-green-200 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <a
                                href={note.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline truncate max-w-[200px] block"
                                title={note.url}
                            >
                                {new URL(note.url).hostname}
                            </a>
                            <span className="text-xs text-gray-400">
                                {new Date(note.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <div className="mb-2 text-xs text-gray-500 italic border-l-2 border-yellow-400 pl-2 line-clamp-2">
                            "{note.selectedText}"
                        </div>

                        <p className="text-sm text-gray-800 mb-3 line-clamp-3">{note.content}</p>

                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setViewingNote(note)}
                                className="text-xs text-green-600 hover:text-green-700 font-medium px-3 py-1 rounded hover:bg-green-50 transition-colors border border-green-200 hover:border-green-300"
                            >
                                View Full Note
                            </button>
                            <button
                                onClick={() => onDelete(note.id)}
                                className="text-xs text-red-500 hover:text-red-700 font-medium px-3 py-1 rounded hover:bg-red-50 transition-colors border border-red-200 hover:border-red-300"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {viewingNote && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    onClick={() => setViewingNote(null)}
                >
                    <div
                        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4 flex justify-between items-center">
                            <h2 className="text-white font-bold text-lg flex items-center gap-2">
                                📝 Full Note Details
                            </h2>
                            <button
                                onClick={() => setViewingNote(null)}
                                className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                                title="Close"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto flex-1">
                            <div className="mb-4">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                                    Page URL
                                </label>
                                <a
                                    href={viewingNote.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:text-blue-700 hover:underline break-all"
                                >
                                    {viewingNote.url}
                                </a>
                            </div>

                            <div className="mb-4">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                                    Highlighted Text
                                </label>
                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
                                    <p className="text-sm text-gray-800 italic">"{viewingNote.selectedText}"</p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                                    Your Note
                                </label>
                                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                                    <p className="text-sm text-gray-800 whitespace-pre-wrap">{viewingNote.content}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                                        Created
                                    </label>
                                    <p className="text-sm text-gray-700">
                                        {new Date(viewingNote.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 block">
                                        Last Updated
                                    </label>
                                    <p className="text-sm text-gray-700">
                                        {new Date(viewingNote.updatedAt || viewingNote.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200">
                            <button
                                onClick={() => {
                                    window.open(viewingNote.url, '_blank');
                                }}
                                className="text-sm text-blue-600 hover:text-blue-700 font-medium px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Open Page
                            </button>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewingNote(null)}
                                    className="text-sm text-gray-600 hover:text-gray-700 font-medium px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this note?')) {
                                            onDelete(viewingNote.id);
                                            setViewingNote(null);
                                        }
                                    }}
                                    className="text-sm text-white bg-red-500 hover:bg-red-600 font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete Note
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NoteList;

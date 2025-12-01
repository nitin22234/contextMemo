import React, { useState, useEffect } from 'react';
import { getAllNotes, deleteNote, searchNotes } from '../utils/storage';
import NoteList from './NoteList';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('current');
    const [currentUrl, setCurrentUrl] = useState('');

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs[0]) {
                setCurrentUrl(tabs[0].url);
            }
        });

        loadNotes();
    }, []);

    const loadNotes = async () => {
        const allNotes = await getAllNotes();
        setNotes(allNotes);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this note?')) {
            await deleteNote(id);
            await loadNotes();

            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs[0]) {
                    chrome.tabs.sendMessage(tabs[0].id, {
                        type: 'NOTE_DELETED',
                        payload: { id }
                    });
                }
            });
        }
    };

    const filteredNotes = notes.filter(note => {
        const matchesSearch =
            note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.selectedText.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.url.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        if (activeTab === 'current') {
            try {
                const noteUrl = new URL(note.url);
                const currUrl = new URL(currentUrl);
                return noteUrl.hostname === currUrl.hostname && noteUrl.pathname === currUrl.pathname;
            } catch {
                return false;
            }
        }

        return true;
    });

    return (
        <div className="w-[400px] h-[500px] bg-gray-50 flex flex-col font-sans">
            <header className="bg-white border-b border-gray-200 p-4 shadow-sm sticky top-0 z-10">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-xl font-bold text-gray-800 flex items-center">
                        <span className="text-2xl mr-2">📝</span> ContextMemo
                    </h1>
                    <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        {notes.length} notes
                    </span>
                </div>

                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 absolute left-3 top-2.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </header>

            <div className="flex border-b border-gray-200 bg-white">
                <button
                    onClick={() => setActiveTab('current')}
                    className={`flex-1 py-2 text-sm font-medium transition-colors relative ${activeTab === 'current' ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    Current Page
                    {activeTab === 'current' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600"></div>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('all')}
                    className={`flex-1 py-2 text-sm font-medium transition-colors relative ${activeTab === 'all' ? 'text-green-600' : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    All Notes
                    {activeTab === 'all' && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600"></div>
                    )}
                </button>
            </div>

            <main className="flex-1 overflow-y-auto p-4">
                <NoteList
                    notes={filteredNotes}
                    onDelete={handleDelete}
                />
            </main>

            <footer className="bg-white border-t border-gray-200 p-3 text-center text-xs text-gray-400">
                Right-click on any selected text to add a note
            </footer>
        </div>
    );
};

export default Dashboard;

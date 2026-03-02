import React, { useState } from 'react';
import { Save, FileText } from 'lucide-react';

const Notes = () => {
    const [note, setNote] = useState('');
    const [savedNotes, setSavedNotes] = useState([
        { id: 1, text: "Brainstorming for the new project...", date: "2026-03-01", time: "10:30 AM" }
    ]);

    const handleSave = () => {
        if (!note.trim()) return;

        const now = new Date();
        const newNote = {
            id: Date.now(),
            text: note,
            date: now.toISOString().split('T')[0],
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setSavedNotes([newNote, ...savedNotes]);
        setNote('');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h2 className="text-3xl font-bold text-white">Notes</h2>
                <p className="text-zinc-400 mt-1">Jot down your thoughts, ideas, or notes.</p>
            </div>

            <div className="bg-zinc-900 rounded-xl shadow-sm border border-zinc-800 overflow-hidden">
                <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-950">
                    <div className="flex items-center gap-2 text-zinc-300">
                        <FileText size={18} />
                        <span className="font-medium text-sm">New Note</span>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={!note.trim()}
                        className="flex items-center gap-2 bg-zinc-100 hover:bg-white text-black px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save size={16} />
                        Save Note
                    </button>
                </div>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Start writing here..."
                    className="w-full h-64 p-6 bg-transparent text-white placeholder-zinc-600 focus:outline-none resize-none font-sans"
                />
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Saved Notes</h3>
                {savedNotes.length === 0 ? (
                    <div className="text-center py-12 bg-zinc-900 rounded-xl border border-zinc-800 text-zinc-500">
                        No notes saved yet. Start writing above!
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {savedNotes.map((note) => (
                            <div key={note.id} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-colors">
                                <p className="text-white whitespace-pre-wrap leading-relaxed">{note.text}</p>
                                <div className="mt-4 flex items-center gap-4 text-xs text-zinc-500 font-medium">
                                    <span>{note.date}</span>
                                    <span>{note.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notes;

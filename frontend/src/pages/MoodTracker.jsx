import React, { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Smile, Frown, Meh, Angry } from 'lucide-react';

const MoodTracker = () => {
    const { moods, addMood } = useContext(DataContext);
    const [selectedMood, setSelectedMood] = useState(null);
    const [note, setNote] = useState('');

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedMood) {
            addMood({ mood: selectedMood, note });
            setSelectedMood(null);
            setNote('');
        }
    };

    const moodOptions = [
        { label: 'Happy', icon: <Smile className="w-8 h-8 text-green-500" /> },
        { label: 'Neutral', icon: <Meh className="w-8 h-8 text-yellow-500" /> },
        { label: 'Sad', icon: <Frown className="w-8 h-8 text-zinc-300" /> },
        { label: 'Angry', icon: <Angry className="w-8 h-8 text-red-500" /> },
    ];

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-zinc-100 mb-6">Mood Tracker</h2>

            <div className="bg-black p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-semibold mb-4">How are you feeling today?</h3>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-4 mb-6">
                        {moodOptions.map((option) => (
                            <button
                                key={option.label}
                                type="button"
                                onClick={() => handleMoodSelect(option.label)}
                                className={`p-4 rounded-full transition-all ${selectedMood === option.label
                                        ? 'bg-zinc-900/50 ring-4 ring-purple-200 transform scale-110'
                                        : 'hover:bg-zinc-900'
                                    }`}
                            >
                                {option.icon}
                                <span className="block text-sm mt-1 font-medium text-zinc-400">{option.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="mb-4">
                        <label className="block text-zinc-200 text-sm font-bold mb-2">
                            Add a note (optional)
                        </label>
                        <textarea
                            className="w-full p-3 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400"
                            rows="3"
                            placeholder="Why do you feel this way?"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        disabled={!selectedMood}
                        className={`w-full py-3 px-4 rounded-lg text-white font-semibold transition-colors ${selectedMood
                                ? 'bg-zinc-100 hover:bg-zinc-300'
                                : 'bg-slate-400 cursor-not-allowed'
                            }`}
                    >
                        Log Mood
                    </button>
                </form>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-zinc-100">Recent Moods</h3>
                {moods.length === 0 ? (
                    <p className="text-zinc-500 italic">No moods logged yet.</p>
                ) : (
                    moods.map((entry) => (
                        <div key={entry.id} className="bg-black p-4 rounded-lg shadow-sm border border-zinc-800 flex items-start gap-4">
                            <div className="p-2 bg-zinc-900 rounded-full">
                                {moodOptions.find(m => m.label === entry.mood)?.icon}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-zinc-100">{entry.mood}</span>
                                    <span className="text-xs text-zinc-500">{new Date(entry.date).toLocaleString()}</span>
                                </div>
                                {entry.note && <p className="text-zinc-400 mt-1">{entry.note}</p>}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MoodTracker;

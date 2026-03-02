import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { Zap, RefreshCcw, Save, MessageSquare } from 'lucide-react';

const PROMPTS = [
    "What is a belief you hold strongly, and what evidence would change your mind?",
    "If you could have a conversation with your future self (10 years from now), what would you ask?",
    "What is the most uncomfortable truth you've had to accept recently?",
    "If money were no object, how would you spend your days?",
    "What is a small habit that has had a huge impact on your life?",
    "Identify a time you failed. What did you learn from it that success couldn't have taught you?",
    "Who do you admire most, and which of their traits do you wish to embody?",
    "What is something you are procrastinating on, and what is the underlying fear?",
];

const ThinkPrompts = () => {
    const { promptHistory, addPromptEntry } = useContext(DataContext);
    const [currentPrompt, setCurrentPrompt] = useState(PROMPTS[0]);
    const [answer, setAnswer] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const generatePrompt = () => {
        const randomIndex = Math.floor(Math.random() * PROMPTS.length);
        setCurrentPrompt(PROMPTS[randomIndex]);
        setAnswer('');
    };

    const handleSave = () => {
        if (answer.trim()) {
            setIsSaving(true);
            setTimeout(() => { // Simulate delay for effect
                addPromptEntry(currentPrompt, answer);
                setAnswer('');
                setIsSaving(false);
            }, 600);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-zinc-100">Critical Thinking</h2>
                <p className="text-zinc-500 mt-1">Exercises for your mind.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Active Prompt Area */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-gradient-to-br from-white to-violet-600 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-black opacity-5 rounded-full blur-3xl transform translate-x-12 -translate-y-12 pointer-events-none"></div>

                        <div className="flex items-start gap-4 relative z-10">
                            <Zap className="text-yellow-300 fill-yellow-300 shrink-0" size={32} />
                            <div>
                                <h3 className="text-purple-100 font-medium tracking-wide text-sm uppercase mb-3">Daily Prompt</h3>
                                <p className="text-2xl font-bold leading-relaxed">"{currentPrompt}"</p>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={generatePrompt}
                                className="flex items-center gap-2 bg-black/20 hover:bg-black/30 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-colors text-sm font-medium"
                            >
                                <RefreshCcw size={16} />
                                New Prompt
                            </button>
                        </div>
                    </div>

                    <div className="bg-black p-6 rounded-xl shadow-sm border border-zinc-800">
                        <label className="block text-sm font-bold text-zinc-200 mb-3">Your Reflection</label>
                        <textarea
                            className="w-full p-4 border border-zinc-800 rounded-xl focus:ring-2 focus:ring-zinc-400 focus:border-zinc-200 min-h-[150px] resize-y text-zinc-200 leading-relaxed"
                            placeholder="Write your thoughts here..."
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                        ></textarea>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={handleSave}
                                disabled={!answer.trim() || isSaving}
                                className="flex items-center gap-2 bg-black hover:bg-zinc-900 text-white px-6 py-2.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSaving ? 'Saving...' : (
                                    <>
                                        <Save size={18} />
                                        Save Reflection
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* History Sidebar */}
                <div className="md:col-span-1">
                    <h3 className="font-bold text-zinc-100 mb-4 flex items-center gap-2">
                        <MessageSquare size={20} className="text-zinc-500" />
                        Recent Reflections
                    </h3>
                    <div className="space-y-4">
                        {promptHistory.length === 0 ? (
                            <p className="text-zinc-500 text-sm italic p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                                Your journal is empty. Answer a prompt to get started!
                            </p>
                        ) : (
                            promptHistory.slice(0, 5).map((entry) => (
                                <div key={entry.id} className="bg-black p-4 rounded-xl border border-zinc-800 shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
                                    <p className="text-xs text-zinc-500 font-medium mb-2">
                                        {new Date(entry.date).toLocaleDateString()}
                                    </p>
                                    <p className="text-zinc-100 font-medium text-sm line-clamp-2 mb-2 group-hover:text-white transition-colors">
                                        {entry.question}
                                    </p>
                                    <p className="text-zinc-500 text-xs line-clamp-3 leading-relaxed">
                                        {entry.answer}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThinkPrompts;

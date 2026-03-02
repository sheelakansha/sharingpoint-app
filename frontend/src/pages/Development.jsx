import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { Plus, X, Award, TrendingUp, BookOpen } from 'lucide-react';

const Development = () => {
    const { development, addDevelopmentItem, removeDevelopmentItem } = useContext(DataContext);
    const [newItem, setNewItem] = useState({ type: 'strengths', text: '' });

    const handleAdd = (e) => {
        e.preventDefault();
        if (newItem.text.trim()) {
            addDevelopmentItem(newItem.type, newItem.text);
            setNewItem({ ...newItem, text: '' });
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-zinc-100">Personal Development</h2>
                <p className="text-zinc-500 mt-1">Know yourself to grow yourself.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Strengths Section */}
                <div className="bg-black p-6 rounded-xl shadow-sm border border-zinc-800 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-zinc-800/50 rounded-lg text-white">
                            <Award size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-zinc-100">My Strengths</h3>
                            <p className="text-sm text-zinc-500">Things I excel at</p>
                        </div>
                    </div>

                    <div className="flex-1 space-y-3 mb-6">
                        {development.strengths.length === 0 && (
                            <p className="text-zinc-500 italic text-sm">List your core strengths here.</p>
                        )}
                        {development.strengths.map((item) => (
                            <div key={item.id} className="flex justify-between items-center bg-zinc-800/50/50 p-3 rounded-lg group">
                                <span className="text-zinc-200 font-medium">{item.text}</span>
                                <button
                                    onClick={() => removeDevelopmentItem('strengths', item.id)}
                                    className="text-purple-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleAdd} className="mt-auto">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full pl-4 pr-12 py-3 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-zinc-400 focus:border-zinc-200 transition-shadow"
                                placeholder="Add a strength..."
                                value={newItem.type === 'strengths' ? newItem.text : ''}
                                onChange={(e) => setNewItem({ type: 'strengths', text: e.target.value })}
                                onFocus={() => setNewItem({ ...newItem, type: 'strengths' })}
                            />
                            <button
                                type="submit"
                                disabled={!newItem.text.trim() || newItem.type !== 'strengths'}
                                className="absolute right-2 top-2 p-1.5 bg-zinc-100 text-white rounded-md hover:bg-zinc-300 disabled:opacity-50 disabled:hover:bg-zinc-100 transition-colors"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Areas for Development Section */}
                <div className="bg-black p-6 rounded-xl shadow-sm border border-zinc-800 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-amber-900/30 rounded-lg text-amber-600">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-zinc-100">Areas for Growth</h3>
                            <p className="text-sm text-zinc-500">Skills to improve</p>
                        </div>
                    </div>

                    <div className="flex-1 space-y-3 mb-6">
                        {development.areas.length === 0 && (
                            <p className="text-zinc-500 italic text-sm">Identify areas to work on.</p>
                        )}
                        {development.areas.map((item) => (
                            <div key={item.id} className="flex justify-between items-center bg-amber-900/30/50 p-3 rounded-lg group">
                                <span className="text-zinc-200 font-medium">{item.text}</span>
                                <button
                                    onClick={() => removeDevelopmentItem('areas', item.id)}
                                    className="text-amber-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleAdd} className="mt-auto">
                        <div className="relative">
                            <input
                                type="text"
                                className="w-full pl-4 pr-12 py-3 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-shadow"
                                placeholder="Add an area for growth..."
                                value={newItem.type === 'areas' ? newItem.text : ''}
                                onChange={(e) => setNewItem({ type: 'areas', text: e.target.value })}
                                onFocus={() => setNewItem({ ...newItem, type: 'areas' })}
                            />
                            <button
                                type="submit"
                                disabled={!newItem.text.trim() || newItem.type !== 'areas'}
                                className="absolute right-2 top-2 p-1.5 bg-amber-500 text-white rounded-md hover:bg-amber-600 disabled:opacity-50 disabled:hover:bg-amber-500 transition-colors"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Development;

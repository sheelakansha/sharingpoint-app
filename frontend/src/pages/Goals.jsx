import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { Plus, Trash2, CheckCircle, Circle } from 'lucide-react';

const Goals = () => {
    const { goals, addGoal, updateGoal, deleteGoal } = useContext(DataContext);
    const [isAdding, setIsAdding] = useState(false);
    const [newGoal, setNewGoal] = useState({ title: '', deadline: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newGoal.title) {
            addGoal(newGoal);
            setNewGoal({ title: '', deadline: '' });
            setIsAdding(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-zinc-100">Personal Goals</h2>
                    <p className="text-zinc-500 mt-1">Track your ambitions and celebrate progress.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-zinc-100 hover:bg-zinc-300 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    <span>New Goal</span>
                </button>
            </div>

            {isAdding && (
                <div className="mb-8 bg-black p-6 rounded-xl shadow-sm border border-zinc-800 animate-fade-in">
                    <form onSubmit={handleSubmit} className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-zinc-200 mb-1">Goal Title</label>
                            <input
                                type="text"
                                className="w-full p-2 border border-zinc-700 rounded-md focus:ring-2 focus:ring-zinc-400 focus:border-zinc-200"
                                placeholder="E.g., Learn Spanish, Run a Marathon"
                                value={newGoal.title}
                                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                            />
                        </div>
                        <div className="w-48">
                            <label className="block text-sm font-medium text-zinc-200 mb-1">Deadline</label>
                            <input
                                type="date"
                                className="w-full p-2 border border-zinc-700 rounded-md focus:ring-2 focus:ring-zinc-400 focus:border-zinc-200"
                                value={newGoal.deadline}
                                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                            />
                        </div>
                        <button type="submit" className="bg-zinc-100 text-white px-6 py-2 rounded-md hover:bg-zinc-300">
                            Save
                        </button>
                    </form>
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {goals.length === 0 ? (
                    <div className="col-span-2 text-center py-12 bg-black rounded-xl border border-zinc-800 border-dashed">
                        <p className="text-zinc-500">No goals set yet. Start by adding one!</p>
                    </div>
                ) : (
                    goals.map((goal) => (
                        <div key={goal.id} className="bg-black p-6 rounded-xl shadow-sm border border-zinc-800 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className={`text-xl font-bold ${goal.progress === 100 ? 'text-zinc-500 line-through' : 'text-zinc-100'}`}>
                                    {goal.title}
                                </h3>
                                <button
                                    onClick={() => deleteGoal(goal.id)}
                                    className="text-zinc-500 hover:text-red-500 transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between text-sm text-zinc-500 mb-1">
                                    <span>Progress</span>
                                    <span>{goal.progress}%</span>
                                </div>
                                <div className="w-full bg-zinc-900/50 rounded-full h-2.5">
                                    <div
                                        className="bg-zinc-100 h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${goal.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-50">
                                <div className="text-sm text-zinc-500">
                                    {goal.deadline && (
                                        <span>Target: {new Date(goal.deadline).toLocaleDateString()}</span>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        step="10"
                                        value={goal.progress}
                                        onChange={(e) => updateGoal(goal.id, { progress: parseInt(e.target.value) })}
                                        className="w-24 accent-white"
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Goals;

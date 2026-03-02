import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Link } from 'react-router-dom';
import {
    Activity,
    CheckCircle,
    Target,
    Zap,
    ArrowRight,
    TrendingUp,
    Smile,
    Calendar
} from 'lucide-react';

const Dashboard = () => {
    const { moods, goals, todos, development, promptHistory } = useContext(DataContext);

    const latestMood = moods[0];
    const pendingGoals = goals.filter(g => g.progress < 100).length;
    const pendingTodos = todos.filter(t => !t.completed).length;
    const strengthsCount = development.strengths.length;

    // Calculate goal progress average
    const totalGoalProgress = goals.length > 0
        ? Math.round(goals.reduce((acc, curr) => acc + curr.progress, 0) / goals.length)
        : 0;

    const sections = [
        {
            title: "Mood Tracker",
            link: "/mood",
            color: "bg-zinc-800/50 text-zinc-300",
            icon: <Smile size={24} />,
            content: latestMood ? (
                <div>
                    <p className="text-2xl font-bold text-zinc-100 mb-1">{latestMood.mood}</p>
                    <p className="text-sm text-zinc-500 truncate">{latestMood.note || "No note added"}</p>
                </div>
            ) : (
                <p className="text-zinc-500 text-sm">How are you feeling?</p>
            )
        },
        {
            title: "Active Goals",
            link: "/goals",
            color: "bg-zinc-800/50 text-white",
            icon: <Target size={24} />,
            content: (
                <div>
                    <p className="text-2xl font-bold text-zinc-100 mb-1">{pendingGoals}</p>
                    <div className="w-full bg-zinc-900/50 rounded-full h-1.5 mt-2">
                        <div className="bg-zinc-100 h-1.5 rounded-full" style={{ width: `${totalGoalProgress}%` }}></div>
                    </div>
                    <p className="text-xs text-zinc-500 mt-1">{totalGoalProgress}% Avg. Progress</p>
                </div>
            )
        },
        {
            title: "To-Do List",
            link: "/todo",
            color: "bg-emerald-900/30 text-emerald-600",
            icon: <CheckCircle size={24} />,
            content: (
                <div>
                    <p className="text-2xl font-bold text-zinc-100 mb-1">{pendingTodos}</p>
                    <p className="text-sm text-zinc-500">Tasks remaining</p>
                </div>
            )
        },
        {
            title: "Development",
            link: "/development",
            color: "bg-amber-900/30 text-amber-600",
            icon: <TrendingUp size={24} />,
            content: (
                <div>
                    <p className="text-2xl font-bold text-zinc-100 mb-1">{strengthsCount}</p>
                    <p className="text-sm text-zinc-500">Identified Strengths</p>
                </div>
            )
        }
    ];

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-100 mb-2">My Overview</h1>
                    <p className="text-zinc-500">Welcome back. Here's a snapshot of your progress.</p>
                </div>
                <div className="text-sm font-medium text-zinc-500 bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-800">
                    {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            {/* Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {sections.map((section, idx) => (
                    <Link
                        key={idx}
                        to={section.link}
                        className="bg-black p-6 rounded-xl shadow-sm border border-zinc-800 hover:shadow-md transition-all group"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg ${section.color}`}>
                                {section.icon}
                            </div>
                            <ArrowRight className="text-zinc-400 group-hover:text-white transition-colors" size={20} />
                        </div>
                        <h3 className="font-semibold text-zinc-200 mb-2">{section.title}</h3>
                        {section.content}
                    </Link>
                ))}
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Recent Prompts Widget */}
                <div className="md:col-span-2 bg-gradient-to-br from-black to-zinc-950 rounded-2xl p-8 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-zinc-200 opacity-20 rounded-full blur-3xl transform translate-x-12 -translate-y-12 pointer-events-none"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <Zap className="text-yellow-400" size={24} />
                            <h3 className="text-xl font-bold">Daily Inspiration</h3>
                        </div>

                        {promptHistory.length > 0 ? (
                            <div>
                                <p className="text-purple-200 text-sm mb-2 uppercase tracking-wider">Last Reflection</p>
                                <p className="text-lg font-medium italic mb-4">"{promptHistory[0].question}"</p>
                                <p className="text-zinc-400 bg-black/10 p-4 rounded-lg backdrop-blur-sm">
                                    {promptHistory[0].answer}
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-lg font-medium mb-4">"The unexamined life is not worth living."</p>
                                <Link
                                    to="/thinking"
                                    className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-zinc-800/50 transition-colors"
                                >
                                    Start Thinking
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Priority Tasks Widget */}
                <div className="bg-black rounded-xl shadow-sm border border-zinc-800 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-zinc-100 flex items-center gap-2">
                            <Activity size={20} className="text-zinc-100" />
                            Up Next
                        </h3>
                        <Link to="/todo" className="text-xs font-semibold text-white hover:text-purple-700">View All</Link>
                    </div>

                    <div className="space-y-3">
                        {todos.filter(t => !t.completed).length === 0 ? (
                            <p className="text-zinc-500 text-sm italic py-4 text-center">All caught up!</p>
                        ) : (
                            todos.filter(t => !t.completed).slice(0, 4).map(todo => (
                                <div key={todo.id} className="flex items-start gap-3 p-3 bg-zinc-900 rounded-lg">
                                    <div className="mt-1 w-2 h-2 rounded-full bg-zinc-200 shrink-0"></div>
                                    <p className="text-sm text-zinc-200 font-medium line-clamp-2">{todo.text}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

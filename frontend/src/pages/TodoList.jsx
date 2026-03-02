import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { Trash2, CheckCircle, Circle, Plus } from 'lucide-react';

const TodoList = () => {
    const { todos, addTodo, toggleTodo, deleteTodo } = useContext(DataContext);
    const [inputValue, setInputValue] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            addTodo(inputValue);
            setInputValue('');
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-zinc-100">To-Do List</h2>
                <p className="text-zinc-500 mt-1">Stay organized and get things done.</p>
            </div>

            <div className="bg-black rounded-xl shadow-sm border border-zinc-800 overflow-hidden">
                <form onSubmit={handleAdd} className="p-4 border-b border-zinc-800 bg-zinc-900 flex gap-2">
                    <input
                        type="text"
                        className="flex-1 p-3 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 bg-black"
                        placeholder="Add a new task..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="bg-zinc-100 hover:bg-zinc-300 text-white p-3 rounded-lg transition-colors"
                        disabled={!inputValue.trim()}
                    >
                        <Plus size={24} />
                    </button>
                </form>

                <div className="divide-y divide-slate-100">
                    {todos.length === 0 ? (
                        <div className="p-12 text-center text-zinc-500">
                            Your list is empty. Time to relax or get busy!
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <div
                                key={todo.id}
                                className={`group flex items-center justify-between p-4 hover:bg-zinc-900 transition-colors ${todo.completed ? 'bg-zinc-900' : 'bg-black'}`}
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <button
                                        onClick={() => toggleTodo(todo.id)}
                                        className={`transition-colors ${todo.completed ? 'text-green-500' : 'text-zinc-400 hover:text-zinc-100'}`}
                                    >
                                        {todo.completed ? <CheckCircle size={24} /> : <Circle size={24} />}
                                    </button>
                                    <span className={`text-lg ${todo.completed ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>
                                        {todo.text}
                                    </span>
                                </div>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="text-zinc-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-2"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="mt-4 flex justify-between text-sm text-zinc-500 px-2">
                <span>{todos.filter(t => !t.completed).length} items left</span>
                <span>{todos.filter(t => t.completed).length} completed</span>
            </div>
        </div>
    );
};

export default TodoList;

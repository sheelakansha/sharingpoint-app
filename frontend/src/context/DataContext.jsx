import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    // Mood State
    const [moods, setMoods] = useState(() => {
        const savedMoods = localStorage.getItem('moods');
        return savedMoods ? JSON.parse(savedMoods) : [];
    });

    useEffect(() => {
        localStorage.setItem('moods', JSON.stringify(moods));
    }, [moods]);

    const addMood = (mood) => {
        const newMood = {
            id: Date.now(),
            date: new Date().toISOString(),
            ...mood,
        };
        setMoods([newMood, ...moods]);
    };

    // Goals State
    const [goals, setGoals] = useState(() => {
        const savedGoals = localStorage.getItem('goals');
        return savedGoals ? JSON.parse(savedGoals) : [];
    });

    // Todos State
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    // Development State
    const [development, setDevelopment] = useState(() => {
        const savedDev = localStorage.getItem('development');
        return savedDev ? JSON.parse(savedDev) : { strengths: [], areas: [], reflections: [] };
    });

    // Think Prompts State
    const [promptHistory, setPromptHistory] = useState(() => {
        const savedPrompts = localStorage.getItem('promptHistory');
        return savedPrompts ? JSON.parse(savedPrompts) : [];
    });

    useEffect(() => {
        localStorage.setItem('goals', JSON.stringify(goals));
    }, [goals]);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        localStorage.setItem('development', JSON.stringify(development));
    }, [development]);

    useEffect(() => {
        localStorage.setItem('promptHistory', JSON.stringify(promptHistory));
    }, [promptHistory]);

    // Actions
    const addGoal = (goal) => {
        setGoals([...goals, { id: Date.now(), ...goal, progress: 0 }]);
    };

    const updateGoal = (id, updates) => {
        setGoals(goals.map(g => g.id === id ? { ...g, ...updates } : g));
    };

    const deleteGoal = (id) => {
        setGoals(goals.filter(g => g.id !== id));
    };

    const addTodo = (text) => {
        setTodos([...todos, { id: Date.now(), text, completed: false }]);
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(t => t.id !== id));
    };

    const addDevelopmentItem = (type, text) => {
        // type: 'strengths' or 'areas'
        setDevelopment(prev => ({
            ...prev,
            [type]: [...prev[type], { id: Date.now(), text }]
        }));
    };

    const removeDevelopmentItem = (type, id) => {
        setDevelopment(prev => ({
            ...prev,
            [type]: prev[type].filter(item => item.id !== id)
        }));
    };

    const addPromptEntry = (question, answer) => {
        setPromptHistory([{ id: Date.now(), date: new Date().toISOString(), question, answer }, ...promptHistory]);
    };

    const value = {
        moods,
        addMood,
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        development,
        addDevelopmentItem,
        removeDevelopmentItem,
        promptHistory,
        addPromptEntry
    };

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

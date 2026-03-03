import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import MoodTracker from './pages/MoodTracker';
import Goals from './pages/Goals';
import Development from './pages/Development';
import ThinkPrompts from './pages/ThinkPrompts';
import TodoList from './pages/TodoList';
import Notes from './pages/Notes';
import Auth from './pages/Auth';

function App() {
    return (
        <BrowserRouter>
            <DataProvider>
                <Routes>
                    <Route path="/login" element={<Auth />} />
                    <Route path="/signup" element={<Auth />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="mood" element={<MoodTracker />} />
                        <Route path="goals" element={<Goals />} />
                        <Route path="development" element={<Development />} />
                        <Route path="thinking" element={<ThinkPrompts />} />
                        <Route path="todo" element={<TodoList />} />
                        <Route path="notes" element={<Notes />} />
                    </Route>
                </Routes>
            </DataProvider>
        </BrowserRouter>
    );
}

export default App;

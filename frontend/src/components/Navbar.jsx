import React from 'react';
import { useLocation } from 'react-router-dom';
import { Bell, Search, Menu } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
    const location = useLocation();

    // Determine the title based on the current path
    const getPageTitle = () => {
        const path = location.pathname;
        if (path === '/') return 'Dashboard';
        if (path === '/mood') return 'Mood Tracker';
        if (path === '/goals') return 'Goals';
        if (path === '/development') return 'Development';
        if (path === '/thinking') return 'Think Prompts';
        if (path === '/todo') return 'To-Do';
        if (path === '/notes') return 'Notes';
        return 'Overview';
    };

    return (
        <header className="bg-black border-b border-zinc-800 sticky top-0 z-20 shadow-sm">
            <div className="flex items-center justify-between px-8 py-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuClick}
                        className="text-zinc-500 hover:text-white transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                    <h2 className="text-xl font-bold text-zinc-100">{getPageTitle()}</h2>
                </div>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center relative">
                        <Search className="absolute left-3 text-zinc-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-zinc-900 border border-zinc-800 text-sm rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent transition-all w-64"
                        />
                    </div>

                    <button className="relative text-zinc-500 hover:text-white transition-colors">
                        <Bell size={20} />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-zinc-200 rounded-full"></span>
                    </button>

                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-900 text-white flex items-center justify-center font-bold text-sm shadow-md cursor-pointer hover:shadow-lg transition-all">
                        U
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

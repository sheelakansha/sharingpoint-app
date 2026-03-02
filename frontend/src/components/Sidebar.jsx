import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Smile, Target, TrendingUp, Lightbulb, CheckSquare, FileText } from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/mood', label: 'Mood Tracker', icon: Smile },
        { path: '/goals', label: 'Goals', icon: Target },
        { path: '/development', label: 'Development', icon: TrendingUp },
        { path: '/thinking', label: 'Think Prompts', icon: Lightbulb },
        { path: '/todo', label: 'To-Do', icon: CheckSquare },
        { path: '/notes', label: 'Notes', icon: FileText },
    ];

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-20 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}
            <div className={`h-screen w-64 bg-black border-r border-zinc-800 flex flex-col fixed left-0 top-0 z-30 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-6 border-b border-zinc-800">
                    <h1 className="text-2xl font-bold text-white">Sharing Point</h1>
                </div>
                <nav className="flex-1 overflow-y-auto py-4">
                    <ul className="space-y-1 px-3">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive
                                            ? 'bg-zinc-800/50 text-purple-700'
                                            : 'text-zinc-400 hover:bg-zinc-900 hover:text-white'
                                        }`
                                    }
                                >
                                    <item.icon size={20} />
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-white font-bold">
                            U
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-200">User</p>
                            <p className="text-xs text-zinc-500">View Profile</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;

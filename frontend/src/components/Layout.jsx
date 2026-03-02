import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-black overflow-hidden relative">
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
            <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 w-full ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'}`}>
                <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                <main className="p-8 flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;

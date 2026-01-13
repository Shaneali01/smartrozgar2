import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Calendar, Home, DollarSign, Star, MessageSquare, Briefcase, 
  Settings, Menu, X, ClipboardList, Zap, LogOut, Search, Bell, Users
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
    const navItems = [
        { name: 'Dashboard', icon: Home, path: '/' },
        { name: 'My Tasks', icon: ClipboardList, path: '/tasks' },
        { name: 'Schedule', icon: Calendar, path: '/schedule' },
        { name: 'Job Requests', icon: Zap, path: '/requests' },
        { name: 'Messages', icon: MessageSquare, path: '/messages' },
        { name: 'Earnings', icon: DollarSign, path: '/earnings' },
        { name: 'Settings', icon: Settings, path: '/settings' },
    ];
    
    return (
        <div className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out bg-[#0a0a0a] text-white flex flex-col border-r border-white/5 h-full ${isOpen ? 'translate-x-0 w-64 shadow-2xl' : '-translate-x-full lg:translate-x-0 w-64'}`}>
            <div className="p-4 flex items-center justify-between border-b border-white/5 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#10b981] rounded-lg flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-white" />
                    </div>
                    <h1 className="text-lg font-bold text-white uppercase tracking-tighter">TaskerPro</h1>
                </div>
                <button onClick={onClose} className="p-2 lg:hidden text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                </button>
            </div>
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink 
                        key={item.name} 
                        to={item.path}
                        end={item.path === '/tasker'}
                        className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-[#10b981] text-white shadow-md' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>
            <div className="p-4 border-t border-white/5">
                <div className="flex items-center gap-3 mb-4 p-2 bg-white/5 rounded-lg border border-white/5">
                    <div className="w-10 h-10 bg-[#10b981] rounded-full flex items-center justify-center text-white font-semibold text-sm">DW</div>
                    <div>
                        <div className="text-sm font-semibold text-white">Danna Williams</div>
                        <div className="text-xs text-slate-500 font-mono">ID: #TK-2847</div>
                    </div>
                </div>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-400/10 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );
};

const TaskerLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="transition-all duration-300 ease-in-out lg:pl-64">
                <header className="bg-[#050505]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 bg-white/5 rounded-lg"><Menu className="w-5 h-5" /></button>
                        <h1 className="text-lg font-bold uppercase tracking-tight">Tasker Portal</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-[#10b981] outline-none w-64" placeholder="Search operations..." />
                        </div>
                        <Bell className="w-5 h-5 text-slate-400 cursor-pointer" />
                    </div>
                </header>

                <main className="p-6 md:p-8">
                    {/* The content from TaskerDashboard (or other routes) injected here */}
                    <Outlet /> 
                </main>
            </div>
            {sidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
        </div>
    );
};

export default TaskerLayout;
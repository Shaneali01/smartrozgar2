import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Menu, Search, Bell, Home, ClipboardList, Calendar, Zap, MessageSquare, DollarSign, Star, Users, Settings, LogOut, Briefcase, X } from 'lucide-react';

const TaskerLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', icon: Home, path: '/', count: 0 },
        { name: 'My Tasks', icon: ClipboardList, path: '/tasks', count: 0 },
        { name: 'Job Requests', icon: Zap, path: '/requests', count: 5 },
        { name: 'Messages', icon: MessageSquare, path: '/messages', count: 3 },
        { name: 'Earnings', icon: DollarSign, path: '/earnings', count: 0 },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* --- SIDEBAR --- */}
            <aside className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 bg-[#0a0a0a] border-r border-white/5 w-64 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
                <div className="p-4 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#10b981] rounded-lg flex items-center justify-center"><Briefcase size={16}/></div>
                        <h1 className="text-lg font-bold uppercase tracking-tighter">TaskerPro</h1>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400"><X /></button>
                </div>
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink 
                            key={item.name} 
                            to={item.path} 
                            className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-[#10b981] text-white shadow-lg shadow-emerald-900/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <item.icon size={18} />
                            <span>{item.name}</span>
                            {item.count > 0 && <span className="ml-auto px-2 py-0.5 text-[10px] bg-[#10b981] text-white rounded-full">{item.count}</span>}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="lg:pl-64 transition-all duration-300">
                <header className="bg-[#050505]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 px-6 py-4 flex justify-between items-center">
                    <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 bg-white/5 rounded-lg"><Menu size={20} /></button>
                    <h1 className="text-sm font-black uppercase tracking-widest hidden sm:block">Control Center</h1>
                    <div className="flex items-center gap-4">
                        <Bell className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white" />
                        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-xs text-black">DW</div>
                    </div>
                </header>

                <main className="p-6 md:p-8">
                    {/* THIS OUTLET LOADS YOUR DASHBOARD, TASKS, OR EARNINGS */}
                    <Outlet /> 
                </main>
            </div>
        </div>
    );
};

export default TaskerLayout;
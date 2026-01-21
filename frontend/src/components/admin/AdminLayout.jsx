import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  BarChart3, Users, DollarSign, ListChecks, Activity, Shield, 
  Settings, MessageSquare, LogOut, Menu, X, Bell, FileText, 
  Gavel
} from 'lucide-react';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', icon: BarChart3, path: '/', count: 0 },
        { name: 'Users Management', icon: Users, path: '/user-management', count: 0 },
        { name: 'Tasker Review', icon: ListChecks, path: '/tasker-review', count: 12 },
        { name: 'Dispute Center', icon: Gavel, path: '/dispute-center', count: 1 },
        { name: 'Financials', icon: DollarSign, path: '/financials', count: 0 },
        { name: 'Reports & Analytics', icon: FileText, path: '/reports', count: 0 },
        { name: 'System Logs', icon: Activity, path: '/system-logs', count: 0 },
        { name: 'Settings', icon: Settings, path: '/settings', count: 0 },
        { name: 'Support Tickets', icon: MessageSquare, path: '/support-tickets', count: 8 },
    ];

    const ACCENT_COLOR_CLASS = 'bg-[#10b981]';

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 bg-[#0a0a0a] border-r border-white/5 lg:translate-x-0 lg:w-64 ${sidebarOpen ? 'translate-x-0 w-64 shadow-2xl' : '-translate-x-full'}`}>
                <div className="p-4 flex items-center justify-between border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 ${ACCENT_COLOR_CLASS} rounded-lg flex items-center justify-center`}>
                            <Shield className="w-4 h-4 text-white" />
                        </div>
                        <h1 className="text-lg font-bold text-white">AdminPro</h1>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white"><X /></button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => (
                        <NavLink 
                            key={item.name} 
                            to={item.path}
                            end={item.path === '/admin'}
                            className={({ isActive }) => `flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${isActive ? `${ACCENT_COLOR_CLASS} text-white` : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                            {item.count > 0 && <span className="ml-auto px-2 py-0.5 text-xs font-bold rounded-full bg-white text-slate-800">{item.count}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button className="w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium">
                        <LogOut className="w-5 h-5" />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="lg:pl-64 transition-all duration-300">
                <header className="bg-[#0a0a0a] border-b border-white/5 sticky top-0 z-40 px-4 md:px-6 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-400 hover:bg-white/5 rounded-lg"><Menu /></button>
                        <h1 className="text-lg font-semibold text-white">Admin Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:bg-white/5 rounded-lg">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#0a0a0a]"></span>
                        </button>
                        <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-white/10">
                            <span className="text-sm font-semibold">System Admin</span>
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">SA</div>
                        </div>
                    </div>
                </header>

                <main className="p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>

            {/* Backdrop */}
            {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
        </div>
    );
};

export default AdminLayout;
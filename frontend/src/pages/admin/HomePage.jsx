import React, { useState } from 'react';
import { 
  BarChart3, Users, DollarSign, ListChecks, TrendingUp, TrendingDown, Settings, Menu, X, ChevronRight, CheckCircle, Clock, Archive, PieChart, ShoppingCart, Activity, Shield, MapPin, Search, Bell, LogOut, FileText,
  MessageSquare
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

// --- Data Definitions ---

const adminStats = [
    { label: 'Total Revenue', value: '$845k', change: '+18.5%', trend: 'up', icon: DollarSign, color: '#10b981', unit: 'USD' },
    { label: 'Active Users', value: '12,450', change: '+5.2%', trend: 'up', icon: Users, color: '#3b82f6', unit: 'Users' },
    { label: 'Tasks Completed', value: '98,700', change: '+0.1%', trend: 'stable', icon: ListChecks, color: '#f59e0b', unit: 'Tasks' },
    { label: 'New Taskers', value: '450', change: '-2.1%', trend: 'down', icon: Shield, color: '#ef4444', unit: 'Taskers' },
];

const revenueData = [
    { name: 'Jan', Revenue: 4000, Profit: 2400 },
    { name: 'Feb', Revenue: 3000, Profit: 1398 },
    { name: 'Mar', Revenue: 2000, Profit: 9800 },
    { name: 'Apr', Revenue: 2780, Profit: 3908 },
    { name: 'May', Revenue: 1890, Profit: 4800 },
    { name: 'Jun', Revenue: 2390, Profit: 3800 },
    { name: 'Jul', Revenue: 3490, Profit: 4300 },
];

const recentTransactions = [
    { id: 'T9001', type: 'Payout to Tasker', user: 'Danna Williams', amount: '-$240.50', status: 'Completed', color: 'text-red-500' },
    { id: 'T9002', type: 'Client Payment', user: 'Sarah Johnson', amount: '+$85.00', status: 'Pending', color: 'text-amber-500' },
    { id: 'T9003', type: 'Subscription Fee', user: 'Admin System', amount: '+$49.99', status: 'Completed', color: 'text-green-500' },
    { id: 'T9004', type: 'Payout to Tasker', user: 'Michael P.', amount: '-$120.00', status: 'Completed', color: 'text-red-500' },
    { id: 'T9005', type: 'Client Payment', user: 'Emily Davis', amount: '+$45.00', status: 'Completed', color: 'text-green-500' },
];

// --- Recharts Custom Tooltip Component ---
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-slate-200 shadow-xl rounded-lg text-xs">
          <p className="font-semibold text-slate-900 mb-1">{label}</p>
          {payload.map((p, index) => (
            <p key={index} style={{ color: p.color }} className="text-sm font-medium">
              {`${p.dataKey}: $${p.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

// --- Admin Sidebar Component (Distinct Navigation) ---
const AdminSidebar = ({ isOpen, onClose, currentActive = 'Dashboard' }) => {
    const navItems = [
        { name: 'Dashboard', icon: BarChart3, count: 0 },
        { name: 'Users Management', icon: Users, count: 0 },
        { name: 'Tasker Review', icon: ListChecks, count: 12 },
        { name: 'Financials', icon: DollarSign, count: 0 },
        { name: 'Reports & Analytics', icon: FileText, count: 0 },
        { name: 'System Logs', icon: Activity, count: 0 },
        { name: 'Settings', icon: Settings, count: 0 },
        { name: 'Support Tickets', icon: MessageSquare
        , count: 8 },
    ];
    
    const ACCENT_COLOR_CLASS = 'bg-[#10b981]'; // Teal/Emerald
    const SIDEBAR_WIDTH_CLASS = 'lg:w-64';

    return (
        <div 
            className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out bg-slate-800 text-white flex flex-col border-r border-slate-700 h-full ${
                isOpen ? 'translate-x-0 w-64 shadow-2xl' : '-translate-x-full ' + SIDEBAR_WIDTH_CLASS
            } lg:translate-x-0 lg:shadow-none ${SIDEBAR_WIDTH_CLASS}`}
        >
            {/* Sidebar Header/Logo */}
            <div className="p-4 flex items-center justify-between border-b border-slate-700 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 ${ACCENT_COLOR_CLASS} rounded-lg flex items-center justify-center`}>
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                    <h1 className="text-lg font-bold text-white">AdminPro</h1>
                </div>
                <button 
                    onClick={onClose} 
                    className="p-2 lg:hidden text-slate-400 hover:text-white"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Navigation Links - Scrollable area with hidden scrollbar */}
            <nav 
                className="flex-1 p-4 space-y-2 overflow-y-auto" 
                style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
            >
                {/* Scrollbar hiding styles */}
                <style jsx="true">{`
                    nav::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
                
                {navItems.map((item) => (
                    <a 
                        key={item.name}
                        href="#"
                        className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${
                            item.name === currentActive
                                ? `${ACCENT_COLOR_CLASS} text-white shadow-md` 
                                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                        }`}
                        onClick={onClose} 
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                        {item.count > 0 && (
                            <span className={`ml-auto px-2 py-0.5 text-xs font-bold rounded-full ${
                                item.name === currentActive 
                                    ? 'bg-white text-slate-800' 
                                    : `${ACCENT_COLOR_CLASS} text-white` 
                            }`}>
                                {item.count}
                            </span>
                        )}
                    </a>
                ))}
            </nav>

            {/* Admin Profile and Logout */}
            <div className="p-4 border-t border-slate-700 flex-shrink-0">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium text-red-400 hover:bg-slate-700 transition-colors">
                    <LogOut className="w-5 h-5" />
                    <span>Log Out Admin</span>
                </button>
            </div>
        </div>
    );
};

// --- Admin Dashboard Component ---
const HomePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const SIDEBAR_WIDTH_CLASS = 'lg:w-64';

    return (
        <div className="min-h-screen bg-slate-50"> 
            
            {/* Sidebar */}
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Content Area */}
            <div className={`transition-all duration-300 ease-in-out lg:pl-64`}>
                
                {/* Header */}
                <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
                    <div className="max-w-full mx-auto px-4 md:px-6 py-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button 
                                    onClick={() => setSidebarOpen(true)}
                                    className="p-2 lg:hidden text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>
                                <h1 className="text-lg font-semibold text-slate-900">System Administrator Dashboard</h1>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                    <Bell className="w-5 h-5 text-slate-600" />
                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                                </button>
                                
                                <div className="hidden lg:flex items-center gap-3 ml-2 pl-4 border-l border-slate-200 cursor-pointer">
                                    <div className="text-sm font-semibold text-slate-900">System Admin</div>
                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                        SA
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Body */}
                <main className="p-4 md:p-6 lg:p-8">
                    
                    {/* KPI Stats Grid (More detailed) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
                        {adminStats.map((stat, idx) => (
                            <div 
                                key={idx} 
                                className="bg-white rounded-xl p-4 md:p-6 border border-slate-200 transition-shadow shadow-sm hover:shadow-lg"
                                style={{borderBottom: `4px solid ${stat.color}`}}
                            >
                                <div className="flex items-start justify-between mb-3 md:mb-4">
                                    <div className="w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center border border-slate-200" style={{ backgroundColor: `${stat.color}15` }}>
                                        <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                                    </div>
                                    <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                                        stat.trend === 'up' ? 'text-emerald-600 bg-emerald-50' : stat.trend === 'down' ? 'text-red-600 bg-red-50' : 'text-slate-600 bg-slate-50'
                                    }`}>
                                        {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : stat.trend === 'down' ? <TrendingDown className="w-3 h-3" /> : null}
                                        <span>{stat.change}</span>
                                    </div>
                                </div>
                                <div className="text-xl md:text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                                <div className="text-xs md:text-sm text-slate-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* Main Content (Charts) */}
                        <div className="lg:col-span-8 space-y-6">
                            
                            {/* Monthly Revenue Chart */}
                            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-md">
                                <h2 className="text-base md:text-lg font-semibold text-slate-900 mb-6">Monthly Revenue & Profit Overview</h2>
                                <div className="h-80">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={revenueData} margin={{ top: 5, right: 30, left: -10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#64748b' }} />
                                            <YAxis tickFormatter={(value) => `$${value/1000}k`} tick={{ fontSize: 12, fill: '#64748b' }} />
                                            <Tooltip content={<CustomTooltip />} />
                                            <Line type="monotone" dataKey="Revenue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                            <Line type="monotone" dataKey="Profit" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Recent Transactions Table */}
                            <div className="bg-white rounded-xl border border-slate-200 shadow-md">
                                <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center">
                                    <h2 className="text-base md:text-lg font-semibold text-slate-900">Recent Transactions & Payouts</h2>
                                    <a href="#" className="text-blue-500 font-medium text-xs md:text-sm hover:text-blue-700 transition-colors flex items-center gap-1">
                                        View All
                                        <ChevronRight className="w-4 h-4" />
                                    </a>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-slate-200">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">ID</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type / Description</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Amount</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-slate-100">
                                            {recentTransactions.map((tx) => (
                                                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{tx.id}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{tx.type}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{tx.user}</td>
                                                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold text-right ${tx.color}`}>{tx.amount}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                            tx.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                                                        }`}>
                                                            {tx.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Content (User Management & Quick Stats) */}
                        <div className="lg:col-span-4 space-y-6">
                            
                            {/* User Registration Chart */}
                            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-md">
                                <h3 className="text-base font-semibold text-slate-900 mb-4">User Registration Trend</h3>
                                <p className="text-sm text-slate-500 mb-4">Last 7 days: **450** new users</p>
                                <div className="h-40">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={[{day: 'M', value: 50}, {day: 'T', value: 80}, {day: 'W', value: 65}, {day: 'T', value: 70}, {day: 'F', value: 90}, {day: 'S', value: 45}, {day: 'S', value: 50}]}>
                                            <Tooltip cursor={{ fill: 'transparent' }} />
                                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
                                            <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                                <button className="mt-4 w-full text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center justify-center">
                                    <Users className="w-4 h-4 mr-2" />
                                    Manage All Users
                                </button>
                            </div>

                            {/* Quick Admin Actions */}
                            <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-6 shadow-md">
                                <h3 className="text-xs md:text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide">Admin Actions</h3>
                                <div className="space-y-3">
                                    <button className="w-full bg-[#10b981] hover:bg-emerald-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-between text-sm shadow-md">
                                        <span>Approve Tasker Applications</span>
                                        <ListChecks className="w-4 h-4" />
                                    </button>
                                    <button className="w-full border border-blue-500 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-between text-sm">
                                        <span>Review New Reports (5)</span>
                                        <FileText className="w-4 h-4" />
                                    </button>
                                    <button className="w-full border border-slate-200 hover:border-slate-400 text-slate-700 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-between text-sm">
                                        <span>Check System Health</span>
                                        <Activity className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* System Status Card */}
                            <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl p-4 md:p-6 text-white shadow-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                                        <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-xs md:text-sm font-medium text-blue-100">Status</div>
                                        <div className="text-base md:text-lg font-bold">System Online & Stable</div>
                                    </div>
                                </div>
                                <p className="text-xs md:text-sm text-blue-100 mb-4">
                                    All services are operational. Last monitored: 1 minute ago.
                                </p>
                                <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-medium py-2 md:py-2.5 px-4 rounded-lg transition-colors text-xs md:text-sm border border-white border-opacity-20">
                                    Run Diagnostics
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            {/* Backdrop for mobile sidebar */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900 bg-opacity-50 z-40 lg:hidden" 
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}
        </div>
    );
};

export default HomePage;
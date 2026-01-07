import React, { useState } from 'react';
import { 
  Calendar, Clock, Users, MessageSquare, Home, DollarSign, Star, MapPin, CheckCircle, Bell, Search, ChevronRight, Briefcase, Award, Settings, Menu, X, ClipboardList, Zap, LogOut, TrendingUp, TrendingDown, Clock4, CreditCard, Heart
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const WEEKLY_GOAL = 3000;
const CURRENT_EARNINGS = 2840;
const PROGRESS_PERCENT = Math.round((CURRENT_EARNINGS / WEEKLY_GOAL) * 100);

const CustomTooltip = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1e293b] p-3 border border-slate-700 shadow-xl rounded-lg text-xs">
        <p className="font-semibold text-white mb-1">{label}</p>
        {payload.map((p, index) => (
          <p key={index} style={{ color: p.color }} className="text-sm font-medium">
            {`${p.dataKey === 'amount' ? 'Earning' : 'Hours'}: ${p.value} ${unit || ''}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const SIDEBAR_WIDTH_CLASS = 'lg:w-64';

const Sidebar = ({ isOpen, onClose, currentActive = 'Dashboard' }) => {
    const navItems = [
        { name: 'Dashboard', icon: Home, count: 0 },
        { name: 'My Tasks', icon: ClipboardList, count: 0 },
        { name: 'Schedule', icon: Calendar, count: 0 },
        { name: 'Job Requests', icon: Zap, count: 5 },
        { name: 'Messages', icon: MessageSquare, count: 3 },
        { name: 'Earnings', icon: DollarSign, count: 0 },
        { name: 'Ratings', icon: Star, count: 0 },
        { name: 'Profile Settings', icon: Users, count: 0 },
        { name: 'System Settings', icon: Settings, count: 0 },
    ];
    
    return (
        <div className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out bg-[#0a0a0a] text-white flex flex-col border-r border-white/5 h-full ${isOpen ? 'translate-x-0 w-64 shadow-2xl' : '-translate-x-full ' + SIDEBAR_WIDTH_CLASS} lg:translate-x-0 lg:shadow-none ${SIDEBAR_WIDTH_CLASS}`}>
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
                    <a key={item.name} href="#" className={`flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${item.name === currentActive ? 'bg-[#10b981] text-white shadow-md' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                        {item.count > 0 && <span className={`ml-auto px-2 py-0.5 text-xs font-bold rounded-full ${item.name === currentActive ? 'bg-white text-slate-800' : 'bg-[#10b981] text-white'}`}>{item.count}</span>}
                    </a>
                ))}
            </nav>
            <div className="p-4 border-t border-white/5 flex-shrink-0">
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

const HomePage = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const stats = [
        { label: 'Total Earnings', value: `$${CURRENT_EARNINGS}.00`, change: '+12.5%', trend: 'up', icon: DollarSign, color: '#10b981', borderColor: 'border-t-[#10b981]' },
        { label: 'Completed Tasks', value: '47', change: '+8 this week', trend: 'up', icon: CheckCircle, color: '#3b82f6', borderColor: 'border-t-[#3b82f6]' },
        { label: 'Average Rating', value: '4.92', change: 'from 156 reviews', trend: 'stable', icon: Star, color: '#f59e0b', borderColor: 'border-t-[#f59e0b]' },
        { label: 'Client Tip Ratio', value: '18%', change: 'High satisfaction', trend: 'up', icon: Heart, color: '#ef4444', borderColor: 'border-t-[#ef4444]' },
    ];

    const upcomingTasks = [
        { id: 1, title: 'Residential Deep Cleaning', client: 'Sarah Johnson', location: '123 Oak St, Downtown District', time: 'Today • 2:00 PM - 5:00 PM', payment: '$85.00', status: 'Confirmed', priority: 'high' },
        { id: 2, title: 'Garden Maintenance & Landscaping', client: 'Michael Peterson', location: '456 Pine Ave, Suburban Area', time: 'Tomorrow • 9:00 AM - 12:00 PM', payment: '$120.00', status: 'Pending', priority: 'medium' },
        { id: 3, title: 'Pet Care & Walking Service', client: 'Emily Davis', location: '789 Maple Dr, Eastside', time: 'Dec 15 • 4:00 PM - 6:00 PM', payment: '$45.00', status: 'Confirmed', priority: 'low' },
    ];

    const recentActivity = [
        { task: 'House Cleaning Service Completed', client: 'Robert Brown', amount: '+$95.00', time: '2 hours ago', icon: CheckCircle, color: '#10b981' },
        { task: 'New Task Request Received', client: 'Lisa Anderson', amount: '$75.00', time: '5 hours ago', icon: Bell, color: '#f59e0b' },
        { task: 'Payment Successfully Processed', client: 'John Smith', amount: '+$140.00', time: '1 day ago', icon: DollarSign, color: '#10b981' },
        { task: '5-Star Review Received', client: 'Maria Garcia', amount: '', time: '2 days ago', icon: Star, color: '#f59e0b' },
    ];

    const weeklyData = [
        { day: 'Mon', amount: 420, hours: 6.5 }, { day: 'Tue', amount: 350, hours: 5.5 }, { day: 'Wed', amount: 580, hours: 8 },
        { day: 'Thu', amount: 290, hours: 4.5 }, { day: 'Fri', amount: 510, hours: 7 }, { day: 'Sat', amount: 390, hours: 5.5 }, { day: 'Sun', amount: 300, hours: 4 },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="transition-all duration-300 ease-in-out lg:pl-64">
                <header className="bg-[#050505]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-40 px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 bg-white/5 rounded-lg"><Menu className="w-5 h-5" /></button>
                        <h1 className="text-lg font-bold uppercase tracking-tight">Dashboard Overview</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input className="bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-[#10b981] outline-none w-64" placeholder="Search tasks..." />
                        </div>
                        <Bell className="w-5 h-5 text-slate-400 cursor-pointer" />
                    </div>
                </header>

                <main className="p-6 md:p-8 space-y-8">
                    {/* ONLY Top Stats Cards have the colored edge borders */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <div key={idx} className={`bg-[#0a0a0a] rounded-xl p-6 border-t-4 ${stat.borderColor} border-x border-b border-white/5 shadow-lg`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-white/5 rounded-lg"><stat.icon className="w-5 h-5" style={{ color: stat.color }} /></div>
                                    <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-wider ${stat.trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' : 'text-slate-400 bg-white/5'}`}>
                                        {stat.trend === 'up' && <TrendingUp className="w-3 h-3" />} {stat.change.split(' ')[0]}
                                    </div>
                                </div>
                                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                                <div className="text-xs font-medium text-slate-500 uppercase tracking-widest">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-8">
                            {/* Rest of the UI uses regular subtle borders */}
                            <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-6 shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-sm font-bold uppercase tracking-widest">Weekly Goal Progress</h2>
                                    <span className="text-[#10b981] font-bold">{PROGRESS_PERCENT}%</span>
                                </div>
                                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#10b981]" style={{ width: `${PROGRESS_PERCENT}%` }}></div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-6">
                                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Earnings Breakdown</h2>
                                    <div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={weeklyData}><CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} /><Tooltip content={<CustomTooltip unit='$' />} /><Bar dataKey="amount" fill="#10b981" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></div>
                                </div>
                                <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-6">
                                    <h2 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">Active Hours</h2>
                                    <div className="h-64"><ResponsiveContainer width="100%" height="100%"><AreaChart data={weeklyData}><defs><linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} /><Tooltip content={<CustomTooltip unit='h' />} /><Area type="monotone" dataKey="hours" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" /></AreaChart></ResponsiveContainer></div>
                                </div>
                            </div>

                            <div className="bg-[#0a0a0a] rounded-xl border border-white/5 overflow-hidden">
                                <div className="p-6 border-b border-white/5 flex justify-between items-center"><h2 className="text-sm font-bold uppercase tracking-widest">Upcoming Operations</h2><a href="#" className="text-[#10b981] font-bold text-xs hover:underline flex items-center gap-1">CALENDAR <ChevronRight size={14} /></a></div>
                                <div className="divide-y divide-white/5">
                                    {upcomingTasks.map((task) => (
                                        <div key={task.id} className="p-6 hover:bg-white/5 transition-all cursor-pointer">
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex flex-col items-center justify-center border border-white/10"><Clock4 className="w-4 h-4 text-[#10b981] mb-1" /><span className='text-[10px] font-bold'>{task.time.split(' ')[2]}</span></div>
                                                    <div><h3 className="font-bold text-sm text-white">{task.title}</h3><p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1"><MapPin className="w-3 h-3" /> {task.location}</p></div>
                                                </div>
                                                <div className="flex flex-col items-end gap-2"><div className="text-lg font-bold text-[#10b981]">{task.payment}</div><span className={`text-[9px] font-black px-2 py-1 rounded border uppercase tracking-widest ${task.priority === 'high' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'}`}>{task.status}</span></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-6">
                                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Quick Actions</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {[ {icon: Calendar, label: 'Schedule', color: 'text-emerald-400'}, {icon: MessageSquare, label: 'Messages', color: 'text-blue-400'}, {icon: CreditCard, label: 'Payments', color: 'text-purple-400'}, {icon: Zap, label: 'Job Board', color: 'text-amber-400'} ].map((action, i) => (
                                        <button key={i} className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl transition-all group"><action.icon className={`w-5 h-5 mb-2 ${action.color}`} /><span className="text-[10px] font-bold uppercase text-slate-400 tracking-tighter">{action.label}</span></button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-6">
                                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-6">Recent Activity</h3>
                                <div className="space-y-6">
                                    {recentActivity.map((activity, idx) => (
                                        <div key={idx} className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center flex-shrink-0 border border-white/5"><activity.icon className="w-3.5 h-3.5" style={{ color: activity.color }} /></div>
                                            <div className="flex-1 min-w-0"><p className="text-xs font-bold text-white leading-tight">{activity.task}</p><p className="text-[10px] text-slate-500 mt-1 uppercase font-semibold">{activity.time}</p></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-[#10b981] to-[#047857] rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
                                <Award className="absolute -right-4 -bottom-4 w-24 h-24 opacity-20" />
                                <h3 className="text-lg font-bold mb-2">Top Tasker</h3>
                                <p className="text-xs opacity-90 mb-4 leading-relaxed">You're in the top 5% of earners this month. Keep up the high rating!</p>
                                <button className="w-full bg-black/20 hover:bg-black/40 text-white font-bold py-2 rounded-lg transition-all text-[10px] uppercase tracking-widest border border-white/20">View Achievements</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            {sidebarOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
        </div>
    );
};

export default HomePage;
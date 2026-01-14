import React from 'react';
import { 
  BarChart3, PieChart, LineChart as LineIcon, Download, 
  Calendar, Filter, TrendingUp, Users, ShoppingCart, 
  ArrowUpRight, ArrowDownRight, Printer
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area, PieChart as RePie, 
  Pie, Cell, BarChart, Bar 
} from 'recharts';

const growthData = [
  { name: 'Week 1', users: 400, tasks: 240, revenue: 2400 },
  { name: 'Week 2', users: 700, tasks: 480, revenue: 3600 },
  { name: 'Week 3', users: 600, tasks: 300, revenue: 2000 },
  { name: 'Week 4', users: 1000, tasks: 700, revenue: 5200 },
];

const categoryDistribution = [
  { name: 'Cleaning', value: 400, color: '#3b82f6' },
  { name: 'Handyman', value: 300, color: '#10b981' },
  { name: 'Delivery', value: 300, color: '#f59e0b' },
  { name: 'Moving', value: 200, color: '#ef4444' },
];

const AdminReports = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
                    <p className="text-sm text-slate-500 mt-1">Deep dive into platform performance and user behavior.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/10 transition-all">
                        <Calendar size={16} /> Last 30 Days
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20">
                        <Download size={16} /> Generate PDF
                    </button>
                </div>
            </div>

            {/* Top Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500"><Users size={20}/></div>
                        <span className="text-emerald-500 text-xs font-bold flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            +12.5% <ArrowUpRight size={12}/>
                        </span>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium">User Retention Rate</h3>
                    <p className="text-2xl font-bold text-white mt-1">68.2%</p>
                </div>
                <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><ShoppingCart size={20}/></div>
                        <span className="text-emerald-500 text-xs font-bold flex items-center bg-emerald-500/10 px-2 py-0.5 rounded-full">
                            +8.1% <ArrowUpRight size={12}/>
                        </span>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium">Average Order Value</h3>
                    <p className="text-2xl font-bold text-white mt-1">$142.00</p>
                </div>
                <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500"><TrendingUp size={20}/></div>
                        <span className="text-red-500 text-xs font-bold flex items-center bg-red-500/10 px-2 py-0.5 rounded-full">
                            -2.4% <ArrowDownRight size={12}/>
                        </span>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium">Conversion Rate</h3>
                    <p className="text-2xl font-bold text-white mt-1">4.32%</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Growth Chart */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-white">Platform Growth</h2>
                        <select className="bg-white/5 border border-white/10 text-xs text-slate-400 rounded-md px-2 py-1 outline-none">
                            <option>Revenue</option>
                            <option>Users</option>
                            <option>Tasks</option>
                        </select>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '8px'}} />
                                <Area type="monotone" dataKey="revenue" stroke="#6366f1" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Popular Categories Pie Chart */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
                    <h2 className="text-lg font-bold text-white mb-6">Task Categories Distribution</h2>
                    <div className="flex flex-col md:flex-row items-center justify-around h-72">
                        <div className="w-full h-full md:w-1/2">
                            <ResponsiveContainer width="100%" height="100%">
                                <RePie>
                                    <Pie
                                        data={categoryDistribution}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {categoryDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </RePie>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-full md:w-1/2 space-y-3">
                            {categoryDistribution.map((item) => (
                                <div key={item.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.color}} />
                                        <span className="text-sm text-slate-400">{item.name}</span>
                                    </div>
                                    <span className="text-sm font-bold text-white">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tasker Performance Table */}
                <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-white">Top Performing Taskers</h2>
                        <button className="text-indigo-400 text-xs font-bold uppercase tracking-widest hover:text-indigo-300">Detailed Leaderboard</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/[0.02] text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Tasker</th>
                                    <th className="px-6 py-4">Completed Tasks</th>
                                    <th className="px-6 py-4">Rating</th>
                                    <th className="px-6 py-4">Total Earned</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    { name: 'Alex Rivera', tasks: 145, rating: 4.9, earned: '$12,400', status: 'Online' },
                                    { name: 'Sarah Connor', tasks: 98, rating: 4.8, earned: '$8,200', status: 'Offline' },
                                    { name: 'John Doe', tasks: 76, rating: 4.7, earned: '$5,900', status: 'Online' },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-white/[0.01]">
                                        <td className="px-6 py-4 text-sm font-bold text-white">{row.name}</td>
                                        <td className="px-6 py-4 text-sm text-slate-400">{row.tasks}</td>
                                        <td className="px-6 py-4 text-sm text-amber-500 font-bold">★ {row.rating}</td>
                                        <td className="px-6 py-4 text-sm text-emerald-500 font-bold">{row.earned}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-2 h-2 rounded-full ${row.status === 'Online' ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                                                <span className="text-xs text-slate-400">{row.status}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminReports;
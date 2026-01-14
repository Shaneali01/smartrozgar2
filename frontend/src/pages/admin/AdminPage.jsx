import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Users, ListChecks, Shield, ChevronRight, FileText, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const adminStats = [
    { label: 'Total Revenue', value: '$845k', change: '+18.5%', trend: 'up', icon: DollarSign, color: '#10b981' },
    { label: 'Active Users', value: '12,450', change: '+5.2%', trend: 'up', icon: Users, color: '#3b82f6' },
    { label: 'Tasks Completed', value: '98,700', change: '+0.1%', trend: 'stable', icon: ListChecks, color: '#f59e0b' },
    { label: 'New Taskers', value: '450', change: '-2.1%', trend: 'down', icon: Shield, color: '#ef4444' },
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
    { id: 'T9001', type: 'Payout to Tasker', user: 'Danna Williams', amount: '-$240.50', status: 'Completed', color: 'text-red-400' },
    { id: 'T9002', type: 'Client Payment', user: 'Sarah Johnson', amount: '+$85.00', status: 'Pending', color: 'text-amber-400' },
    { id: 'T9003', type: 'Subscription Fee', user: 'Admin System', amount: '+$49.99', status: 'Completed', color: 'text-green-400' },
];

const AdminDashboard = () => {
    return (
        <div className="animate-in fade-in duration-500">
            {/* KPI Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {adminStats.map((stat, idx) => (
                    <div key={idx} className="bg-[#0a0a0a] rounded-xl p-6 border border-white/5 transition-all hover:border-white/10" style={{borderBottom: `4px solid ${stat.color}`}}>
                        <div className="flex items-start justify-between mb-4">
                            <div className="w-11 h-11 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15` }}>
                                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${stat.trend === 'up' ? 'text-emerald-500 bg-emerald-500/10' : 'text-red-500 bg-red-500/10'}`}>
                                {stat.trend === 'up' ? <TrendingUp size={14}/> : <TrendingDown size={14}/>}
                                <span>{stat.change}</span>
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                        <div className="text-sm text-slate-500">{stat.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-6">
                    {/* Main Chart */}
                    <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-6">
                        <h2 className="text-lg font-semibold text-white mb-6">Monthly Revenue & Profit Overview</h2>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={revenueData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                                    <XAxis dataKey="name" tick={{ fill: '#64748b' }} axisLine={false} />
                                    <YAxis tickFormatter={(val) => `$${val/1000}k`} tick={{ fill: '#64748b' }} axisLine={false} />
                                    <Tooltip contentStyle={{backgroundColor: '#0a0a0a', border: '1px solid #ffffff10'}} />
                                    <Line type="monotone" dataKey="Revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
                                    <Line type="monotone" dataKey="Profit" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-[#0a0a0a] rounded-xl border border-white/5 overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-white">Recent Transactions</h2>
                            <a href="#" className="text-blue-400 text-sm hover:underline flex items-center gap-1">View All <ChevronRight size={16}/></a>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left">
                                <thead className="bg-white/[0.02] text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">ID</th>
                                        <th className="px-6 py-4">Type</th>
                                        <th className="px-6 py-4">User</th>
                                        <th className="px-6 py-4 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {recentTransactions.map((tx) => (
                                        <tr key={tx.id} className="hover:bg-white/[0.01]">
                                            <td className="px-6 py-4 text-sm text-white">{tx.id}</td>
                                            <td className="px-6 py-4 text-sm text-slate-400">{tx.type}</td>
                                            <td className="px-6 py-4 text-sm text-slate-400">{tx.user}</td>
                                            <td className={`px-6 py-4 text-sm font-bold text-right ${tx.color}`}>{tx.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Side Cards */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-6">
                        <h3 className="text-base font-semibold text-white mb-4">Registration Trend</h3>
                        <div className="h-40">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[{day: 'M', v: 50}, {day: 'T', v: 80}, {day: 'W', v: 65}, {day: 'T', v: 70}, {day: 'F', v: 90}]}>
                                    <Bar dataKey="v" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] rounded-xl border border-white/5 p-6">
                        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full bg-[#10b981] text-white py-2.5 rounded-lg text-sm font-medium flex items-center justify-between px-4">
                                Approve Taskers <ListChecks size={18}/>
                            </button>
                            <button className="w-full bg-blue-500/10 text-blue-400 border border-blue-500/20 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between px-4">
                                View Reports <FileText size={18}/>
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-700 to-indigo-900 rounded-xl p-6 text-white shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className="w-8 h-8 text-white/50" />
                            <div>
                                <div className="text-xs text-blue-100 uppercase tracking-tighter">System Health</div>
                                <div className="text-lg font-bold">Stable & Online</div>
                            </div>
                        </div>
                        <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 py-2 rounded-lg text-xs transition-colors">Run Diagnostics</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
import React from 'react';
import { 
  DollarSign, ArrowUpRight, ArrowDownRight, CreditCard, 
  Download, Filter, Wallet, TrendingUp, History 
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const TaskerEarnings = () => {
    const data = [
        { name: 'Mon', amount: 420 }, { name: 'Tue', amount: 350 },
        { name: 'Wed', amount: 580 }, { name: 'Thu', amount: 290 },
        { name: 'Fri', amount: 510 }, { name: 'Sat', amount: 390 },
        { name: 'Sun', amount: 300 },
    ];

    const transactions = [
        { id: 1, task: 'Deep Cleaning - Sarah J.', date: 'Jan 14, 2026', amount: '+$85.00', status: 'Completed', type: 'Income' },
        { id: 2, task: 'Garden Maintenance - Michael P.', date: 'Jan 13, 2026', amount: '+$120.00', status: 'Completed', type: 'Income' },
        { id: 3, task: 'Platform Service Fee', date: 'Jan 13, 2026', amount: '-$12.00', status: 'Processed', type: 'Fee' },
        { id: 4, task: 'Tip: Residential Cleaning', date: 'Jan 12, 2026', amount: '+$25.00', status: 'Completed', type: 'Bonus' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* 1. TOP SECTION: FINANCIAL OVERVIEW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Payout Card */}
                <div className="lg:col-span-2 bg-gradient-to-br from-[#10b981] to-[#059669] rounded-3xl p-8 text-black relative overflow-hidden shadow-xl shadow-emerald-900/20">
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Available for Payout</p>
                            <h2 className="text-5xl font-black tracking-tighter">$1,420.50</h2>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <button className="flex-1 bg-black text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-900 transition-all">Withdraw Now</button>
                            <button className="flex-1 bg-white/20 border border-white/20 text-black py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white/30 transition-all">View Analytics</button>
                        </div>
                    </div>
                    <Wallet className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 rotate-12" />
                </div>

                {/* Secondary Stat Cards */}
                <div className="space-y-4">
                    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pending Clear</span>
                            <ClockIcon />
                        </div>
                        <div className="text-2xl font-bold text-white">$450.00</div>
                        <p className="text-[10px] text-slate-400 mt-1 uppercase">Available in 2 days</p>
                    </div>
                    <div className="bg-[#0a0a0a] border border-white/5 p-6 rounded-2xl">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Life-Time Earnings</span>
                            <TrendingUp className="text-[#10b981] w-4 h-4" />
                        </div>
                        <div className="text-2xl font-bold text-white">$24,850.00</div>
                        <p className="text-[10px] text-[#10b981] mt-1 font-bold uppercase tracking-tighter">+12% from last month</p>
                    </div>
                </div>
            </div>

            {/* 2. DETAILED CHART */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h3 className="text-lg font-bold text-white tracking-tight">Revenue Analytics</h3>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">Daily performance for the current week</p>
                    </div>
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                        <button className="px-4 py-2 bg-white/10 text-white rounded-lg text-[10px] font-black uppercase tracking-widest">Weekly</button>
                        <button className="px-4 py-2 text-slate-500 hover:text-white rounded-lg text-[10px] font-black uppercase tracking-widest">Monthly</button>
                    </div>
                </div>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                            <Tooltip 
                                contentStyle={{backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '12px'}}
                                itemStyle={{color: '#10b981'}}
                            />
                            <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorAmt)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* 3. TRANSACTION HISTORY */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-[#0d0d0d]">
                    <div className="flex items-center gap-3">
                        <History className="w-5 h-5 text-[#10b981]" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest">Recent Transactions</h3>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-all"><Filter size={16}/></button>
                        <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-all"><Download size={16}/></button>
                    </div>
                </div>
                <div className="divide-y divide-white/5">
                    {transactions.map((tx) => (
                        <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${tx.type === 'Fee' ? 'bg-red-500/5 border-red-500/10 text-red-500' : 'bg-emerald-500/5 border-emerald-500/10 text-[#10b981]'}`}>
                                    {tx.type === 'Fee' ? <ArrowDownRight size={20}/> : <ArrowUpRight size={20}/>}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">{tx.task}</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{tx.date}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm font-black ${tx.type === 'Fee' ? 'text-red-400' : 'text-white'}`}>{tx.amount}</p>
                                <p className="text-[10px] text-slate-600 font-black uppercase tracking-tighter">{tx.status}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const ClockIcon = () => <div className="w-4 h-4 rounded-full border-2 border-slate-700 flex items-center justify-center"><div className="w-1.5 h-1.5 bg-slate-700 rounded-full"></div></div>;

export default TaskerEarnings;
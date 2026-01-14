import React from 'react';
import { 
  DollarSign, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2, 
  XCircle, Filter, Search, Download, ExternalLink, Receipt
} from 'lucide-react';

const financialStats = [
    { label: 'Total Volume', value: '$1.2M', change: '+12%', trend: 'up', color: '#10b981' },
    { label: 'Pending Payouts', value: '$12,450', count: '14 requests', color: '#f59e0b' },
    { label: 'Pending Deposits', value: '$3,800', count: '8 screenshots', color: '#3b82f6' },
    { label: 'Platform Fees', value: '$84.2k', change: '+5.4%', trend: 'up', color: '#6366f1' },
];

const pendingRequests = [
    { id: 'PAY-8821', user: 'Danna Williams', type: 'Payout', method: 'Bank Transfer', amount: '$450.00', date: '2 hours ago', status: 'Pending' },
    { id: 'DEP-9902', user: 'Sarah Johnson', type: 'Deposit', method: 'Manual Screenshot', amount: '$1,200.00', date: '5 hours ago', status: 'Reviewing' },
    { id: 'PAY-8819', user: 'Michael Chen', type: 'Payout', method: 'PayPal', amount: '$120.00', date: '1 day ago', status: 'Pending' },
];

const AdminFinancials = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Financial Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Monitor revenue, verify deposits, and process tasker payouts.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/10">
                        <Download size={16} /> Export Reports
                    </button>
                </div>
            </div>

            {/* Financial KPI Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {financialStats.map((stat, idx) => (
                    <div key={idx} className="bg-[#0a0a0a] rounded-xl p-6 border border-white/5 relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-white mt-2">{stat.value}</h3>
                            <div className="flex items-center gap-2 mt-2">
                                {stat.change ? (
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                        {stat.change}
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-1.5 py-0.5 rounded">{stat.count}</span>
                                )}
                            </div>
                        </div>
                        <div className="absolute -right-2 -bottom-2 opacity-5 text-white">
                            <DollarSign size={80} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Pending Actions Table */}
                <div className="lg:col-span-12 bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-white/5 flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <h2 className="text-lg font-semibold text-white">Pending Approvals</h2>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                                <input type="text" placeholder="Search transactions..." className="bg-white/5 border border-white/10 rounded-lg py-1.5 pl-9 pr-4 text-xs text-white focus:outline-none" />
                            </div>
                            <button className="bg-white/5 border border-white/10 p-2 rounded-lg text-slate-400"><Filter size={16}/></button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/[0.02] text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-4">Transaction ID</th>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4">Method</th>
                                    <th className="px-6 py-4">Amount</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {pendingRequests.map((req) => (
                                    <tr key={req.id} className="hover:bg-white/[0.01] transition-colors group">
                                        <td className="px-6 py-4 text-sm font-mono text-indigo-400 font-bold">{req.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-white">{req.user}</div>
                                            <div className="text-[10px] text-slate-500">{req.date}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${req.type === 'Payout' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'}`}>
                                                {req.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-slate-400 font-medium">
                                            <div className="flex items-center gap-2">
                                                <Receipt size={14} className="text-slate-600"/>
                                                {req.method}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-black text-white">{req.amount}</td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center gap-1.5 text-amber-500 bg-amber-500/10 px-2 py-1 rounded-lg text-[10px] font-black uppercase">
                                                <Clock size={12} className="animate-pulse" />
                                                {req.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {req.method === 'Manual Screenshot' && (
                                                    <button className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500 hover:text-white transition-all" title="View Screenshot">
                                                        <ExternalLink size={14} />
                                                    </button>
                                                )}
                                                <button className="px-3 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg text-[10px] font-bold hover:bg-emerald-500 hover:text-white transition-all uppercase">
                                                    Approve
                                                </button>
                                                <button className="p-1.5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all">
                                                    <XCircle size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="p-4 bg-white/[0.01] border-t border-white/5 text-center">
                        <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-widest">Load More History</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminFinancials;
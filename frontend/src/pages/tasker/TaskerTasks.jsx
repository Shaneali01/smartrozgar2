import React, { useState } from 'react';
import { Clock, MapPin, User, ChevronRight, CheckCircle2, MoreVertical, ExternalLink } from 'lucide-react';

const TaskerTasks = () => {
    const [activeTab, setActiveTab] = useState('Active');

    const tasks = [
        { id: 1, title: 'Residential Deep Cleaning', client: 'Sarah Johnson', location: '123 Oak St, Downtown', time: 'Today • 2:00 PM', payment: '$85.00', status: 'Active', category: 'Cleaning' },
        { id: 2, title: 'Garden Maintenance', client: 'Michael Peterson', location: '456 Pine Ave, Suburban', time: 'Tomorrow • 9:00 AM', payment: '$120.00', status: 'Pending', category: 'Landscaping' },
        { id: 3, title: 'Pet Care & Walking', client: 'Emily Davis', location: '789 Maple Dr, Eastside', time: 'Dec 15 • 4:00 PM', payment: '$45.00', status: 'Completed', category: 'Pet Care' },
    ];

    const filteredTasks = tasks.filter(t => activeTab === 'All' || t.status === activeTab);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* PAGE HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Manage Tasks</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium uppercase tracking-wider">Your operational schedule and task history</p>
                </div>
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                    {['Active', 'Pending', 'Completed'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#10b981] text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* TASK LIST */}
            <div className="grid grid-cols-1 gap-4">
                {filteredTasks.map((task) => (
                    <div key={task.id} className="group bg-[#0a0a0a] border border-white/5 rounded-2xl p-5 hover:border-[#10b981]/30 transition-all duration-300">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            
                            <div className="flex items-start gap-5">
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-[#10b981]/50 transition-colors">
                                    <Clock className="w-6 h-6 text-[#10b981]" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-white">{task.title}</h3>
                                        <span className="px-2 py-0.5 bg-emerald-500/10 text-[#10b981] text-[10px] font-black uppercase rounded border border-emerald-500/20 tracking-tighter">
                                            {task.category}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-500 font-medium">
                                        <div className="flex items-center gap-1.5"><User size={14} className="text-slate-400" /> {task.client}</div>
                                        <div className="flex items-center gap-1.5"><MapPin size={14} className="text-slate-400" /> {task.location}</div>
                                        <div className="flex items-center gap-1.5"><Clock size={14} className="text-slate-400" /> {task.time}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between lg:justify-end gap-8 border-t lg:border-t-0 border-white/5 pt-4 lg:pt-0">
                                <div className="text-right">
                                    <div className="text-2xl font-black text-white">{task.payment}</div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Estimated Payout</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {task.status === 'Active' ? (
                                        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#10b981] hover:bg-[#0da472] text-black font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-900/10">
                                            <CheckCircle2 size={16} /> Complete Task
                                        </button>
                                    ) : (
                                        <button className="p-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/5 transition-all">
                                            <ExternalLink size={18} />
                                        </button>
                                    )}
                                    <button className="p-2.5 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl transition-all">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskerTasks;
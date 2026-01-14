import React from 'react';
import { 
  MessageSquare, Search, Filter, Clock, CheckCircle2, 
  AlertCircle, MoreVertical, Send, User, MessageCircle,
  Paperclip, ShieldAlert
} from 'lucide-react';

const ticketData = [
    { id: 'TKT-1024', user: 'Danna Williams', role: 'Tasker', subject: 'Payment not received', priority: 'High', status: 'Open', date: '10 mins ago' },
    { id: 'TKT-1025', user: 'Sarah Johnson', role: 'Client', subject: 'Incomplete task dispute', priority: 'Urgent', status: 'In Progress', date: '1 hour ago' },
    { id: 'TKT-1026', user: 'Michael Chen', role: 'Tasker', subject: 'Account verification help', priority: 'Medium', status: 'Open', date: '3 hours ago' },
    { id: 'TKT-1027', user: 'Robert Wilson', role: 'Client', subject: 'App crashing on checkout', priority: 'Low', status: 'Closed', date: '1 day ago' },
];

const AdminSupportTickets = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Support Center</h1>
                    <p className="text-sm text-slate-500 mt-1">Resolve user disputes, technical issues, and platform inquiries.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg flex items-center gap-2">
                        <ShieldAlert size={16} className="text-red-500" />
                        <span className="text-sm font-bold text-red-500">3 Urgent Disputes</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Ticket List */}
                <div className="lg:col-span-5 space-y-4">
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                            <input type="text" placeholder="Search tickets..." className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-indigo-500" />
                        </div>
                        <button className="bg-white/5 border border-white/10 p-2 rounded-lg text-slate-400 hover:text-white transition-colors">
                            <Filter size={18} />
                        </button>
                    </div>

                    <div className="space-y-3 overflow-y-auto max-h-[600px] pr-2 custom-scrollbar">
                        {ticketData.map((tkt) => (
                            <div key={tkt.id} className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 hover:border-indigo-500/30 transition-all cursor-pointer group">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-mono text-indigo-400 font-bold">{tkt.id}</span>
                                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${
                                        tkt.priority === 'Urgent' ? 'bg-red-500 text-white' : 
                                        tkt.priority === 'High' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'
                                    }`}>
                                        {tkt.priority}
                                    </span>
                                </div>
                                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{tkt.subject}</h3>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-white">
                                            {tkt.user.charAt(0)}
                                        </div>
                                        <span className="text-[11px] text-slate-400">{tkt.user}</span>
                                    </div>
                                    <span className="text-[10px] text-slate-600 font-medium">{tkt.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Conversation View */}
                <div className="lg:col-span-7 flex flex-col bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden min-h-[600px]">
                    {/* Chat Header */}
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">SJ</div>
                            <div>
                                <h3 className="text-sm font-bold text-white">Sarah Johnson</h3>
                                <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Client • Online</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="text-slate-500 hover:text-white p-2 transition-colors"><CheckCircle2 size={20}/></button>
                            <button className="text-slate-500 hover:text-red-500 p-2 transition-colors"><AlertCircle size={20}/></button>
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 p-6 space-y-6 overflow-y-auto max-h-[400px]">
                        <div className="flex gap-3 max-w-[80%]">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0 flex items-center justify-center"><User size={14}/></div>
                            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
                                <p className="text-sm text-slate-300">The tasker didn't complete the cleaning in the kitchen as promised. I'd like to dispute the final payment.</p>
                                <span className="text-[9px] text-slate-600 mt-2 block font-bold">1:15 PM</span>
                            </div>
                        </div>

                        <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
                            <div className="w-8 h-8 rounded-full bg-indigo-600 flex-shrink-0 flex items-center justify-center"><User size={14}/></div>
                            <div className="bg-indigo-600 p-4 rounded-2xl rounded-tr-none">
                                <p className="text-sm text-white">Hello Sarah, I'm reviewing the photos now. Please wait while I contact the tasker for their version of the event.</p>
                                <span className="text-[9px] text-indigo-200 mt-2 block font-bold">1:20 PM • Seen</span>
                            </div>
                        </div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 bg-white/[0.02] border-t border-white/5">
                        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-2 focus-within:border-indigo-500 transition-all">
                            <button className="p-2 text-slate-500 hover:text-white transition-colors"><Paperclip size={18}/></button>
                            <input 
                                type="text" 
                                placeholder="Type your response to the user..." 
                                className="flex-1 bg-transparent border-none text-sm text-white focus:outline-none" 
                            />
                            <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-lg transition-all shadow-lg shadow-indigo-600/20">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AdminSupportTickets;
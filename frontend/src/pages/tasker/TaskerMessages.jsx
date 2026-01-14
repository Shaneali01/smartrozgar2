import React, { useState } from 'react';
import { Search, Send, MoreVertical, Phone, Video, Paperclip, Smile, CheckCheck } from 'lucide-react';

const TaskerMessages = () => {
    const [selectedChat, setSelectedChat] = useState(1);

    const chats = [
        { id: 1, name: 'Sarah Johnson', lastMsg: 'I will be there at 2 PM', time: '14:20', unread: 2, online: true, avatar: 'SJ' },
        { id: 2, name: 'Michael Peterson', lastMsg: 'The garden looks great!', time: '12:05', unread: 0, online: false, avatar: 'MP' },
        { id: 3, name: 'Emily Davis', lastMsg: 'Can we reschedule?', time: 'Yesterday', unread: 0, online: true, avatar: 'ED' },
    ];

    return (
        <div className="h-[calc(100vh-160px)] flex flex-col lg:flex-row bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden shadow-2xl animate-in fade-in duration-500">
            
            {/* 1. SIDEBAR: CHAT LIST */}
            <div className="w-full lg:w-80 border-r border-white/5 flex flex-col bg-[#080808]">
                <div className="p-4 border-b border-white/5">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input 
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs focus:ring-1 focus:ring-[#10b981] outline-none text-white" 
                            placeholder="Search conversations..." 
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {chats.map((chat) => (
                        <div 
                            key={chat.id} 
                            onClick={() => setSelectedChat(chat.id)}
                            className={`p-4 flex items-center gap-4 cursor-pointer transition-all border-b border-white/[0.02] ${selectedChat === chat.id ? 'bg-[#10b981]/10 border-r-2 border-r-[#10b981]' : 'hover:bg-white/[0.03]'}`}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-xs font-bold border border-white/10 text-[#10b981]">
                                    {chat.avatar}
                                </div>
                                {chat.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10b981] rounded-full border-2 border-[#080808]"></div>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="text-sm font-bold text-white truncate">{chat.name}</h4>
                                    <span className="text-[10px] text-slate-500 font-medium">{chat.time}</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">{chat.lastMsg}</p>
                            </div>
                            {chat.unread > 0 && (
                                <div className="w-5 h-5 bg-[#10b981] rounded-full flex items-center justify-center text-[10px] font-black text-black">
                                    {chat.unread}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. MAIN CHAT WINDOW */}
            <div className="flex-1 flex flex-col bg-[#0a0a0a]">
                {/* Chat Header */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#0a0a0a]">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-[#10b981] rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-emerald-900/20">
                            SJ
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-white">Sarah Johnson</h3>
                            <p className="text-[10px] text-[#10b981] font-bold uppercase tracking-widest">Active Now</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"><Phone size={18}/></button>
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"><Video size={18}/></button>
                        <button className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"><MoreVertical size={18}/></button>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]">
                    {/* Incoming */}
                    <div className="flex flex-col items-start max-w-[80%]">
                        <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none text-sm text-slate-200">
                            Hi Danna! Are you still available for the deep cleaning today at 2 PM?
                        </div>
                        <span className="text-[10px] text-slate-600 mt-2 font-bold uppercase tracking-tighter">14:15 PM</span>
                    </div>

                    {/* Outgoing */}
                    <div className="flex flex-col items-end ml-auto max-w-[80%]">
                        <div className="bg-[#10b981] p-3 rounded-2xl rounded-tr-none text-sm text-black font-medium shadow-lg shadow-emerald-900/10">
                            Absolutely! I have all the equipment ready. I will be there on time.
                        </div>
                        <div className="flex items-center gap-1 mt-2">
                            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">14:20 PM</span>
                            <CheckCheck size={12} className="text-[#10b981]" />
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/5 bg-[#0a0a0a]">
                    <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-2 pr-3">
                        <button className="p-2 text-slate-500 hover:text-white transition-colors"><Paperclip size={20}/></button>
                        <input 
                            className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder:text-slate-600" 
                            placeholder="Type your message..." 
                        />
                        <button className="p-2 text-slate-500 hover:text-white transition-colors"><Smile size={20}/></button>
                        <button className="bg-[#10b981] p-2 rounded-xl text-black hover:bg-[#0da472] transition-all">
                            <Send size={18} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskerMessages;
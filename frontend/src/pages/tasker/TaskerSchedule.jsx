import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Plus, Calendar as CalendarIcon, MoreHorizontal } from 'lucide-react';

const TaskerSchedule = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Mock data for the timeline
    const dailySchedule = [
        { id: 1, time: '09:00 AM', duration: '2h', title: 'Garden Prep', client: 'Michael P.', color: 'border-l-blue-500', type: 'Work' },
        { id: 2, time: '12:00 PM', duration: '1h', title: 'Lunch Break', client: 'Personal', color: 'border-l-slate-700', type: 'Break' },
        { id: 3, time: '02:00 PM', duration: '3h', title: 'Deep Cleaning', client: 'Sarah J.', color: 'border-l-[#10b981]', type: 'Work' },
        { id: 4, time: '06:00 PM', duration: '1.5h', title: 'Pet Walking', client: 'Emily D.', color: 'border-l-amber-500', type: 'Work' },
    ];

    const weekDays = [
        { day: 'Mon', date: '12' },
        { day: 'Tue', date: '13' },
        { day: 'Wed', date: '14', active: true },
        { day: 'Thu', date: '15' },
        { day: 'Fri', date: '16' },
        { day: 'Sat', date: '17' },
        { day: 'Sun', date: '18' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* 1. CALENDAR HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Mission Schedule</h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium uppercase tracking-wider italic">January 2026</p>
                </div>
                
                <div className="flex items-center gap-4">
                    <div className="flex bg-white/5 rounded-xl border border-white/5 p-1">
                        <button className="p-2 text-slate-400 hover:text-white transition-colors"><ChevronLeft size={20}/></button>
                        <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-white">Today</button>
                        <button className="p-2 text-slate-400 hover:text-white transition-colors"><ChevronRight size={20}/></button>
                    </div>
                    <button className="flex items-center gap-2 bg-[#10b981] text-black px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#0da472] transition-all shadow-lg shadow-emerald-900/20">
                        <Plus size={16} /> Block Time
                    </button>
                </div>
            </div>

            {/* 2. WEEK STRIP */}
            <div className="grid grid-cols-7 gap-2 md:gap-4">
                {weekDays.map((d, i) => (
                    <button key={i} className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${d.active ? 'bg-[#10b981] border-[#10b981] shadow-lg shadow-emerald-900/20' : 'bg-[#0a0a0a] border-white/5 hover:border-white/20'}`}>
                        <span className={`text-[10px] font-black uppercase tracking-tighter mb-1 ${d.active ? 'text-emerald-900' : 'text-slate-500'}`}>{d.day}</span>
                        <span className={`text-xl font-black ${d.active ? 'text-white' : 'text-slate-300'}`}>{d.date}</span>
                    </button>
                ))}
            </div>

            {/* 3. TIMELINE VIEW */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-slate-300">
                        <Clock size={16} className="text-[#10b981]" /> Daily Timeline
                    </h2>
                    <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest border border-white/5">4 Slots Occupied</span>
                </div>
                
                <div className="p-6 space-y-8 relative">
                    {/* Vertical Line for Timeline */}
                    <div className="absolute left-[2.25rem] top-8 bottom-8 w-[1px] bg-white/5 hidden md:block"></div>

                    {dailySchedule.map((slot) => (
                        <div key={slot.id} className="relative flex flex-col md:flex-row md:items-center gap-6 group">
                            {/* Time Display */}
                            <div className="w-24 text-left md:text-right">
                                <span className="text-xs font-black text-white bg-white/5 px-2 py-1 rounded md:bg-transparent md:p-0 tracking-tighter">{slot.time}</span>
                            </div>

                            {/* Event Card */}
                            <div className={`flex-1 bg-[#050505] border border-white/5 border-l-4 ${slot.color} p-4 rounded-xl hover:bg-white/[0.02] transition-all cursor-pointer relative`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h4 className="font-bold text-white text-sm uppercase tracking-tight">{slot.title}</h4>
                                            <span className="text-[9px] bg-white/5 text-slate-400 px-1.5 py-0.5 rounded border border-white/10 uppercase font-black">{slot.duration}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-4 text-[11px] text-slate-500 font-medium uppercase tracking-tighter">
                                            <span className="flex items-center gap-1"><User size={12} /> {slot.client}</span>
                                            {slot.type === 'Work' && <span className="flex items-center gap-1"><MapPin size={12} /> Site Visit</span>}
                                        </div>
                                    </div>
                                    <button className="text-slate-600 hover:text-white transition-colors">
                                        <MoreHorizontal size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const User = ({ size }) => <span style={{ width: size, height: size }} className="inline-block bg-slate-500 rounded-full" />;

export default TaskerSchedule;
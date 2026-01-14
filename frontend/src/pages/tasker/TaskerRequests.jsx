import React from 'react';
import { Zap, Clock, MapPin, DollarSign, Star, Check, X, ShieldCheck, Info } from 'lucide-react';

const TaskerRequests = () => {
    const requests = [
        {
            id: 1,
            title: "Urgent: Electrical Circuit Repair",
            client: "James Wilson",
            location: "North Heights, 5 miles away",
            price: "$145.00",
            duration: "2-3 hours",
            rating: 4.9,
            expiresIn: "14 mins",
            tags: ["High Priority", "Emergency"],
            isNew: true
        },
        {
            id: 2,
            title: "Kitchen Faucet Replacement",
            client: "Sarah Miller",
            location: "Downtown Loft, 2 miles away",
            price: "$65.00",
            duration: "1 hour",
            rating: 4.7,
            expiresIn: "2 hours",
            tags: ["Plumbing"],
            isNew: false
        },
        {
            id: 3,
            title: "Smart Home Security Setup",
            client: "Tech Solutions Inc.",
            location: "Business District, 8 miles away",
            price: "$280.00",
            duration: "5 hours",
            rating: 5.0,
            expiresIn: "45 mins",
            tags: ["Tech", "Installation"],
            isNew: true
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* HEADER SECTION */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                        Job Requests <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#10b981] text-[10px] font-black text-black">3</span>
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium uppercase tracking-widest">Available opportunities in your service area</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                    <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                    <span className="text-[10px] font-bold text-[#10b981] uppercase tracking-tighter">Verified Lead Protection Active</span>
                </div>
            </div>

            {/* REQUESTS LIST */}
            <div className="grid grid-cols-1 gap-6">
                {requests.map((req) => (
                    <div key={req.id} className="relative group bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-[#10b981]/40 transition-all duration-300 shadow-xl">
                        {req.isNew && (
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#10b981]"></div>
                        )}
                        
                        <div className="p-6">
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Left Info */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h2 className="text-xl font-bold text-white tracking-tight">{req.title}</h2>
                                        {req.isNew && (
                                            <span className="px-2 py-0.5 bg-[#10b981] text-black text-[9px] font-black uppercase rounded tracking-tighter animate-pulse">New Lead</span>
                                        )}
                                        <span className="flex items-center gap-1 px-2 py-0.5 bg-white/5 text-slate-400 text-[9px] font-black uppercase rounded border border-white/5">
                                            <Clock size={10} /> Expires in {req.expiresIn}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-[#10b981] font-bold text-xs uppercase">
                                                {req.client.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Client</p>
                                                <p className="text-sm font-semibold text-white flex items-center gap-2">
                                                    {req.client} <span className="flex items-center gap-0.5 text-amber-400 text-[11px]"><Star size={12} fill="currentColor" /> {req.rating}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                                                <MapPin className="w-4 h-4 text-slate-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Location</p>
                                                <p className="text-sm font-semibold text-white">{req.location}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {req.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white/5 text-slate-400 text-[10px] font-bold rounded-full border border-white/5">#{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Actions */}
                                <div className="lg:w-72 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/5 pt-6 lg:pt-0 lg:pl-6">
                                    <div className="mb-6 lg:mb-0">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-black text-white">{req.price}</span>
                                            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Fixed Price</span>
                                        </div>
                                        <p className="text-xs text-[#10b981] font-bold mt-1 uppercase flex items-center gap-1"><Zap size={12} fill="currentColor" /> Instant Payout Available</p>
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#10b981] hover:bg-[#0da472] text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-emerald-900/10">
                                            <Check size={16} strokeWidth={3} /> Accept
                                        </button>
                                        <button className="px-4 flex items-center justify-center py-3 bg-white/5 hover:bg-red-500/10 text-slate-400 hover:text-red-400 font-black text-[10px] uppercase tracking-widest rounded-xl border border-white/5 transition-all">
                                            <X size={16} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-[#050505] px-6 py-3 border-t border-white/5 flex items-center justify-between">
                            <p className="text-[10px] font-bold text-slate-500 flex items-center gap-2 italic uppercase tracking-tighter">
                                <Info size={12} /> Estimate based on {req.duration} of work
                            </p>
                            <button className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-widest">View Details</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskerRequests;
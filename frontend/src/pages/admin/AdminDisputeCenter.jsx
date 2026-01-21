import React from 'react';
import { 
  Gavel, Scale, MessageSquare, Image, 
  AlertTriangle, Check, X, ArrowRight,
  ShieldAlert, Landmark, History, Eye
} from 'lucide-react';

const AdminDisputeCenter = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/20">
                        <Gavel size={24} className="text-red-500" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Dispute Arbitration</h1>
                        <p className="text-sm text-slate-500 mt-1">Review evidence and make final payment decisions for contested tasks.</p>
                    </div>
                </div>
                <div className="px-4 py-2 bg-[#0a0a0a] border border-white/5 rounded-xl flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase font-black">Escrow Held</p>
                        <p className="text-sm font-bold text-emerald-500">$4,250.00</p>
                    </div>
                    <Landmark className="text-slate-600" size={20} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* 1. Evidence Side-by-Side */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
                        <h2 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                            <Image size={16} className="text-indigo-400" /> Visual Evidence
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <span className="text-[10px] font-black text-blue-400 uppercase bg-blue-400/10 px-2 py-1 rounded">Client's Claim Proof</span>
                                <div className="aspect-video bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden group relative">
                                    <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400" alt="Evidence" className="opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                        <button className="bg-white text-black p-2 rounded-full"><Eye size={18}/></button>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 italic">"The paint is still wet and dripping on the carpet."</p>
                            </div>
                            
                            <div className="space-y-3">
                                <span className="text-[10px] font-black text-emerald-400 uppercase bg-emerald-400/10 px-2 py-1 rounded">Tasker's Completion Proof</span>
                                <div className="aspect-video bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden group relative">
                                    <img src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=400" alt="Evidence" className="opacity-50 group-hover:opacity-100 transition-opacity" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                        <button className="bg-white text-black p-2 rounded-full"><Eye size={18}/></button>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500 italic">"Job finished. Client was happy when I left."</p>
                            </div>
                        </div>
                    </div>

                    {/* Chat Logs Preview */}
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                <MessageSquare size={16} className="text-indigo-400" /> Critical Chat Snippets
                            </h2>
                            <button className="text-[10px] font-bold text-indigo-400 hover:underline">Full Transcript</button>
                        </div>
                        <div className="space-y-4">
                            <div className="p-3 bg-white/5 rounded-xl border-l-2 border-blue-500">
                                <p className="text-xs text-slate-300">"I'll be there at 2pm." <span className="text-slate-600 ml-2">- Tasker</span></p>
                            </div>
                            <div className="p-3 bg-white/5 rounded-xl border-l-2 border-emerald-500">
                                <p className="text-xs text-slate-300">"Please make sure to cover the furniture." <span className="text-slate-600 ml-2">- Client</span></p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Verdict Sidebar */}
                <div className="space-y-6">
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6 sticky top-24">
                        <h2 className="text-sm font-black text-white uppercase tracking-widest mb-6">Final Verdict</h2>
                        
                        <div className="space-y-6">
                            <div className="p-4 bg-indigo-600/10 border border-indigo-600/20 rounded-xl">
                                <p className="text-[10px] font-black text-indigo-400 uppercase mb-2">Funds in Hold</p>
                                <p className="text-2xl font-black text-white">$250.00</p>
                            </div>

                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-emerald-500/20 border border-white/10 rounded-xl transition-all group">
                                    <span className="text-xs font-bold text-white">Refund Client Fully</span>
                                    <Check className="text-emerald-500 group-hover:scale-125 transition-transform" size={18} />
                                </button>
                                <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-blue-500/20 border border-white/10 rounded-xl transition-all group">
                                    <span className="text-xs font-bold text-white">Pay Tasker Fully</span>
                                    <Landmark className="text-blue-500 group-hover:scale-125 transition-transform" size={18} />
                                </button>
                                <button className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-amber-500/20 border border-white/10 rounded-xl transition-all group">
                                    <span className="text-xs font-bold text-white">Split Payment (50/50)</span>
                                    <Scale className="text-amber-500 group-hover:scale-125 transition-transform" size={18} />
                                </button>
                            </div>

                            <div className="pt-6 border-t border-white/5">
                                <textarea 
                                    placeholder="Reason for verdict (Sent to both parties)..." 
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white h-24 focus:outline-none focus:border-red-500"
                                />
                                <button className="w-full mt-4 bg-red-600 hover:bg-red-500 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-red-600/20 transition-all">
                                    Confirm Decision
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDisputeCenter;
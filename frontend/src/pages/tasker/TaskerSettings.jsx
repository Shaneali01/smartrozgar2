import React from 'react';
import { 
  User, Bell, Shield, CreditCard, Camera, 
  ChevronRight, Lock, Globe, Smartphone, LogOut
} from 'lucide-react';

const TaskerSettings = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
            {/* PAGE HEADER */}
            <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">Account Settings</h1>
                <p className="text-slate-500 text-sm mt-1 font-medium uppercase tracking-widest">Manage your professional profile and security</p>
            </div>

            {/* 1. PROFILE IDENTITY CARD */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
                <div className="p-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative">
                        <div className="w-24 h-24 bg-gradient-to-tr from-[#10b981] to-emerald-900 rounded-3xl flex items-center justify-center text-3xl font-black text-white shadow-2xl">
                            DW
                        </div>
                        <button className="absolute -bottom-2 -right-2 p-2 bg-[#10b981] rounded-xl text-black border-4 border-[#0a0a0a] hover:scale-110 transition-transform shadow-lg">
                            <Camera size={16} strokeWidth={3} />
                        </button>
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold text-white mb-1 tracking-tight">Danna Williams</h3>
                        <p className="text-sm text-slate-500 font-medium mb-4 uppercase tracking-tighter">Professional Residential Specialist</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            <span className="px-3 py-1 bg-[#10b981]/10 text-[#10b981] text-[10px] font-black uppercase rounded-full border border-[#10b981]/20">Verified Pro</span>
                            <span className="px-3 py-1 bg-white/5 text-slate-400 text-[10px] font-black uppercase rounded-full border border-white/10">Top 5% Tasker</span>
                        </div>
                    </div>
                    <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest transition-all">
                        Edit Profile
                    </button>
                </div>
            </div>

            {/* 2. SETTINGS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* PAYOUT DETAILS (Crucial for your manual transfers) */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 space-y-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/10 rounded-lg"><CreditCard className="text-blue-400 w-5 h-5" /></div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">Payout Destination</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium uppercase tracking-tighter">
                        This information is used by the Admin to process your manual withdrawals.
                    </p>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group cursor-pointer hover:border-blue-500/30 transition-all">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[10px] font-black italic text-slate-300">BANK</div>
                            <div>
                                <p className="text-xs font-bold text-white tracking-tight">Chase Bank •••• 4291</p>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Primary Method</p>
                            </div>
                        </div>
                        <ChevronRight size={16} className="text-slate-600 group-hover:text-white transition-colors" />
                    </div>
                    <button className="w-full py-3 border border-dashed border-white/10 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:border-white/20 hover:text-white transition-all">
                        + Add Payout Account
                    </button>
                </div>

                {/* NOTIFICATIONS SETTINGS */}
                <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 space-y-4 shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-amber-500/10 rounded-lg"><Bell className="text-amber-400 w-5 h-5" /></div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-widest">Alert Preferences</h4>
                    </div>
                    <div className="space-y-3">
                        {[
                            { label: 'Job Request Alerts', enabled: true },
                            { label: 'Payment Clearances', enabled: true },
                            { label: 'Chat Notifications', enabled: false }
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-tighter">{item.label}</span>
                                <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${item.enabled ? 'bg-[#10b981]' : 'bg-slate-800'}`}>
                                    <div className={`absolute top-1 w-2 h-2 rounded-full bg-white shadow-sm transition-all ${item.enabled ? 'right-1' : 'left-1'}`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* 3. SECURITY & PRIVACY */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-500/10 rounded-lg"><Shield className="text-red-400 w-5 h-5" /></div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest">Security & Protocol</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                        <div className="flex items-center gap-3">
                            <Lock size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                            <span className="text-[11px] font-bold text-white uppercase tracking-widest">Update Password</span>
                        </div>
                        <ChevronRight size={14} className="text-slate-700 group-hover:text-white" />
                    </button>
                    <button className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                        <div className="flex items-center gap-3">
                            <Smartphone size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                            <span className="text-[11px] font-bold text-white uppercase tracking-widest">Two-Factor Auth</span>
                        </div>
                        <ChevronRight size={14} className="text-slate-700 group-hover:text-white" />
                    </button>
                    <button className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                        <div className="flex items-center gap-3">
                            <Globe size={16} className="text-slate-500 group-hover:text-white transition-colors" />
                            <span className="text-[11px] font-bold text-white uppercase tracking-widest">Privacy Settings</span>
                        </div>
                        <ChevronRight size={14} className="text-slate-700 group-hover:text-white" />
                    </button>
                    <button className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/10 rounded-2xl hover:bg-red-500/10 transition-all group">
                        <div className="flex items-center gap-3">
                            <LogOut size={16} className="text-red-400" />
                            <span className="text-[11px] font-bold text-red-400 uppercase tracking-widest">Terminate Session</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* SYSTEM FOOTER */}
            <div className="text-center pt-4">
                <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">Tasker Dashboard Version 2.4.0 • 2026 Operations</p>
            </div>
        </div>
    );
};

export default TaskerSettings;
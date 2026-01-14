import React from 'react';
import { 
  Settings, Save, Globe, Lock, Bell, Percent, 
  ShieldCheck, Database, CreditCard, Mail, 
  Smartphone, UserCog
} from 'lucide-react';

const AdminSettings = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-5xl">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">System Settings</h1>
                    <p className="text-sm text-slate-500 mt-1">Configure global platform variables, security protocols, and fee structures.</p>
                </div>
                <button className="bg-[#10b981] hover:bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest">
                    <Save size={18} /> Save All Changes
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Left Navigation Tabs (Visual only) */}
                <div className="md:col-span-1 space-y-2">
                    {[
                        { name: 'General Configuration', icon: Globe, active: true },
                        { name: 'Financials & Fees', icon: Percent, active: false },
                        { name: 'Security & Access', icon: Lock, active: false },
                        { name: 'Email & Notifications', icon: Mail, active: false },
                        { name: 'Database Maintenance', icon: Database, active: false },
                    ].map((tab, i) => (
                        <button key={i} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                            tab.active ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                        }`}>
                            <tab.icon size={18} />
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Right Settings Form */}
                <div className="md:col-span-2 space-y-6">
                    
                    {/* Platform Fee Section */}
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500"><CreditCard size={20}/></div>
                            <h2 className="text-lg font-bold text-white">Fee Structure</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tasker Commission (%)</label>
                                <input type="number" defaultValue="15" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 transition-all" />
                                <p className="text-[10px] text-slate-600 italic">Percentage taken from tasker earnings.</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Platform Service Fee ($)</label>
                                <input type="number" defaultValue="2.50" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 transition-all" />
                                <p className="text-[10px] text-slate-600 italic">Fixed fee added to every booking.</p>
                            </div>
                        </div>
                    </div>

                    {/* Security Section */}
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500"><ShieldCheck size={20}/></div>
                            <h2 className="text-lg font-bold text-white">Security & Verification</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
                                <div>
                                    <h4 className="text-sm font-bold text-white">Manual ID Verification</h4>
                                    <p className="text-xs text-slate-500">Require admin approval for all new Taskers.</p>
                                </div>
                                <div className="w-12 h-6 bg-emerald-600 rounded-full relative cursor-pointer">
                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/[0.02] rounded-xl border border-white/5">
                                <div>
                                    <h4 className="text-sm font-bold text-white">Two-Factor Authentication</h4>
                                    <p className="text-xs text-slate-500">Enforce 2FA for all Admin accounts.</p>
                                </div>
                                <div className="w-12 h-6 bg-white/10 rounded-full relative cursor-pointer">
                                    <div className="absolute left-1 top-1 w-4 h-4 bg-slate-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Notification Section */}
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><Bell size={20}/></div>
                            <h2 className="text-lg font-bold text-white">System Notifications</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Admin Alert Email</label>
                                <input type="email" defaultValue="admin@platform.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-indigo-500 transition-all" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminSettings;
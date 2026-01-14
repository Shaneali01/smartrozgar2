import React from 'react';
import { 
  CheckCircle, XCircle, Eye, FileText, UserCheck, 
  MapPin, Star, Clock, AlertCircle, ExternalLink, ShieldAlert
} from 'lucide-react';

const pendingTaskers = [
    { 
        id: 'APP-101', 
        name: 'Alex Rivera', 
        category: 'Electrical & Plumbing', 
        location: 'New York, NY', 
        appliedDate: 'Oct 24, 2025',
        docs: ['ID Card', 'Electrician License'],
        status: 'Reviewing'
    },
    { 
        id: 'APP-102', 
        name: 'Jordan Smith', 
        category: 'General Cleaning', 
        location: 'Austin, TX', 
        appliedDate: 'Oct 25, 2025',
        docs: ['Identity Proof'],
        status: 'New'
    },
    { 
        id: 'APP-103', 
        name: 'Sarah Connor', 
        category: 'Personal Assistant', 
        location: 'Los Angeles, CA', 
        appliedDate: 'Oct 25, 2025',
        docs: ['Resume', 'Background Check'],
        status: 'New'
    }
];

const AdminTaskerReview = () => {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Tasker Applications</h1>
                    <p className="text-sm text-slate-500 mt-1">Review and approve new service providers to maintain platform quality.</p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-lg flex items-center gap-2">
                        <AlertCircle size={16} className="text-amber-500" />
                        <span className="text-sm font-bold text-amber-500">12 Pending Reviews</span>
                    </div>
                </div>
            </div>

            {/* Application Cards Grid */}
            <div className="grid grid-cols-1 gap-4">
                {pendingTaskers.map((app) => (
                    <div key={app.id} className="bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all group">
                        <div className="flex flex-col lg:flex-row">
                            
                            {/* Left: Basic Info */}
                            <div className="p-6 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/5">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xl font-black">
                                        {app.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{app.name}</h3>
                                        <p className="text-xs text-slate-500 flex items-center gap-1">
                                            <MapPin size={12} /> {app.location}
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500 font-medium uppercase tracking-tighter">Applied on</span>
                                        <span className="text-slate-300 font-bold">{app.appliedDate}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500 font-medium uppercase tracking-tighter">Category</span>
                                        <span className="text-emerald-500 font-bold">{app.category}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Middle: Document Checklist */}
                            <div className="p-6 lg:w-1/3 border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.01]">
                                <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Verification Documents</h4>
                                <div className="space-y-3">
                                    {app.docs.map((doc, i) => (
                                        <div key={i} className="flex items-center justify-between bg-white/5 p-2 rounded-lg border border-white/5">
                                            <div className="flex items-center gap-2">
                                                <FileText size={14} className="text-slate-400" />
                                                <span className="text-xs text-white font-medium">{doc}</span>
                                            </div>
                                            <button className="text-indigo-400 hover:text-indigo-300 p-1">
                                                <ExternalLink size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right: Actions */}
                            <div className="p-6 lg:w-1/3 flex flex-col justify-center gap-3">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                                        app.status === 'New' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'
                                    }`}>
                                        {app.status} Status
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                                        <UserCheck size={16} /> Approve
                                    </button>
                                    <button className="flex items-center justify-center gap-2 bg-white/5 hover:bg-red-500/10 border border-white/10 text-slate-400 hover:text-red-500 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                                        <ShieldAlert size={16} /> Reject
                                    </button>
                                </div>
                                <button className="w-full text-center text-[10px] font-bold text-slate-500 hover:text-white uppercase mt-2">
                                    View Full Profile Details
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminTaskerReview;
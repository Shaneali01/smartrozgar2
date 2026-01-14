import React, { useState } from 'react';
import { 
  Search, Filter, MoreVertical, ShieldCheck, UserMinus, 
  Mail, Phone, MapPin, Eye, ArrowUpDown, ChevronRight 
} from 'lucide-react';

const usersData = [
    { id: 'USR001', name: 'Danna Williams', email: 'danna@example.com', role: 'Tasker', status: 'Verified', joined: '2023-10-12', tasks: 45 },
    { id: 'USR002', name: 'Sarah Johnson', email: 'sarah.j@gmail.com', role: 'Client', status: 'Active', joined: '2023-11-05', tasks: 12 },
    { id: 'USR003', name: 'Michael Chen', email: 'm.chen@outlook.com', role: 'Tasker', status: 'Pending', joined: '2024-01-02', tasks: 0 },
    { id: 'USR004', name: 'Emily Davis', email: 'emily.d@company.com', role: 'Client', status: 'Active', joined: '2023-09-20', tasks: 28 },
    { id: 'USR005', name: 'Robert Wilson', email: 'robert@wilson.com', role: 'Tasker', status: 'Suspended', joined: '2023-08-15', tasks: 156 },
];

const AdminUserManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Users Management</h1>
                    <p className="text-sm text-slate-500 mt-1">Manage and monitor all platform users and their activity.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#10b981] hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Add New User
                    </button>
                    <button className="bg-white/5 border border-white/10 text-white p-2 rounded-lg hover:bg-white/10 transition-colors">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Filters & Search Bar */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                        type="text" 
                        placeholder="Search by name, email, or ID..." 
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <select className="bg-white/5 border border-white/10 text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500">
                        <option>All Roles</option>
                        <option>Taskers</option>
                        <option>Clients</option>
                    </select>
                    <select className="bg-white/5 border border-white/10 text-slate-300 text-sm rounded-lg px-3 py-2 outline-none focus:border-indigo-500">
                        <option>All Status</option>
                        <option>Verified</option>
                        <option>Pending</option>
                        <option>Suspended</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/[0.02] border-b border-white/5 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">User Details</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Joined Date</th>
                                <th className="px-6 py-4">Tasks</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {usersData.map((user) => (
                                <tr key={user.id} className="hover:bg-white/[0.01] transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-white group-hover:text-indigo-400 transition-colors">{user.name}</div>
                                                <div className="text-xs text-slate-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-md ${
                                            user.role === 'Tasker' ? 'text-blue-400 bg-blue-400/10' : 'text-purple-400 bg-purple-400/10'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400">
                                        {user.joined}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400">
                                        {user.tasks} tasks
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                                            user.status === 'Verified' || user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 
                                            user.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                                        }`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${
                                                user.status === 'Verified' || user.status === 'Active' ? 'bg-emerald-500' : 
                                                user.status === 'Pending' ? 'bg-amber-500' : 'bg-red-500'
                                            }`} />
                                            {user.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-400 rounded-lg transition-all" title="View Details">
                                                <Eye size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 rounded-lg transition-all" title="Verify User">
                                                <ShieldCheck size={16} />
                                            </button>
                                            <button className="p-2 hover:bg-red-500/20 text-slate-400 hover:text-red-400 rounded-lg transition-all" title="Suspend User">
                                                <UserMinus size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination Placeholder */}
                <div className="p-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-slate-500">Showing 5 of 1,250 users</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs disabled:opacity-50">Prev</button>
                        <button className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminUserManagement;
import React, { useState } from 'react';
import { 
  Terminal, ShieldAlert, UserPlus, Database, 
  Search, Filter, Trash2, RefreshCcw, Download,
  CheckCircle2, AlertTriangle, Info, Bug
} from 'lucide-react';

const logData = [
    { id: 'L-901', timestamp: '2026-01-14 12:45:22', level: 'INFO', category: 'Auth', message: 'User USR-001 successfully logged in via OAuth.', ip: '192.168.1.1' },
    { id: 'L-902', timestamp: '2026-01-14 12:43:10', level: 'WARNING', category: 'Payment', message: 'Manual deposit screenshot upload failed for user USR-204 (Timeout).', ip: '45.22.10.8' },
    { id: 'L-903', timestamp: '2026-01-14 12:40:05', level: 'ERROR', category: 'Database', message: 'Failed to update Tasker status for ID #442. Connection refused.', ip: 'System' },
    { id: 'L-904', timestamp: '2026-01-14 12:38:55', level: 'CRITICAL', category: 'Security', message: 'Multiple failed login attempts detected from IP: 203.0.113.1', ip: '203.0.113.1' },
    { id: 'L-905', timestamp: '2026-01-14 12:35:12', level: 'INFO', category: 'System', message: 'Daily automated backup completed successfully.', ip: 'System' },
];

const AdminSystemLogs = () => {
    const [filterLevel, setFilterLevel] = useState('ALL');

    const getLevelStyle = (level) => {
        switch (level) {
            case 'CRITICAL': return 'bg-red-500/20 text-red-500 border-red-500/50';
            case 'ERROR': return 'bg-orange-500/20 text-orange-500 border-orange-500/30';
            case 'WARNING': return 'bg-amber-500/20 text-amber-500 border-amber-500/30';
            case 'INFO': return 'bg-blue-500/20 text-blue-500 border-blue-500/30';
            default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                        <Terminal size={24} className="text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">System Logs</h1>
                        <p className="text-sm text-slate-500 mt-1">Real-time audit trail of all platform activities and system events.</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white transition-all">
                        <RefreshCcw size={18} />
                    </button>
                    <button className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500 hover:text-white transition-all">
                        Clear Logs
                    </button>
                </div>
            </div>

            {/* Log Controls */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input 
                        type="text" 
                        placeholder="Filter by message, ID or IP..." 
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                </div>
                <select 
                    className="bg-white/5 border border-white/10 text-xs text-slate-300 rounded-lg px-3 py-2 outline-none"
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                >
                    <option value="ALL">All Levels</option>
                    <option value="CRITICAL">Critical Only</option>
                    <option value="ERROR">Errors</option>
                    <option value="WARNING">Warnings</option>
                    <option value="INFO">Information</option>
                </select>
                <button className="bg-white/5 border border-white/10 text-white text-xs font-bold rounded-lg px-4 py-2 hover:bg-white/10 transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                    <Download size={14} /> Export CSV
                </button>
            </div>

            {/* Log Table/Terminal View */}
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto font-mono text-[13px]">
                    <table className="w-full text-left">
                        <thead className="bg-white/[0.03] text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] border-b border-white/5">
                            <tr>
                                <th className="px-6 py-4">Timestamp</th>
                                <th className="px-6 py-4">Level</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Event Message</th>
                                <th className="px-6 py-4">Origin IP</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/[0.03]">
                            {logData.map((log) => (
                                <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                                        {log.timestamp}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded border text-[10px] font-black ${getLevelStyle(log.level)}`}>
                                            {log.level}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-indigo-400 font-bold">{log.category}</span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-300 max-w-md truncate">
                                        {log.message}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {log.ip}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Live Feed Indicator */}
                <div className="p-4 bg-white/[0.01] border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        Live Log Stream Active
                    </div>
                    <div className="flex gap-4">
                        <button className="text-[10px] font-black text-slate-500 hover:text-white uppercase">Older</button>
                        <button className="text-[10px] font-black text-slate-500 hover:text-white uppercase">Newer</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSystemLogs;
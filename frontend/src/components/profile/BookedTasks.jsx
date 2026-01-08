import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Calendar, MapPin, Clock, Search, 
  Filter, ChevronRight, CheckCircle, 
  AlertCircle, Timer, MoreHorizontal 
} from 'lucide-react';

const MyBookedTasks = () => {
  const { userData } = useOutletContext();

  // Color mapping for task status
  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return { edge: 'border-t-[#10b981]', text: 'text-[#10b981]', bg: 'bg-[#10b981]/10' };
      case 'in progress':
        return { edge: 'border-t-[#3b82f6]', text: 'text-[#3b82f6]', bg: 'bg-[#3b82f6]/10' };
      case 'pending':
        return { edge: 'border-t-[#f59e0b]', text: 'text-[#f59e0b]', bg: 'bg-[#f59e0b]/10' };
      default:
        return { edge: 'border-t-[#00D1D1]', text: 'text-[#00D1D1]', bg: 'bg-[#00D1D1]/10' };
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
      
      {/* 1. Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-12 bg-[#00D1D1] rounded-full"></div>
            <span className="text-[10px] font-black text-[#00D1D1] uppercase tracking-[0.4em]">Service Management</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">My Booked Tasks</h1>
        </div>
        
        {/* Search & Filter Bar */}
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="SEARCH TASKS..." 
              className="w-full bg-[#0A0A0A] border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-[10px] font-bold text-white focus:border-[#00D1D1] outline-none transition-all uppercase tracking-widest"
            />
          </div>
          <button className="p-3.5 bg-[#0A0A0A] border border-white/10 text-gray-500 rounded-2xl hover:text-[#00D1D1] transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* 2. Task Categories / Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <QuickStat label="Total" count={userData?.bookedTasks?.length || 0} color="text-white" />
        <QuickStat label="Active" count="2" color="text-[#3b82f6]" />
        <QuickStat label="Pending" count="1" color="text-[#f59e0b]" />
        <QuickStat label="Finished" count="12" color="text-[#10b981]" />
      </div>

      {/* 3. Tasks List */}
      <div className="space-y-6">
        {userData?.bookedTasks?.length > 0 ? (
          userData.bookedTasks.map((task, i) => {
            const styles = getStatusStyles(task.status || 'scheduled');
            return (
              <div 
                key={i} 
                className={`group bg-[#0A0A0A] border-x border-b border-white/10 ${styles.edge} border-t-4 rounded-[2rem] p-8 transition-all hover:bg-white/[0.02] relative overflow-hidden`}
              >
                <div className="flex flex-col lg:flex-row justify-between gap-8">
                  
                  {/* Left Side: Task Info */}
                  <div className="flex flex-col md:flex-row gap-8 flex-1">
                    <div className="h-20 w-20 bg-black border border-white/10 rounded-3xl flex items-center justify-center text-[#00D1D1] flex-shrink-0 group-hover:scale-105 transition-transform">
                      {task.status === 'Completed' ? <CheckCircle size={32} /> : <Timer size={32} />}
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${styles.bg} ${styles.text}`}>
                          {task.status || 'Scheduled'}
                        </span>
                        <span className="text-gray-600 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                          <AlertCircle size={12} /> Priority: Medium
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight">
                        {task.title || "General Maintenance"}
                      </h3>
                      <div className="flex flex-wrap gap-6">
                        <TaskMeta icon={<Calendar size={14}/>} label="Date" value="Oct 24, 2024" />
                        <TaskMeta icon={<Clock size={14}/>} label="Time Slot" value="14:00 - 16:00" />
                        <TaskMeta icon={<MapPin size={14}/>} label="Location" value="Main Blvd, Lahore" />
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Actions & Price */}
                  <div className="flex flex-row lg:flex-col justify-between items-center lg:items-end gap-4 border-t lg:border-t-0 border-white/5 pt-6 lg:pt-0">
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Total Fee</p>
                      <p className="text-2xl font-black text-white tracking-tighter">PKR {task.price || '2,500'}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00D1D1] hover:text-black transition-all">
                        View Details
                      </button>
                      <button className="p-3 bg-white/5 border border-white/10 text-gray-500 rounded-2xl hover:text-white transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-20 text-center bg-[#0A0A0A] rounded-[3rem] border-2 border-dashed border-white/5">
            <div className="mb-6 inline-flex p-6 bg-white/5 rounded-full text-gray-600">
              <Calendar size={40} />
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">No Tasks Found</h3>
            <p className="text-gray-500 text-xs font-medium max-w-xs mx-auto">You haven't booked any services yet. Explore our categories to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Internal Components
const QuickStat = ({ label, count, color }) => (
  <div className="bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 flex flex-col items-center">
    <span className={`text-2xl font-black ${color} mb-1`}>{count}</span>
    <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{label}</span>
  </div>
);

const TaskMeta = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    <div className="text-[#00D1D1] opacity-70">{icon}</div>
    <div>
      <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{label}</p>
      <p className="text-[11px] font-bold text-gray-300 uppercase">{value}</p>
    </div>
  </div>
);

export default MyBookedTasks;
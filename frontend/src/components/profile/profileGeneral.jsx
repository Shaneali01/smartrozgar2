import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  FileText, Camera, Printer, CheckCircle, 
  Wallet, Star, ShieldCheck, Calendar 
} from 'lucide-react';

const ProfileGeneral = () => {
  const { userData } = useOutletContext();
  
  const defaultAddress = userData?.address?.find(addr => addr.isDefault) || userData?.address?.[0];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
      
      {/* 1. Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-12 bg-[#00D1D1] rounded-full"></div>
            <span className="text-[10px] font-black text-[#00D1D1] uppercase tracking-[0.4em]">Account Holder</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Overview</h1>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-white/5 border border-white/10 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all">
            <Printer size={14}/> Print Profile
          </button>
          <button className="px-6 py-3 bg-[#00D1D1] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00f2f2] transition-all shadow-xl">
            Edit Details
          </button>
        </div>
      </div>

      {/* 2. Main Profile Grid */}
      <div className="grid grid-cols-12 gap-8 items-start">
        
        {/* Left: Identity Card */}
        <div className="col-span-12 lg:col-span-4 bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-10 flex flex-col items-center text-center relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#00D1D1]"></div>
          <div className="relative mb-8">
            <img 
              src={userData?.profilePicture || `https://ui-avatars.com/api/?name=${userData?.fullName}&background=00D1D1&color=fff`} 
              className="w-44 h-44 rounded-[3rem] object-cover border-4 border-white/5 shadow-2xl relative z-10" 
              alt="Profile" 
            />
            <button className="absolute -bottom-2 -right-2 bg-[#00D1D1] p-3.5 rounded-2xl shadow-xl text-black z-20 hover:scale-110 transition-transform">
              <Camera size={20} />
            </button>
          </div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">{userData?.fullName}</h2>
          <p className="text-[#00D1D1] font-black text-xs tracking-[0.1em] mt-3 uppercase">{userData?.phoneNumber}</p>
          <p className="text-gray-600 text-[11px] font-medium mt-1">{userData?.email}</p>
        </div>

        {/* Center/Right: Information Grid */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* General Information */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8">
              <h3 className="font-black text-white text-[10px] uppercase tracking-[0.2em] mb-10 text-gray-500">General Information</h3>
              <div className="grid grid-cols-2 gap-y-10">
                <InfoBox label="Age & Gender" value={`${userData?.age || '25'} Yrs, ${userData?.gender || 'Male'}`} />
                <InfoBox label="Member Since" value="Jan 2024" />
                <div className="col-span-2">
                  <InfoBox label="Registered Address" value={defaultAddress ? `${defaultAddress.houseNo}, ${defaultAddress.street}, ${defaultAddress.city}` : "Not provided"} />
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8">
              <h3 className="font-black text-white text-[10px] uppercase tracking-[0.2em] mb-10 text-gray-500">Service Stats</h3>
              <div className="space-y-6">
                <StatRow label="Bookings" value={userData?.bookedTasks?.length || 0} icon={<Calendar size={16} />} />
                <StatRow label="Wallet" value={`PKR ${userData?.walletBalance || 0}`} icon={<Wallet size={16} />} />
                <StatRow label="Trust Score" value="4.9 / 5.0" icon={<Star size={16} />} />
              </div>
            </div>
          </div>

          {/* Recent Activity List (No internal scrollbar) */}
          <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8">
            <h3 className="font-black text-white text-[10px] uppercase tracking-[0.2em] mb-8 text-gray-500">Current Task Status</h3>
            <div className="space-y-4">
              {userData?.bookedTasks?.length > 0 ? (
                userData.bookedTasks.map((task, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-[2rem] border border-white/5 group hover:border-[#00D1D1]/50 transition-all">
                    <div className="flex items-center gap-5">
                      <div className="h-12 w-12 bg-black rounded-2xl flex items-center justify-center text-[#00D1D1] border border-white/10">
                        <CheckCircle size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-1">Task Title</p>
                        <span className="font-black text-sm text-white uppercase tracking-tight">{task.title || "General Maintenance"}</span>
                      </div>
                    </div>
                    <span className="text-[9px] font-black text-[#00D1D1] border border-[#00D1D1]/30 px-4 py-2 rounded-full uppercase tracking-[0.2em]">Scheduled</span>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center bg-black/20 rounded-[2rem] border border-dashed border-white/10">
                  <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">No active bookings to show</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// UI Helper Components
const InfoBox = ({ label, value }) => (
  <div>
    <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] mb-2">{label}</p>
    <p className="font-bold text-white tracking-tight text-sm">{value || '---'}</p>
  </div>
);

const StatRow = ({ label, value, icon }) => (
  <div className="flex justify-between items-center bg-white/5 p-5 rounded-2xl border border-white/5">
    <div className="flex items-center gap-4 text-gray-500">
      <div className="text-[#00D1D1]">{icon}</div>
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <span className="font-black text-white text-sm">{value}</span>
  </div>
);

const FileItem = ({ name }) => (
  <div className="flex items-center justify-between bg-black border border-white/10 p-4 rounded-2xl">
    <div className="flex items-center gap-3">
      <FileText size={16} className="text-[#00D1D1]" />
      <span className="text-xs font-bold text-gray-400">{name}</span>
    </div>
    <div className="w-1.5 h-1.5 bg-[#00D1D1] rounded-full"></div>
  </div>
);

export default ProfileGeneral;
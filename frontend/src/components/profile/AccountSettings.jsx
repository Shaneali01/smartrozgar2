import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  User, Lock, Bell, Shield, 
  Mail, Phone, MapPin, Save, 
  Trash2, Globe, Eye, EyeOff
} from 'lucide-react';
import toast from 'react-hot-toast';

const AccountSettings = () => {
  const { userData } = useOutletContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // Simulate API Call
    toast.success("Profile Updated Successfully", {
      style: { borderTop: '4px solid #10b981' }
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
      
      {/* 1. Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-12 bg-[#00D1D1] rounded-full"></div>
            <span className="text-[10px] font-black text-[#00D1D1] uppercase tracking-[0.4em]">Control Panel</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">Settings</h1>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* Left: Navigation Categories (Visual Only) */}
        <div className="col-span-12 lg:col-span-3 space-y-2">
          <SettingsTab icon={<User size={18}/>} label="Personal Info" active />
          <SettingsTab icon={<Lock size={18}/>} label="Security" />
          <SettingsTab icon={<Bell size={18}/>} label="Notifications" />
          <SettingsTab icon={<Globe size={18}/>} label="Language" />
          <div className="pt-4 mt-4 border-t border-white/5">
            <button className="w-full flex items-center gap-4 py-4 px-6 rounded-2xl text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/5 transition-all">
               <Trash2 size={18}/> Delete Account
            </button>
          </div>
        </div>

        {/* Right: Forms Container */}
        <div className="col-span-12 lg:col-span-9 space-y-8">
          
          {/* General Information Form */}
          <section className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 md:p-10">
            <h3 className="font-black text-white text-[10px] uppercase tracking-[0.2em] mb-8 text-gray-500 flex items-center gap-2">
              <User size={14} className="text-[#00D1D1]"/> Profile Details
            </h3>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup label="Full Name" placeholder="Danna Williams" defaultValue={userData?.fullName} icon={<User size={16}/>} />
                <InputGroup label="Email Address" placeholder="danna@example.com" defaultValue={userData?.email} icon={<Mail size={16}/>} />
                <InputGroup label="Phone Number" placeholder="+92 300 1234567" defaultValue={userData?.phoneNumber} icon={<Phone size={16}/>} />
                <InputGroup label="Location" placeholder="Lahore, Pakistan" icon={<MapPin size={16}/>} />
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button type="submit" className="px-10 py-4 bg-[#00D1D1] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00f2f2] transition-all flex items-center gap-2">
                  <Save size={16}/> Save Changes
                </button>
              </div>
            </form>
          </section>

          {/* Security / Password Section */}
          <section className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-8 md:p-10">
            <h3 className="font-black text-white text-[10px] uppercase tracking-[0.2em] mb-8 text-gray-500 flex items-center gap-2">
              <Shield size={14} className="text-[#00D1D1]"/> Password & Security
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              <div className="relative">
                 <InputGroup 
                    label="New Password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    icon={<Lock size={16}/>} 
                 />
                 <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[45px] text-gray-500 hover:text-[#00D1D1]"
                 >
                   {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                 </button>
              </div>
              <button className="h-[58px] bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                Update Password
              </button>
            </div>
          </section>

          {/* Account Verification Status */}
          <div className="bg-gradient-to-r from-[#00D1D1]/10 to-transparent border border-[#00D1D1]/20 rounded-[2rem] p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-[#00D1D1] rounded-full flex items-center justify-center text-black">
                <Shield size={20} />
              </div>
              <div>
                <p className="text-[11px] font-black text-white uppercase tracking-widest">Two-Factor Authentication</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">Recommended for account safety</p>
              </div>
            </div>
            <div className="w-12 h-6 bg-[#00D1D1] rounded-full relative cursor-pointer shadow-[0_0_15px_#00D1D1]">
              <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Internal Helper: Navigation Tab
const SettingsTab = ({ icon, label, active }) => (
  <button className={`w-full flex items-center gap-4 py-4 px-6 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest
    ${active 
      ? 'bg-[#00D1D1] text-black shadow-[0_10px_20px_rgba(0,209,209,0.1)]' 
      : 'hover:bg-white/5 text-gray-500 hover:text-white'}`}>
    {icon} {label}
  </button>
);

// Internal Helper: Styled Input
const InputGroup = ({ label, icon, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-2">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00D1D1] transition-colors">
        {icon}
      </div>
      <input 
        {...props}
        className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white focus:border-[#00D1D1] outline-none transition-all placeholder:text-gray-800"
      />
    </div>
  </div>
);

export default AccountSettings;
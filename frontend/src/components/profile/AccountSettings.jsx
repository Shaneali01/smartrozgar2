import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  User, Lock, Bell, Shield, 
  Mail, Phone, MapPin, Save, 
  Trash2, Globe, Eye, EyeOff, 
  CheckCircle2, AlertTriangle, Languages, 
  Smartphone, Monitor, Mail as MailIcon
} from 'lucide-react';
import toast from 'react-hot-toast';

const AccountSettings = () => {
  const { userData } = useOutletContext();
  const [activeTab, setActiveTab] = useState('personal'); // 'personal', 'security', 'notifications', 'language'
  const [showPassword, setShowPassword] = useState(false);
  const [is2FA, setIs2FA] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Updated Successfully`, {
      style: { 
        background: '#0A0A0A',
        color: '#fff',
        border: '1px solid rgba(0, 209, 209, 0.2)',
        fontSize: '10px',
        fontWeight: '900',
        textTransform: 'uppercase'
      }
    });
  };

  // --- TAB CONTENT RENDERER ---
  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
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
                  <button type="submit" className="px-10 py-4 bg-[#00D1D1] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 shadow-[0_10px_30px_rgba(0,209,209,0.2)]">
                    <Save size={16}/> Save Changes
                  </button>
                </div>
              </form>
            </section>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
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
                <button onClick={handleSave} className="h-[58px] bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                  Update Password
                </button>
              </div>
            </section>

            <div className={`p-6 border rounded-[2rem] flex items-center justify-between transition-all ${is2FA ? 'bg-[#00D1D1]/10 border-[#00D1D1]/20' : 'bg-white/5 border-white/10 opacity-60'}`}>
              <div className="flex items-center gap-4">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${is2FA ? 'bg-[#00D1D1] text-black' : 'bg-white/10 text-gray-500'}`}>
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-[11px] font-black text-white uppercase tracking-widest">Two-Factor Authentication</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">Protect your account with OTP codes</p>
                </div>
              </div>
              <button 
                onClick={() => setIs2FA(!is2FA)}
                className={`w-12 h-6 rounded-full relative transition-all ${is2FA ? 'bg-[#00D1D1]' : 'bg-gray-800'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-black rounded-full transition-all ${is2FA ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <h3 className="text-white font-black text-[10px] uppercase tracking-widest mb-4 ml-2">Notification Preferences</h3>
            <NotificationToggle icon={<MailIcon size={18}/>} title="Email Notifications" desc="Get order updates via email" active={true} />
            <NotificationToggle icon={<Smartphone size={18}/>} title="Push Notifications" desc="Get real-time app alerts" active={true} />
            <NotificationToggle icon={<Monitor size={18}/>} title="Browser Alerts" desc="Desktop job notifications" active={false} />
          </div>
        );

      case 'language':
        return (
          <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] p-10 space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <Languages className="text-[#00D1D1]" />
                <h3 className="text-sm font-black uppercase tracking-widest">Language & Region</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['English (US)', 'Urdu (اردو)', 'Arabic', 'Punjabi'].map((lang) => (
                    <button key={lang} className={`p-6 rounded-2xl border text-left flex justify-between items-center transition-all ${lang === 'English (US)' ? 'bg-[#00D1D1] border-[#00D1D1] text-black' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20'}`}>
                        <span className="text-[10px] font-black uppercase tracking-widest">{lang}</span>
                        {lang === 'English (US)' && <CheckCircle2 size={16}/>}
                    </button>
                ))}
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
      
      {/* HEADER AREA */}
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
        
        {/* LEFT: NAVIGATION (SWITCHER) */}
        <div className="col-span-12 lg:col-span-3 space-y-2">
          <SettingsTab icon={<User size={18}/>} label="Personal Info" active={activeTab === 'personal'} onClick={() => setActiveTab('personal')} />
          <SettingsTab icon={<Lock size={18}/>} label="Security" active={activeTab === 'security'} onClick={() => setActiveTab('security')} />
          <SettingsTab icon={<Bell size={18}/>} label="Notifications" active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
          <SettingsTab icon={<Globe size={18}/>} label="Language" active={activeTab === 'language'} onClick={() => setActiveTab('language')} />
          
          <div className="pt-4 mt-4 border-t border-white/5">
            <button className="w-full flex items-center gap-4 py-4 px-6 rounded-2xl text-[11px] font-black uppercase tracking-widest text-red-500 hover:bg-red-500/5 transition-all">
                <Trash2 size={18}/> Delete Account
            </button>
          </div>
        </div>

        {/* RIGHT: DYNAMIC CONTENT AREA */}
        <div className="col-span-12 lg:col-span-9">
           {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const SettingsTab = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 py-4 px-6 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest
    ${active 
      ? 'bg-[#00D1D1] text-black shadow-[0_10px_20px_rgba(0,209,209,0.1)]' 
      : 'hover:bg-white/5 text-gray-500 hover:text-white'}`}
  >
    {icon} {label}
  </button>
);

const InputGroup = ({ label, icon, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-2">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00D1D1] transition-colors">
        {icon}
      </div>
      <input 
        {...props}
        className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-white focus:border-[#00D1D1] outline-none transition-all placeholder:text-gray-800 shadow-inner"
      />
    </div>
  </div>
);

const NotificationToggle = ({ icon, title, desc, active }) => (
  <div className={`p-6 bg-[#0A0A0A] border border-white/10 rounded-3xl flex items-center justify-between group hover:border-white/20 transition-all`}>
    <div className="flex items-center gap-4">
        <div className="p-3 bg-white/5 rounded-xl text-gray-500 group-hover:text-[#00D1D1] transition-colors">
            {icon}
        </div>
        <div>
            <p className="text-[10px] font-black uppercase text-white tracking-widest">{title}</p>
            <p className="text-[9px] text-gray-600 font-bold uppercase">{desc}</p>
        </div>
    </div>
    <div className={`w-10 h-5 rounded-full relative cursor-pointer ${active ? 'bg-[#00D1D1]' : 'bg-gray-800'}`}>
        <div className={`absolute top-1 w-3 h-3 bg-black rounded-full transition-all ${active ? 'right-1' : 'left-1'}`}></div>
    </div>
  </div>
);

export default AccountSettings;
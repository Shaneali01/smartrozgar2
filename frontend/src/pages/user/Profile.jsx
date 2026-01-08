import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  Layout, Calendar, Settings, Wallet, Bell, 
  ChevronDown, LogOut, ShieldCheck, Menu
} from 'lucide-react';
import { axiosInstance } from '../../lib/axios';
import toast from 'react-hot-toast';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userJson = localStorage.getItem('user');
        const userId = userJson ? JSON.parse(userJson).id : null;
        if (!userId) return;
        const response = await axiosInstance.get(`/user/${userId}`);
        console.log(response)
        setUserData(response.data);
        toast("Please complete your profile details!", {
    icon: 'ℹ️',
    duration: 4000,
    style: {
      borderTop: '4px solid #3b82f6', // Info Blue
    },
  });
      } catch (err) {
        console.error("Profile Load Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-[#00D1D1] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-[#00D1D1] font-black text-xs uppercase tracking-[0.3em]">Loading Account...</p>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#050505] font-['Inter'] text-white overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-[#0A0A0A] border-r border-white/5 flex flex-col shrink-0 relative z-20">
        {/* Brand Identity */}
        <div className="p-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#00D1D1] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(0,209,209,0.3)]">
              <ShieldCheck size={20} className="text-black" />
            </div>
            <span className="text-xl font-black tracking-tighter italic">SMART<span className="text-[#00D1D1]">ROZGAR</span></span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem to="/profile" icon={<Layout size={20}/>} label="My Overview" end />
          <NavItem to="/profile/tasks" icon={<Calendar size={20}/>} label="My Bookings" />
          <NavItem to="/profile/wallet" icon={<Wallet size={20}/>} label="My Wallet" />
          <NavItem to="/profile/settings" icon={<Settings size={20}/>} label="Account Settings" />
        </nav>

        {/* Sidebar Footer / Upgrade Card */}
        <div className="p-6">
          <div className="bg-gradient-to-br from-[#111] to-black border border-white/10 p-5 rounded-[2rem] mb-6 relative overflow-hidden group">
            <div className="absolute top-[-20%] right-[-20%] w-24 h-24 bg-[#00D1D1]/10 blur-2xl rounded-full"></div>
            <p className="font-black text-[10px] text-[#00D1D1] uppercase tracking-widest mb-1">Go Premium</p>
            <p className="text-gray-400 text-[11px] mb-4 leading-relaxed">Unlock verified badges and get faster support.</p>
            <button className="w-full py-2.5 bg-white/5 hover:bg-[#00D1D1] hover:text-black border border-white/10 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest">Upgrade Now</button>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 py-4 bg-red-500/5 hover:bg-red-500/10 text-red-500 rounded-2xl transition-all text-xs font-black uppercase tracking-widest border border-red-500/10"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Background Subtle Glow */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00D1D1]/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-10 bg-black/40 backdrop-blur-xl border-b border-white/5 shrink-0 z-10">
          <div className="flex items-center gap-4">
            <Menu className="text-gray-600 cursor-pointer hover:text-[#00D1D1]" size={20} />
            <h2 className="text-sm font-black uppercase tracking-[0.2em] text-gray-400">
              {location.pathname === '/profile' ? 'Profile Overview' : 'Section / ' + location.pathname.split('/').pop()}
            </h2>
          </div>

          <div className="flex items-center gap-8">
            {/* Notifications */}
            <div className="relative group cursor-pointer p-2">
              <Bell size={20} className="text-gray-400 group-hover:text-[#00D1D1] transition-colors" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#00D1D1] rounded-full shadow-[0_0_10px_#00D1D1]"></span>
            </div>

            {/* User Dropdown Profile */}
            <div className="flex items-center gap-4 pl-6 border-l border-white/10">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-white leading-none uppercase">{userData?.fullName?.split(' ')[0]}</p>
                <p className="text-[10px] text-[#00D1D1] font-bold uppercase tracking-tighter mt-1">{userData?.role}</p>
              </div>
              <div className="relative">
                <img 
                  src={userData?.profilePicture || `https://ui-avatars.com/api/?name=${userData?.fullName}&background=00D1D1&color=fff`} 
                  className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/5 group-hover:ring-[#00D1D1]/50 transition-all" 
                  alt="Profile" 
                />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Body */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar relative z-10">
           <div className="max-w-6xl mx-auto">
              <Outlet context={{ userData }} />
           </div>
        </div>
      </main>
    </div>
  );
};

// Simplified Navigation Item Component
const NavItem = ({ to, icon, label, end }) => (
  <NavLink to={to} end={end} className={({ isActive }) => 
    `flex items-center gap-4 py-4 px-6 rounded-2xl transition-all text-[11px] font-black uppercase tracking-widest
    ${isActive 
      ? 'bg-[#00D1D1] text-black shadow-[0_10px_20px_rgba(0,209,209,0.2)]' 
      : 'hover:bg-white/5 text-gray-500 hover:text-white'}`
  }>
    {icon} {label}
  </NavLink>
);

export default Profile;
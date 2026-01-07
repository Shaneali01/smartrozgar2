import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Briefcase, Home, Info, Phone, LogIn, User, LogOut, ChevronDown, Mail } from 'lucide-react';
import LogoImage from '/images/logo3.png';

const navItems = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Services', icon: Briefcase, href: '/services' },
  { name: 'About Us', icon: Info, href: '/about' },
  { name: 'Contact', icon: Phone, href: '/contact' },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userRole = localStorage.getItem('role');
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user?.name || 'User'; 
  const userEmail = user?.email || 'No email provided';

  const handleLogout = () => {
    localStorage.clear();
    setIsDropdownOpen(false);
    navigate('/login');
    window.location.reload();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    // GLASSMORPHISM: Added bg-black/80 and backdrop-blur-md
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 font-['Inter']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="hover:opacity-80 transition">
              <img src={LogoImage} alt="Logo" className="h-14 w-auto object-contain brightness-110" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => 
                  `text-sm font-medium transition-all duration-300 hover:text-[#00D1D1] ${
                    isActive ? 'text-[#00D1D1]' : 'text-gray-300'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            
            {!userRole ? (
              <Link to="/login">
                <button className="flex items-center space-x-2 px-6 py-2.5 bg-[#00D1D1] text-black text-sm font-bold rounded-full shadow-[0_0_15px_rgba(0,209,209,0.2)] hover:bg-[#00FFFF] transition transform hover:scale-105 active:scale-95">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </button>
              </Link>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition duration-150"
                >
                  <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-[#00D1D1] to-[#008080] flex items-center justify-center text-black font-bold text-base uppercase shadow-inner">
                    {userName.charAt(0)}
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-[#00D1D1]' : ''}`} />
                </button>

                {/* Dropdown Menu - Dark Mode Style */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-[#121212] border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-4 py-3 border-b border-white/5 mb-1">
                      <p className="text-sm font-bold text-white truncate">{userName}</p>
                      <p className="text-xs text-gray-500 truncate flex items-center gap-1 mt-1">
                        <Mail className="w-3 h-3" />
                        {userEmail}
                      </p>
                      <div className="mt-2 text-center">
                         <span className="text-[10px] uppercase tracking-widest bg-[#00D1D1]/10 text-[#00D1D1] px-2 py-0.5 rounded-full font-bold border border-[#00D1D1]/20">
                            {userRole}
                         </span>
                      </div>
                    </div>

                    <Link 
                      to="/profile" 
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-[#00D1D1] transition"
                    >
                      <User className="w-4 h-4" />
                      <span className="font-medium">My Profile</span>
                    </Link>

                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition border-t border-white/5 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-gray-300 hover:text-[#00D1D1]">
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Modern Dark Slide Down */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-black/95 ${isOpen ? 'max-h-[500px] border-b border-white/10' : 'max-h-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2">
          {userRole && (
             <div className="px-4 py-4 flex items-center space-x-4 bg-white/5 rounded-2xl mb-4 border border-white/5">
                <div className="h-12 w-12 rounded-full bg-[#00D1D1] flex items-center justify-center text-black font-bold text-xl">
                  {userName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{userName}</p>
                  <p className="text-xs text-gray-400">{userEmail}</p>
                </div>
             </div>
          )}

          {navItems.map((item) => (
            <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)} className="flex items-center space-x-4 text-gray-300 px-4 py-3 rounded-xl hover:bg-white/5 hover:text-[#00D1D1] transition">
              <item.icon className="w-5 h-5" />
              <span className="text-base font-medium">{item.name}</span>
            </Link>
          ))}
          
          <div className="pt-4 mt-2 border-t border-white/5">
            {!userRole ? (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full flex justify-center items-center space-x-2 px-4 py-4 bg-[#00D1D1] text-black rounded-2xl font-bold">
                  <LogIn className="w-5 h-5" />
                  <span>Login</span>
                </button>
              </Link>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link to="/profile" onClick={() => setIsOpen(false)} className="flex justify-center items-center space-x-2 py-3 border border-white/10 text-white rounded-xl font-medium">
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <button onClick={handleLogout} className="flex items-center justify-center space-x-2 py-3 bg-red-500/10 text-red-500 rounded-xl font-medium">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
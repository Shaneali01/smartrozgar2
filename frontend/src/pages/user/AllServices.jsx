import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

const allServices = [
  { id: 1, name: 'AC Services', icon: '/icons/ac-service.png', description: 'Repair, cleaning, and gas charging.' },
  { id: 2, name: 'Plumber', icon: '/icons/plumber_icon.png', description: 'Fixing leaks, pipes, and installations.' },
  { id: 3, name: 'Electrician', icon: '/icons/electrician.png', description: 'Wiring, short circuits, and electronics.' },
  { id: 4, name: 'Handyman', icon: '/icons/technician.png', description: 'General repairs and home maintenance.' },
  { id: 5, name: 'Carpenter', icon: '/icons/carpenter.png', description: 'Furniture repair and woodwork experts.' },
  { id: 6, name: 'Painter', icon: '/icons/painter.png', description: 'Interior and exterior wall painting.' },
  { id: 7, name: 'Home Appliances', icon: '/icons/repair.png', description: 'Fridge, washing machine, and oven repair.' },
  { id: 8, name: 'Geyser', icon: '/icons/geyser.png', description: 'Installation and repair of water heaters.' },
  { id: 9, name: 'Pest Control', icon: '/icons/pest-control.png', description: 'Termite and general pest elimination.' },
  { id: 10, name: 'Makeup Artist', icon: '/icons/makeupartist.png', description: 'Party and bridal makeup services.' },
];

const AllServices = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = allServices.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigate = (name) => {
    const slug = name.toLowerCase().replace(/\s+/g, '-');
    navigate(`/services/${slug}`);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Inter'] pb-20">
      
      {/* 1. Dynamic Hero Header */}
      <div className="relative py-24 px-6 lg:px-20 overflow-hidden border-b border-white/5 bg-[#080808]">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#00D1D1]/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8">
            <Sparkles size={14} className="text-[#00D1D1]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">SmartRozgar Directory</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter italic mb-8 leading-tight">
            How can we <span className="text-[#00D1D1]">help</span> you?
          </h1>

          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#00D1D1] transition-colors" size={24} />
            <input 
              type="text" 
              placeholder="Search for a service (e.g. Plumber, AC Repair...)"
              className="w-full bg-black border border-white/10 rounded-[2rem] py-6 pl-16 pr-8 text-lg font-bold outline-none focus:border-[#00D1D1] focus:ring-4 focus:ring-[#00D1D1]/5 transition-all shadow-2xl"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* 2. Service Grid Container */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-20 mt-20">
        <div className="flex items-center justify-between mb-12 border-l-4 border-[#00D1D1] pl-6">
            <div>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-gray-500">Exploration</h2>
                <h3 className="text-xl font-black uppercase italic text-white mt-1">All Categories</h3>
            </div>
            <p className="text-[10px] font-bold text-[#00D1D1] border border-[#00D1D1]/20 px-4 py-2 rounded-full uppercase tracking-widest bg-[#00D1D1]/5">
                {filteredServices.length} Results
            </p>
        </div>

        {/* UPDATED GRID: Added lg:grid-cols-4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <div 
              key={service.id} 
              onClick={() => handleNavigate(service.name)}
              className="group relative bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-8 cursor-pointer hover:bg-[#111] hover:border-[#00D1D1]/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center border border-white/5 group-hover:border-[#00D1D1]/20 transition-all">
                  <img 
                    src={service.icon} 
                    alt={service.name} 
                    className="w-8 h-8 object-contain brightness-0 invert opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" 
                  />
                </div>
                <div className="p-2 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight size={18} className="text-[#00D1D1]" />
                </div>
              </div>

              <h3 className="text-xl font-black uppercase tracking-tight text-white mb-2 leading-tight group-hover:text-[#00D1D1] transition-colors">{service.name}</h3>
              <p className="text-gray-500 text-[11px] font-medium leading-relaxed mb-6 line-clamp-2 group-hover:text-gray-400">
                {service.description}
              </p>

              <div className="flex items-center gap-3 pt-6 border-t border-white/5">
                <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-[#00D1D1]">
                    <Zap size={10} fill="#00D1D1" /> Instant
                </div>
                <div className="flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-gray-600">
                    <Shield size={10} /> Verified
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-40 bg-[#080808] border-2 border-dashed border-white/5 rounded-[3.5rem]">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-gray-700" size={32} />
            </div>
            <p className="text-gray-600 font-black uppercase tracking-widest text-sm">No matching services found.</p>
            <button onClick={() => setSearchTerm('')} className="mt-4 text-[#00D1D1] text-[10px] font-black uppercase underline decoration-2 underline-offset-4">Clear Search</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServices;
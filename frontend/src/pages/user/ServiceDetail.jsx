import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShieldCheck, MapPin, Search, SlidersHorizontal } from 'lucide-react';

// --- MOCK DATA FOR YOUR SERVICES ---
const MOCK_TASKERS = [
  { id: 1, fullName: "Ahmad Hassan", category: "plumber", rating: "4.9", jobs: "142", price: "1500", bio: "Expert in leak repairs and pipe installations with 5 years experience.", image: "https://i.pravatar.cc/150?u=ahmad" },
  { id: 2, fullName: "Zainab Ali", category: "cleaning", rating: "4.8", jobs: "95", price: "1200", bio: "Deep home cleaning and sanitization specialist. Punctual and reliable.", image: "https://i.pravatar.cc/150?u=zainab" },
  { id: 3, fullName: "Bilal Khan", category: "electrician", rating: "4.7", jobs: "210", price: "2000", bio: "Certified electrician for home wiring, UPS repair, and AC circuit fixing.", image: "https://i.pravatar.cc/150?u=bilal" },
  { id: 4, fullName: "Kamran Siddiqui", category: "plumber", rating: "4.6", jobs: "56", price: "1400", bio: "Specialized in geyser installation and bathroom fitting repairs.", image: "https://i.pravatar.cc/150?u=kamran" },
  { id: 5, fullName: "Sara Malik", category: "makeup-artist", rating: "5.0", jobs: "40", price: "5000", bio: "Professional bridal and party makeup artist. High-end products only.", image: "https://i.pravatar.cc/150?u=sara" },
  { id: 6, fullName: "Usman Sheikh", category: "ac-services", rating: "4.8", jobs: "312", price: "2500", bio: "Master technician for AC gas charging, cleaning, and master services.", image: "https://i.pravatar.cc/150?u=usman" },
];

const ServiceDetail = () => {
  const { serviceName } = useParams(); // e.g., 'plumber'
  const navigate = useNavigate();
  const [filteredTaskers, setFilteredTaskers] = useState([]);

  const formattedTitle = serviceName.replace(/-/g, ' ');

  useEffect(() => {
    // Filter the mock data based on the URL parameter
    const results = MOCK_TASKERS.filter(tasker => tasker.category === serviceName);
    setFilteredTaskers(results);
    
    // Scroll to top when page opens
    window.scrollTo(0, 0);
  }, [serviceName]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Inter']">
      
      {/* Header Section */}
      <div className="bg-[#0A0A0A] border-b border-white/5 pt-20 pb-16 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-500 hover:text-[#00D1D1] mb-10 transition-all text-[10px] font-black uppercase tracking-[0.2em]"
          >
            <ArrowLeft size={16} /> Back to Categories
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-12 bg-[#00D1D1]"></span>
                <p className="text-[#00D1D1] text-[10px] font-black uppercase tracking-[0.4em]">Available Now</p>
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
                {formattedTitle} <span className="text-[#00D1D1]">Experts</span>
              </h1>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10 w-full md:w-auto">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Find by name..." 
                  className="bg-transparent border-none py-3 pl-12 pr-4 text-xs font-bold focus:ring-0 outline-none min-w-[200px]"
                />
              </div>
              <button className="p-3 bg-black rounded-xl text-gray-400 hover:text-[#00D1D1]">
                <SlidersHorizontal size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tasker List Section */}
      <div className="max-w-7xl mx-auto py-16 px-6 lg:px-20">
        <div className="grid grid-cols-1 gap-8">
          {filteredTaskers.length > 0 ? (
            filteredTaskers.map((tasker) => (
              <TaskerCard key={tasker.id} tasker={tasker} />
            ))
          ) : (
            <div className="py-32 text-center bg-[#0A0A0A] rounded-[3rem] border-2 border-dashed border-white/5">
              <p className="text-gray-500 font-black uppercase tracking-widest text-sm mb-2">No {formattedTitle}s found in your area</p>
              <p className="text-gray-700 text-xs">Try selecting a different service category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// UI Component for the Individual Expert Card
const TaskerCard = ({ tasker }) => (
  <div className="group bg-[#0A0A0A] border border-white/10 p-8 rounded-[2.5rem] flex flex-col lg:flex-row items-center gap-10 hover:bg-[#0c0c0c] hover:border-[#00D1D1]/30 transition-all duration-500">
    
    {/* Profile Image with Status */}
    <div className="relative shrink-0">
      <img 
        src={tasker.image} 
        alt={tasker.fullName}
        className="w-36 h-36 rounded-[3rem] object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ring-4 ring-white/5 group-hover:ring-[#00D1D1]/20"
      />
      <div className="absolute -bottom-2 -right-2 bg-[#00D1D1] text-black p-2 rounded-2xl shadow-xl">
        <ShieldCheck size={20} />
      </div>
    </div>

    {/* Info Content */}
    <div className="flex-1 text-center lg:text-left space-y-4">
      <div className="space-y-1">
        <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-[#00D1D1] transition-colors">
          {tasker.fullName}
        </h3>
        <div className="flex items-center justify-center lg:justify-start gap-5">
          <div className="flex items-center gap-1.5 text-[#00D1D1]">
            <Star size={14} fill="#00D1D1" />
            <span className="text-xs font-black">{tasker.rating}</span>
          </div>
          <div className="h-1 w-1 bg-gray-800 rounded-full"></div>
          <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">
            {tasker.jobs} Jobs Done
          </span>
        </div>
      </div>

      <p className="text-gray-400 text-xs leading-relaxed max-w-xl">
        {tasker.bio}
      </p>

      <div className="flex flex-wrap justify-center lg:justify-start gap-2">
        {["Verified Expert", "Top Rated", "Background Checked"].map((tag) => (
          <span key={tag} className="text-[8px] font-black uppercase tracking-widest px-3 py-1.5 bg-white/5 text-gray-600 rounded-full border border-white/5">
            {tag}
          </span>
        ))}
      </div>
    </div>

    {/* Price & Booking Action */}
    <div className="w-full lg:w-56 text-center lg:text-right border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-10">
      <div className="mb-6">
        <p className="text-[9px] font-black text-gray-600 uppercase tracking-[0.2em] mb-1">Starting Service Fee</p>
        <p className="text-3xl font-black text-white tracking-tighter">PKR {tasker.price}</p>
      </div>
      <button className="w-full py-4 bg-[#00D1D1] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00f2f2] hover:scale-105 transition-all shadow-[0_10px_30px_rgba(0,209,209,0.15)]">
        View Profile
      </button>
    </div>
  </div>
);

export default ServiceDetail;
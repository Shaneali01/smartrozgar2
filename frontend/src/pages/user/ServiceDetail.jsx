import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Star, ShieldCheck, X, MessageSquare, 
  Calendar, CheckCircle2, MapPin, Award, Clock,
  Briefcase, Search, SlidersHorizontal, Image as ImageIcon,
  ChevronRight, ThumbsUp
} from 'lucide-react';

const MOCK_TASKERS = [
  { 
    id: 1, 
    fullName: "Ahmad Hassan", 
    category: "plumber", 
    rating: "4.9", 
    jobs: "142", 
    price: "1500", 
    location: "Johar Town, Lahore",
    experience: "5+ Years",
    bio: "Certified master plumber specializing in high-pressure systems and residential leak detection. I provide 24/7 emergency support across Lahore with a focus on sustainable plumbing solutions. My goal is to provide long-term fixes rather than temporary patches.",
    skills: ["Pipe Fitting", "Geyser Repair", "Drain Cleaning", "Sanitary Work", "Leak Detection"],
    image: "https://i.pravatar.cc/150?u=ahmad" 
  },
  { 
    id: 4, 
    fullName: "Kamran Siddiqui", 
    category: "plumber", 
    rating: "4.6", 
    jobs: "56", 
    price: "1400", 
    location: "DHA Phase 5, Lahore",
    experience: "3 Years",
    bio: "Professional plumber focused on bathroom renovations and kitchen fittings. Known for punctuality and providing clean, hassle-free work for modern households.",
    skills: ["Taps & Showers", "Kitchen Plumbing", "Water Tank Cleaning"],
    image: "https://i.pravatar.cc/150?u=kamran" 
  },
];

const ServiceDetail = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const [filteredTaskers, setFilteredTaskers] = useState([]);
  const [selectedTasker, setSelectedTasker] = useState(null);

  useEffect(() => {
    const results = MOCK_TASKERS.filter(t => t.category === serviceName);
    setFilteredTaskers(results);
    window.scrollTo(0, 0);
  }, [serviceName]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Inter']">
      
      {/* HEADER */}
      <div className="bg-[#0A0A0A] border-b border-white/5 pt-20 pb-16 px-6 lg:px-20 text-center">
        <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter">
            {serviceName} <span className="text-[#00D1D1]">Experts</span>
        </h1>
      </div>

      {/* CARDS LIST */}
      <div className="max-w-7xl mx-auto py-16 px-6 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredTaskers.map((tasker) => (
          <div key={tasker.id} onClick={() => setSelectedTasker(tasker)} className="group bg-[#0A0A0A] border border-white/10 p-8 rounded-[2.5rem] flex items-center gap-8 hover:border-[#00D1D1]/40 transition-all cursor-pointer">
            <img src={tasker.image} className="w-24 h-24 rounded-3xl object-cover grayscale group-hover:grayscale-0 transition-all" />
            <div className="flex-1">
                <h3 className="text-2xl font-black uppercase italic">{tasker.fullName}</h3>
                <p className="text-[#00D1D1] text-[10px] font-black uppercase tracking-widest mt-1">Starting @ PKR {tasker.price}</p>
            </div>
            <ChevronRight className="text-gray-700 group-hover:text-[#00D1D1] transition-colors" />
          </div>
        ))}
      </div>

      {/* --- WIDE DEEP INFO MODAL --- */}
      {selectedTasker && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-2xl bg-black/90 overflow-hidden">
          {/* Close Backdrop */}
          <div className="absolute inset-0" onClick={() => setSelectedTasker(null)}></div>

          {/* Modal Container: Set to max-w-6xl for significant width */}
          <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-6xl max-h-full rounded-[4rem] overflow-y-auto relative animate-in slide-in-from-bottom-8 duration-500 z-10 shadow-[0_0_100px_rgba(0,0,0,1)]">
            
            <button onClick={() => setSelectedTasker(null)} className="absolute top-8 right-8 z-50 p-4 bg-black rounded-full border border-white/10 text-gray-400 hover:text-white transition-all">
              <X size={24}/>
            </button>

            <div className="p-8 md:p-20">
              {/* Layout Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                
                {/* Left Column: Visuals & Stats (Col-4) */}
                <div className="lg:col-span-4 space-y-10">
                  <div className="relative inline-block mx-auto lg:mx-0">
                    <img src={selectedTasker.image} className="w-full aspect-square max-w-[320px] rounded-[4rem] object-cover border-4 border-[#00D1D1]/20 shadow-2xl" alt="Profile" />
                    <div className="absolute -bottom-4 -right-4 bg-[#00D1D1] text-black p-4 rounded-3xl shadow-2xl flex items-center gap-2">
                        <ShieldCheck size={28} />
                        <span className="text-[10px] font-black uppercase tracking-tighter">Verified Pro</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <StatBox icon={<Star size={14}/>} label="Rating" value={`${selectedTasker.rating}/5.0`} />
                    <StatBox icon={<Briefcase size={14}/>} label="Completed" value={`${selectedTasker.jobs} Jobs`} />
                    <StatBox icon={<Award size={14}/>} label="Exp" value={selectedTasker.experience} />
                    <StatBox icon={<Clock size={14}/>} label="Status" value="Online" />
                  </div>

                  <div className="p-8 bg-white/5 border border-white/5 rounded-[3rem] space-y-6">
                    <h4 className="text-[10px] font-black text-[#00D1D1] uppercase tracking-[0.4em]">Service Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                        {selectedTasker.skills.map(skill => (
                            <span key={skill} className="px-4 py-2 bg-black border border-white/5 rounded-xl text-[9px] font-black uppercase text-gray-400">{skill}</span>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Right Column: Bio & Booking (Col-8) */}
                <div className="lg:col-span-8 space-y-12">
                  <div className="space-y-4">
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">{selectedTasker.fullName}</h2>
                    <div className="flex items-center gap-3 text-gray-500">
                        <MapPin size={18} className="text-[#00D1D1]" />
                        <p className="text-xs font-black uppercase tracking-[0.2em]">{selectedTasker.location}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[11px] font-black text-[#00D1D1] uppercase tracking-[0.5em] flex items-center gap-3">
                        <div className="h-[1px] w-8 bg-[#00D1D1]"></div> About the Professional
                    </h4>
                    <p className="text-xl md:text-2xl text-gray-300 font-medium italic leading-relaxed">
                        "{selectedTasker.bio}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                     <div className="space-y-4">
                        <h4 className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2 italic">
                            <ImageIcon size={18} className="text-[#00D1D1]"/> Recent Work Portfolio
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                            {[1,2].map(i => (
                                <img key={i} src={`https://picsum.photos/seed/${selectedTasker.id + i}/400`} className="w-full h-40 object-cover rounded-[2rem] opacity-40 hover:opacity-100 transition-all" />
                            ))}
                        </div>
                     </div>
                     <div className="space-y-4">
                        <h4 className="text-[11px] font-black text-white uppercase tracking-widest flex items-center gap-2 italic">
                            <ThumbsUp size={18} className="text-[#00D1D1]"/> Happy Clients
                        </h4>
                        <div className="bg-white/5 p-6 rounded-[2rem] border border-white/5 space-y-2">
                            <p className="text-xs text-gray-400 italic">"Amazing service, solved my geyser leak in minutes!"</p>
                            <p className="text-[10px] font-black text-[#00D1D1] uppercase">- Sarah L.</p>
                        </div>
                     </div>
                  </div>

                  {/* ACTION CARD (Expanded Width) */}
                  <div className="bg-gradient-to-br from-[#00D1D1]/10 to-transparent border-2 border-[#00D1D1]/20 p-10 md:p-14 rounded-[4rem] flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="text-center md:text-left">
                        <p className="text-[11px] font-black text-gray-500 uppercase tracking-[0.4em] mb-2">Service Pricing Starting At</p>
                        <h5 className="text-5xl md:text-6xl font-black text-white italic tracking-tighter leading-none">PKR {selectedTasker.price}</h5>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                     <button 
  onClick={() => navigate('/chat', { state: { tasker: selectedTasker } })}
  className="px-10 py-6 bg-white/5 text-gray-400 font-black uppercase text-[10px] rounded-3xl hover:bg-white/10 border border-white/10 flex items-center justify-center gap-3"
>
  <MessageSquare size={20}/> Chat
</button>
                        <button 
                            onClick={() => navigate(`/book/${selectedTasker.id}`, { state: { tasker: selectedTasker } })}
                            className="px-12 py-6 bg-[#00D1D1] text-black font-black uppercase text-[10px] rounded-3xl hover:scale-105 transition-all shadow-[0_20px_50px_rgba(0,209,209,0.4)] flex items-center justify-center gap-3"
                        >
                            <Calendar size={20}/> Confirm Hire
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatBox = ({ icon, label, value }) => (
  <div className="bg-white/5 border border-white/5 p-6 rounded-3xl text-center lg:text-left">
    <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1 flex items-center justify-center lg:justify-start gap-2">
      {icon} {label}
    </p>
    <p className="text-lg font-black text-white uppercase">{value}</p>
  </div>
);

export default ServiceDetail;
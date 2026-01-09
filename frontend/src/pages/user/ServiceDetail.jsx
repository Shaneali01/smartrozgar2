import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Star, ShieldCheck, X, MessageSquare, 
  Calendar, CheckCircle2, MapPin, Award, Clock,
  Briefcase, Search, SlidersHorizontal, Image as ImageIcon,
  ChevronRight, ThumbsUp, Zap, Target
} from 'lucide-react';

// 1. UPDATED DATA STRUCTURE WITH TIERED PRICING
const MOCK_TASKERS = [
  { 
    id: 1, 
    fullName: "Ahmad Hassan", 
    category: "plumber", 
    rating: "4.9", 
    jobs: "142", 
    location: "Johar Town, Lahore",
    experience: "5+ Years",
    bio: "Certified master plumber specializing in high-pressure systems and residential leak detection.",
    skills: ["Pipe Fitting", "Geyser Repair", "Drain Cleaning"],
    image: "https://i.pravatar.cc/150?u=ahmad",
    // TIERED PRICING MODEL
    pricing: {
        basic: { title: "Quick Fix", price: "800", desc: "Taps, washers, and minor leak repairs." },
        standard: { title: "Deep Repair", price: "2500", desc: "Geyser installation or internal pipe fixing." },
        premium: { title: "Full Fitting", price: "8000", desc: "Complete bathroom sanitary installation." }
    }
  },
  { 
    id: 4, 
    fullName: "Kamran Siddiqui", 
    category: "plumber", 
    rating: "4.6", 
    jobs: "56", 
    location: "DHA Phase 5, Lahore",
    experience: "3 Years",
    bio: "Professional plumber focused on bathroom renovations and kitchen fittings.",
    skills: ["Taps & Showers", "Kitchen Plumbing", "Water Tank"],
    image: "https://i.pravatar.cc/150?u=kamran",
    pricing: {
        basic: { title: "Inspection", price: "500", desc: "Visit and diagnosis of the issue." },
        standard: { title: "Installation", price: "1800", desc: "Fitting of new kitchen/bath fixtures." },
        premium: { title: "Full Service", price: "5000", desc: "Complete house water-system maintenance." }
    }
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
      <div className="bg-[#0A0A0A] border-b border-white/5 pt-28 pb-20 px-6 text-center">
        <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter">
            {serviceName} <span className="text-[#00D1D1]">Pros</span>
        </h1>
        <p className="text-gray-500 mt-4 uppercase tracking-[0.5em] text-[10px] font-bold">Lahore's Top Verified Experts</p>
      </div>

      {/* ENHANCED CARDS LIST */}
      <div className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {filteredTaskers.map((tasker) => (
          <div 
            key={tasker.id} 
            onClick={() => setSelectedTasker(tasker)} 
            className="group bg-[#0A0A0A] border border-white/5 p-10 rounded-[3rem] hover:border-[#00D1D1]/30 transition-all cursor-pointer relative overflow-hidden"
          >
            {/* Background Glow Effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00D1D1]/5 blur-[80px] group-hover:bg-[#00D1D1]/10 transition-all"></div>

            <div className="flex flex-col sm:flex-row gap-8 relative z-10">
                <div className="relative shrink-0">
                    <img src={tasker.image} className="w-32 h-32 rounded-[2.5rem] object-cover border-2 border-white/10 group-hover:border-[#00D1D1]/50 transition-all" />
                    <div className="absolute -bottom-2 -right-2 bg-[#00D1D1] text-black w-8 h-8 rounded-full flex items-center justify-center border-4 border-[#0A0A0A]">
                        <ShieldCheck size={16} />
                    </div>
                </div>

                <div className="flex-1 space-y-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-3xl font-black uppercase italic leading-none">{tasker.fullName}</h3>
                            <div className="flex items-center gap-2 mt-2">
                                <Star size={14} className="text-[#00D1D1] fill-[#00D1D1]" />
                                <span className="text-xs font-black">{tasker.rating}</span>
                                <span className="text-gray-600 text-[10px] uppercase font-bold">({tasker.jobs} Jobs done)</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Starts at</p>
                            <p className="text-xl font-black text-white italic">Rs.{tasker.pricing.basic.price}</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tasker.skills.slice(0, 3).map(skill => (
                            <span key={skill} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[9px] font-black uppercase text-gray-400">
                                {skill}
                            </span>
                        ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase">
                            <MapPin size={12} className="text-[#00D1D1]"/> {tasker.location.split(',')[0]}
                        </div>
                        <span className="flex items-center gap-1 text-[#00D1D1] text-[10px] font-black uppercase group-hover:translate-x-2 transition-all">
                            View Profile <ChevronRight size={14} />
                        </span>
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL WITH TIERED PRICING */}
      {selectedTasker && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 backdrop-blur-3xl bg-black/90 overflow-hidden">
          <div className="absolute inset-0" onClick={() => setSelectedTasker(null)}></div>

          <div className="bg-[#0A0A0A] border border-white/10 w-full max-w-6xl max-h-[90vh] rounded-[4rem] overflow-y-auto relative z-10 custom-scrollbar shadow-2xl">
            
            <div className="p-8 md:p-16">
              <div className="flex flex-col lg:flex-row gap-16">
                
                {/* Profile Section */}
                <div className="lg:col-span-4 space-y-8 w-full lg:w-1/3">
                    <img src={selectedTasker.image} className="w-full aspect-square rounded-[3rem] object-cover" />
                    <div className="space-y-4">
                        <h2 className="text-5xl font-black uppercase italic tracking-tighter">{selectedTasker.fullName}</h2>
                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5 italic text-gray-400 text-sm">
                            "{selectedTasker.bio}"
                        </div>
                    </div>
                    <button 
                        onClick={() => navigate('/chat', { state: { tasker: selectedTasker } })}
                        className="w-full py-6 bg-white/5 text-white font-black uppercase text-[11px] rounded-3xl border border-white/10 flex items-center justify-center gap-3 hover:bg-white/10"
                    >
                        <MessageSquare size={20}/> Open Chat
                    </button>
                </div>

                {/* PRICING PLANS SECTION */}
                <div className="flex-1 space-y-8">
                    <h3 className="text-[12px] font-black text-[#00D1D1] uppercase tracking-[0.5em] flex items-center gap-3">
                        <Zap size={16}/> Choose a Service Plan
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <PlanCard 
                            plan={selectedTasker.pricing.basic} 
                            type="Basic" 
                            onClick={() => navigate(`/book/${selectedTasker.id}`, { state: { tasker: selectedTasker, plan: 'basic' } })}
                        />
                        <PlanCard 
                            plan={selectedTasker.pricing.standard} 
                            type="Standard" 
                            recommended
                            onClick={() => navigate(`/book/${selectedTasker.id}`, { state: { tasker: selectedTasker, plan: 'standard' } })}
                        />
                        <PlanCard 
                            plan={selectedTasker.pricing.premium} 
                            type="Premium" 
                            onClick={() => navigate(`/book/${selectedTasker.id}`, { state: { tasker: selectedTasker, plan: 'premium' } })}
                        />
                    </div>

                    <div className="p-8 bg-black rounded-[2.5rem] border border-white/5">
                        <h4 className="font-black uppercase italic mb-4">Portfolio Highlights</h4>
                        <div className="grid grid-cols-3 gap-4">
                            {[1,2,3].map(i => (
                                <div key={i} className="aspect-square bg-white/5 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all border border-white/5">
                                    <img src={`https://picsum.photos/seed/${selectedTasker.id + i}/300`} className="w-full h-full object-cover" />
                                </div>
                            ))}
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

// HELPER COMPONENT FOR PRICING
const PlanCard = ({ plan, type, recommended, onClick }) => (
    <div className={`p-8 rounded-[2.5rem] border transition-all flex flex-col justify-between ${recommended ? 'bg-[#00D1D1] border-[#00D1D1] text-black scale-105 shadow-[0_20px_40px_rgba(0,209,209,0.2)]' : 'bg-white/5 border-white/10 text-white hover:border-[#00D1D1]'}`}>
        <div>
            <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${recommended ? 'bg-black text-[#00D1D1]' : 'bg-white/10 text-gray-400'}`}>
                {type}
            </span>
            <h4 className="text-xl font-black uppercase italic mt-4 mb-2 leading-none">{plan.title}</h4>
            <p className={`text-[10px] font-medium leading-relaxed mb-6 ${recommended ? 'text-black/70' : 'text-gray-500'}`}>
                {plan.desc}
            </p>
        </div>
        <div>
            <div className="mb-6">
                <span className="text-3xl font-black italic">Rs.{plan.price}</span>
            </div>
            <button onClick={onClick} className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] transition-all ${recommended ? 'bg-black text-white hover:scale-105' : 'bg-[#00D1D1] text-black hover:scale-105'}`}>
                Book Now
            </button>
        </div>
    </div>
);

export default ServiceDetail;
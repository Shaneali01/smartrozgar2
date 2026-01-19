import React, { useState } from 'react';
import { Search, Phone, ShieldCheck } from 'lucide-react';
import Logo from '/images/logo2.png'; 

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Fixed YouTube ID and URL parameters
  const videoId = "0x5mf8BUJZY"; 
  const videoParams = `?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&enablejsapi=1`;

  const handleBookNow = () => console.log("Booking initiated!");

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden font-['Inter'] bg-black">
      
      {/* 1. FIXED YouTube Background Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 w-full h-full scale-[1.5]"> 
          <iframe
            className="w-full h-full object-cover"
            src={`https://www.youtube.com/embed/${videoId}${videoParams}`}
            title="SmartRozgar Hero Background"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        
        {/* Dark Overlays for Text Readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10"></div>
      </div>

      {/* 2. Centered Content */}
      <div className="relative z-20 w-full max-w-6xl px-6 text-center flex flex-col items-center space-y-8">
        
        {/* Brand Logo & Tagline */}
        <div className="flex flex-col items-center mb-4">
          <img src={Logo} alt="SmartRozgar Logo" className="h-16 mb-6 brightness-0 invert opacity-90" />
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#00D1D1]/10 border border-[#00D1D1]/20 rounded-full text-[#00D1D1]">
            <ShieldCheck size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Verified Professionals</span>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-white">
            SMART<span className="text-[#00D1D1]">ROZGAR</span>
          </h1>
          <h2 className="text-xl sm:text-3xl font-bold text-white/80 tracking-tight">
            Home Maintenance Made Simple
          </h2>
          
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mt-4">
            Connect with trusted local experts for 
            <span className="text-white font-semibold italic ml-1">cleaning, plumbing, and electrical</span> work.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-2xl group mt-4">
          <div className="absolute -inset-1 bg-[#00D1D1] rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-1000"></div>
          <div className="relative">
            <input
              type="text"
              placeholder="What service do you need today?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-6 bg-white/5 backdrop-blur-3xl border border-white/10 text-white rounded-2xl focus:border-[#00D1D1] transition shadow-2xl outline-none placeholder:text-gray-500 text-lg"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-[#00D1D1]" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mt-4">
          <button
            onClick={handleBookNow}
            className="w-full sm:w-auto px-12 py-5 bg-[#00D1D1] text-black font-black rounded-2xl shadow-[0_10px_40px_rgba(0,209,209,0.2)] hover:bg-[#00FFFF] transition-all transform hover:scale-105 active:scale-95 text-xs uppercase tracking-widest"
          >
            Create Job Now
          </button>

          <button className="flex items-center gap-3 px-8 py-5 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-white/10 transition-all backdrop-blur-md text-xs font-bold uppercase tracking-widest">
            <Phone className="w-4 h-4 text-[#00D1D1]" />
            Direct Hire Professionals
          </button>
        </div>

      </div>
      
      {/* Scroll Down Hint */}
      <div className="absolute bottom-8 flex flex-col items-center gap-4">
        <span className="text-[10px] text-gray-600 uppercase tracking-[0.4em] font-bold">Scroll to Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-[#00D1D1] to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroSection;
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { Target, Eye, Users, Award, ArrowRight, Zap, ShieldCheck, Globe } from 'lucide-react';
import Navbar from '../../components/common/Navbar';

export default function AboutUs() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/icons/about.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error('Lottie load failed:', err));
  }, []);

  return (
    /* FIX 1: Instead of just bg, we use 'min-h-screen' + 'flex flex-col'.
      The 'isolate' class ensures that margins inside this page stay inside this page.
    */
    <div className="bg-[#050505] min-h-screen font-['Inter'] flex flex-col isolate overflow-x-hidden">
      <Navbar />

      {/* FIX 2: We use a 'main' tag with 'flex-grow'. 
        The 'pb-[10vh]' ensures there is always extra background space at the bottom 
        of the content to prevent the 'ghost' gap.
      */}
      <main className="relative flex-grow px-6 pt-24 pb-[100px]">
        
        {/* Background Decorative Glows */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00D1D1]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#00D1D1]/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <div className="order-2 lg:order-1 relative">
              <div className="absolute inset-0 bg-[#00D1D1]/10 blur-[80px] rounded-full scale-75 animate-pulse"></div>
              {animationData ? (
                <Lottie 
                  animationData={animationData} 
                  loop={true} 
                  className="w-full max-w-lg mx-auto relative z-10 filter drop-shadow-[0_0_20px_rgba(0,209,209,0.2)]"
                />
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-[3rem] w-full aspect-square flex items-center justify-center">
                  <span className="text-gray-600 tracking-widest animate-pulse uppercase text-xs">Initializing...</span>
                </div>
              )}
            </div>

            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6">
                <Zap size={14} className="text-[#00D1D1]" />
                <span className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400">Our Story</span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white mb-8 leading-tight">
                About <br />
                <span className="text-[#00D1D1]">SmartRozgar</span>
              </h1>
              <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
                <p>
                  We are not just a job platform; we are a <span className="text-white font-bold">career-tech powerhouse</span>. SmartRozgar was built to dismantle the barriers between Pakistan's brightest talent and the world's most innovative companies.
                </p>
                <p>
                  By leveraging AI and user-centric design, we make professional discovery <span className="text-[#00D1D1]">fast, transparent, and undeniably elite</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Core Identity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
            {[
              { icon: Target, title: "Our Mission", desc: "To provide a seamless, AI-driven bridge for career connections that drives professional growth across the nation." },
              { icon: Eye, title: "Our Vision", desc: "To become the most trusted digital ecosystem for career transformation in a rapidly evolving global market." },
              { icon: Award, title: "Our Values", desc: "Built on a foundation of Radical Transparency, Continuous Innovation, and Inclusive Excellence for all." }
            ].map((card, i) => (
              <div key={i} className="group bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] p-10 hover:border-[#00D1D1]/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#00D1D1]/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="bg-white/5 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:scale-110 group-hover:bg-[#00D1D1]/10 transition-all">
                  <card.icon className="w-8 h-8 text-[#00D1D1]" />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">{card.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Impact Stats */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#00D1D1]/5 to-transparent"></div>
            
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6 relative z-10">
              Why Choose <span className="text-[#00D1D1]">SmartRozgar</span>?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-16 relative z-10">
              We go beyond the traditional job board, offering verified listings and a personalized matching engine.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
              {[
                { icon: Users, title: "10,000+", label: "Job Seekers" },
                { icon: Globe, title: "5,000+", label: "Partner Companies" },
                { icon: ShieldCheck, title: "98%", label: "Verified Listings" },
                { icon: Zap, title: "Instant", label: "Smart Matching" }
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <stat.icon className="w-6 h-6 text-[#00D1D1] mb-4" />
                  <h4 className="text-3xl lg:text-4xl font-black text-white mb-1 tracking-tighter">{stat.title}</h4>
                  <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-bold">{stat.label}</p>
                </div>
              ))}
            </div>

            <button className="mt-20 group bg-[#00D1D1] hover:bg-[#00f2f2] text-black font-black py-5 px-10 rounded-2xl transition-all duration-300 flex items-center gap-3 mx-auto shadow-[0_10px_30px_rgba(0,209,209,0.2)] active:scale-95 relative z-10">
              EXPLORE OPPORTUNITIES
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>

      {/* FIX 3: This is the "End Block". 
         It has no content, but it forces the parent's black background to 
         extend beyond the visible content. 
      */}
    </div>
  );
}
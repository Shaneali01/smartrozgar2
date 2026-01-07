import React from 'react';
import { Award, DollarSign, Zap, Shield, Clock, Smile } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Certified Professionals',
    description: 'Our team comprises rigorously vetted and highly skilled experts to ensure top-quality service.',
  },
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    description: 'No hidden fees. You get a clear, upfront estimate before any work begins.',
  },
  {
    icon: Zap,
    title: 'Quick Service Response',
    description: 'We prioritize rapid response times to be at your doorstep quickly.',
  },
  {
    icon: Shield,
    title: 'Assured Safety & Warranty',
    description: 'All services come with a warranty and our staff adhere to strict safety protocols.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description: 'We respect your schedule. Our professionals arrive on time and complete the job promptly.',
  },
  {
    icon: Smile,
    title: '100% Satisfaction',
    description: 'Your happiness is our goal. If you are not satisfied, we will make it right.',
  },
];

const WhyChooseUs = () => {
  return (
    <section id="why-choose-us" className="w-full font-['Inter'] py-24 bg-black overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00D1D1]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#008080]/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">
            <span className="text-white">Why Trust</span> <span className="text-[#00D1D1]">Us?</span>
          </h2>
          <div className="w-24 h-1 bg-[#00D1D1] mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            We don't just fix things, we offer peace of mind. Experience the 
            <span className="text-white"> gold standard</span> of home maintenance.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group relative p-8 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 transition-all duration-500 hover:border-[#00D1D1]/30 hover:bg-[#111111] hover:-translate-y-2"
            >
              {/* Top Right Corner Accent */}
              <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-2 h-2 rounded-full bg-[#00D1D1] animate-pulse"></div>
              </div>

              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00D1D1]/10 to-transparent flex items-center justify-center mb-6 border border-[#00D1D1]/20 group-hover:scale-110 group-hover:border-[#00D1D1]/50 transition-all duration-500">
                <reason.icon className="w-8 h-8 text-[#00D1D1]" strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#00D1D1] transition-colors">
                {reason.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                {reason.description}
              </p>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-b from-[#00D1D1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-20 p-8 rounded-3xl border border-white/5 bg-gradient-to-r from-transparent via-white/5 to-transparent text-center" data-aos="zoom-in">
            <p className="text-gray-400 text-sm uppercase tracking-[0.3em] font-semibold">
                Trusted by over <span className="text-[#00D1D1]">50,000+</span> Households
            </p>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
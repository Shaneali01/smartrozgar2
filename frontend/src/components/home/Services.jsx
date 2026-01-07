import React from 'react';
import { ArrowRight } from 'lucide-react';

const services = [
  { id: 1, name: 'AC Services', icon: '/icons/ac-service.png' },
  { id: 2, name: 'Plumber', icon: '/icons/plumber_icon.png' },
  { id: 3, name: 'Electrician', icon: '/icons/electrician.png' },
  { id: 4, name: 'Handyman', icon: '/icons/technician.png' },
  { id: 5, name: 'Carpenter', icon: '/icons/carpenter.png' },
  { id: 6, name: 'Painter', icon: 'icons/painter.png' },
  { id: 7, name: 'Home Appliances', icon: '/icons/repair.png' },
  { id: 8, name: 'Geyser', icon: '/icons/geyser.png' },
  { id: 9, name: 'Pest Control', icon: '/icons/pest-control.png' },
  { id: 10, name: 'Makeup Artist', icon: '/icons/makeupartist.png' },
];

const Services = () => {
  return (
    <section id="services" className="w-full bg-[#000000] font-['Inter'] py-20 px-4 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-4xl sm:text-6xl font-black mb-6 tracking-tight">
            <span className="text-white">Professional</span> <span className="text-[#00D1D1]">Services</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Premium home maintenance solutions delivered by verified experts. 
            <span className="text-white"> Efficiency meets excellence.</span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              data-aos="fade-up"
              className="group relative h-48 sm:h-56"
            >
              {/* Card Container */}
              <div 
                className="relative bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 h-full flex flex-col justify-center items-center overflow-hidden transition-all duration-500 cursor-pointer group-hover:border-[#00D1D1]/50 group-hover:bg-[#111111] group-hover:-translate-y-3"
              >
                {/* Background Glow Effect on Hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00D1D1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                {/* Icon Container */}
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-4 border border-white/5 group-hover:scale-110 group-hover:bg-[#00D1D1]/10 group-hover:border-[#00D1D1]/20 transition-all duration-500">
                  <img 
                    src={service.icon} 
                    alt={service.name}
                    className="w-12 h-12 object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-all duration-500"
                    onError={(e) => {
                        e.currentTarget.src = "https://placehold.co/48x48/121212/00D1D1/png?text=⚡";
                    }}
                  />
                </div>
                
                {/* Service Name */}
                <h3 className="relative z-10 text-center text-gray-300 font-bold text-sm sm:text-lg group-hover:text-white transition-colors tracking-wide">
                  {service.name}
                </h3>

                {/* Animated Bottom Bar */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-[#00D1D1] to-[#008080] group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20" data-aos="zoom-in">
          <button className="group relative px-10 py-4 bg-transparent border-2 border-[#00D1D1] text-[#00D1D1] rounded-full font-bold text-lg hover:bg-[#00D1D1] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(0,209,209,0.1)] hover:shadow-[0_0_30px_rgba(0,209,209,0.4)] flex items-center mx-auto gap-2">
            View All Categories
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
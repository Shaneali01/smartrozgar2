import React from 'react';

const Working = () => {
  const steps = [
    {
      id: "01",
      title: "Tell us what you need",
      description: "Let us know what service you are looking for. We offer more than 25 different home services with instant booking.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      alt: "Customer calling for service",
      direction: "normal"
    },
    {
      id: "02",
      title: "We find the right pro",
      description: "We match you with licensed, vetted, and top-rated professionals in your area within minutes.",
      image: "https://images.unsplash.com/photo-1581578731117-10452b7bb5af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      alt: "Professional cleaners working",
      direction: "reverse"
    },
    {
      id: "03",
      title: "Sit back and relax",
      description: "Track your pro in real-time and enjoy a job well done. Payment is only released when you're happy.",
      image: "https://images.unsplash.com/photo-1512314889357-e157c22f938d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
      alt: "Customer relaxing on sofa",
      direction: "normal"
    }
  ];

  return (
    <section id="how-it-works" className="w-full py-24 px-6 bg-[#050505] font-['Inter'] relative overflow-hidden">
      
      {/* Background Tech-Grid or Subtle Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-transparent via-[#00D1D1]/5 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-transparent via-[#00D1D1]/5 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-24" data-aos="fade-up">
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-6">
            Simple <span className="text-[#00D1D1]">Process</span>
          </h2>
          <p className="max-w-xl text-lg text-gray-400 mx-auto leading-relaxed">
            Getting your home serviced has never been this seamless. Follow our 
            <span className="text-white"> 3-step guide</span> to excellence.
          </p>
        </div>

        <div className="relative">
          {/* Central Line - Glowing Neon Gradient */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-[#00D1D1]/0 via-[#00D1D1]/40 to-[#00D1D1]/0 z-0"></div>

          {steps.map((step, index) => (
            <div key={step.id} className="relative z-10 mb-24 last:mb-0" data-aos={step.direction === 'reverse' ? 'fade-left' : 'fade-right'}>
              
              {/* Desktop Layout */}
              <div className="hidden lg:flex items-center justify-between w-full group">
                
                {/* Left Side Content */}
                <div className={`w-[42%] ${step.direction === 'reverse' ? 'order-3 text-left' : 'order-1 text-right'}`}>
                   <div className="p-8 rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 group-hover:border-[#00D1D1]/20 transition-all duration-500 shadow-2xl">
                     <span className="inline-block text-[#00D1D1] font-black text-5xl opacity-20 mb-4 group-hover:opacity-100 transition-opacity">{step.id}</span>
                     <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#00D1D1] transition-colors">{step.title}</h3>
                     <p className="text-gray-400 text-base leading-relaxed group-hover:text-gray-200">{step.description}</p>
                   </div>
                </div>

                {/* Center Number Hub */}
                <div className="w-[16%] order-2 flex justify-center relative">
                  <div className="bg-[#00D1D1] w-14 h-14 rounded-2xl flex items-center justify-center shadow-[0_0_25px_rgba(0,209,209,0.4)] group-hover:rotate-[360deg] transition-all duration-700 z-10 border-4 border-black"> 
                    <span className="text-xl font-black text-black">{step.id}</span>
                  </div>
                  {/* Subtle pulsing ring */}
                  <div className="absolute w-14 h-14 bg-[#00D1D1]/20 rounded-2xl animate-ping"></div>
                </div>

                {/* Right Side Image */}
                <div className={`w-[42%] ${step.direction === 'reverse' ? 'order-1' : 'order-3'}`}>
                    <div className="relative group overflow-hidden rounded-[2.5rem] h-64 border border-white/10 shadow-2xl transition-all duration-500 group-hover:border-[#00D1D1]/30">
                      <img 
                        src={step.image} 
                        alt={step.alt} 
                        className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    </div>
                </div>
              </div>

              {/* Mobile Layout */}
              <div className="lg:hidden flex flex-col items-center text-center space-y-6">
                 <div className="bg-[#00D1D1] w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg">
                   <span className="text-xl font-black text-black">{step.id}</span>
                 </div>
                 
                 <div className="w-full h-56 rounded-[2rem] overflow-hidden border border-white/10 shadow-xl">
                   <img src={step.image} alt={step.alt} className="w-full h-full object-cover" />
                 </div>

                 <div className="px-4">
                   <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                   <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                 </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA for Working Section */}
        <div className="mt-20 text-center" data-aos="zoom-in">
           <p className="text-gray-500 font-medium mb-6 italic">Ready to experience the future of home maintenance?</p>
           <button className="px-10 py-4 bg-[#00D1D1] text-black font-black rounded-full hover:shadow-[0_0_30px_rgba(0,209,209,0.5)] transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest text-sm">
             Book Your First Service
           </button>
        </div>

      </div>
    </section>
  );
};

export default Working;
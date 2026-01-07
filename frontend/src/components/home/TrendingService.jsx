import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Star, ArrowRight, TrendingUp } from 'lucide-react';

const trendingServiceData = [
  { id: 1, image: '/images/plumber-service.jpg', title: 'Door Lock Repair', rating: 4.8, originalPrice: '3500', discountedPrice: '3000' },
  { id: 2, image: '/images/plumber-service.jpg', title: 'AC Installation', rating: 4.4, originalPrice: '3000', discountedPrice: '2500' },
  { id: 3, image: '/images/gardener-service.jpg', title: 'UPS Installation', rating: 4.6, originalPrice: '1500', discountedPrice: '1300' },
  { id: 4, image: '/images/electrician-service.jpg', title: 'Wall Painting', rating: 4.7, originalPrice: '6000', discountedPrice: '5500' },
  { id: 5, image: '/images/cleaning-service.jpg', title: 'Pest Control', rating: 4.5, originalPrice: '2000', discountedPrice: '1800' },
];

const TrendingServicesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0); 
  const sliderRef = useRef(null);
  const totalCards = trendingServiceData.length;

  const getCardStep = useCallback(() => {
    if (sliderRef.current && sliderRef.current.firstChild) {
        const firstCard = sliderRef.current.firstChild;
        const width = firstCard.offsetWidth;
        const marginRight = 24; 
        return width + marginRight;
    }
    return 344;
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const step = getCardStep();
        const nextIndex = (currentIndex + 1) % totalCards;
        sliderRef.current.scrollTo({ left: nextIndex * step, behavior: 'smooth' });
        setCurrentIndex(nextIndex);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex, totalCards, getCardStep]);

  const handleScroll = () => {
    if (sliderRef.current) {
      const step = getCardStep();
      const newIndex = Math.round(sliderRef.current.scrollLeft / step);
      setCurrentIndex(Math.max(0, Math.min(newIndex, totalCards - 1)));
    }
  };

  return (
    <section className="w-full bg-[#050505] font-['Inter'] py-24 px-6 lg:px-20 overflow-hidden">
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 items-center">
        
        {/* Left Content Area */}
        <div className="space-y-6 text-center lg:text-left" data-aos="fade-right">
          <div className="flex items-center justify-center lg:justify-start gap-2 text-[#00D1D1] font-bold tracking-widest uppercase text-sm">
            <TrendingUp className="w-5 h-5" />
            Trending Now
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white leading-[1.1]">
            Hot-sellers <br />
            <span className="text-[#00D1D1]">for grabs!</span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
            Join thousands of satisfied customers who trust our top-rated 
            technicians for their daily needs.
          </p>
          <button className="hidden lg:flex items-center gap-2 text-white font-bold group hover:text-[#00D1D1] transition-colors">
            View all deals <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Right Slider Area */}
        <div className="relative" data-aos="fade-left">
          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-10 px-4" 
            onScroll={handleScroll}
          >
            {trendingServiceData.map((service) => (
              <div key={service.id} className="flex-shrink-0 w-[85%] sm:w-80 snap-start mr-6 group">
                <div className="bg-[#111111] border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-[#00D1D1]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                  
                  {/* Service Image with Badge */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute top-4 left-4 z-20 bg-[#00D1D1] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                      Top Rated
                    </div>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent"></div>
                  </div>

                  {/* Service Details */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-[#00D1D1] transition-colors leading-tight">
                        {service.title}
                      </h3>
                      <div className="flex items-center bg-white/5 px-2 py-1 rounded-lg">
                        <Star className="w-3 h-3 fill-[#00D1D1] text-[#00D1D1] mr-1" />
                        <span className="text-xs font-bold text-white">{service.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex flex-col">
                        <span className="text-gray-500 text-xs line-through">Rs: {service.originalPrice}</span>
                        <span className="text-[#00D1D1] text-2xl font-black">Rs: {service.discountedPrice}</span>
                      </div>
                      <button className="p-3 bg-white/5 rounded-2xl hover:bg-[#00D1D1] hover:text-black transition-all text-white">
                        <ArrowRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center lg:justify-start space-x-3 mt-4 ml-4">
            {trendingServiceData.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 transition-all duration-500 rounded-full ${
                  index === currentIndex ? 'w-10 bg-[#00D1D1]' : 'w-2 bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingServicesSlider;
import React, { useState, useEffect } from 'react';
import { Send, User, Phone, MessageSquare } from 'lucide-react';
import Lottie from 'lottie-react';

export default function ComplaintBox() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch('/icons/Contact2.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Form submitted:', formData);
    alert('Thank you for your feedback! We will review your complaint shortly.');
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <section className="bg-[#050505] py-24 px-6 relative overflow-hidden font-['Inter']">
      
      {/* Background Decorative Radial Glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#00D1D1]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Heading Section */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            <span className="text-white">Resolving your</span> <br className="md:hidden" />
            <span className="text-[#00D1D1]"> complaints!</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Your voice helps us perfect our craft. Leave your details below and our 
            <span className="text-white font-bold"> priority support team</span> will reach out.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Lottie Animation (Moved to left for visual flow) */}
          <div className="flex items-center justify-center order-2 lg:order-1" data-aos="fade-right">
            <div className="w-full max-w-md relative">
              {/* Subtle floating ring behind animation */}
              <div className="absolute inset-0 border-2 border-[#00D1D1]/10 rounded-full animate-[ping_3s_linear_infinite]"></div>
              {animationData ? (
                <Lottie 
                  animationData={animationData} 
                  loop={true}
                  className="w-full h-full relative z-10"
                />
              ) : (
                <div className="bg-white/5 rounded-[3rem] aspect-square flex items-center justify-center border border-white/10">
                  <p className="text-[#00D1D1] font-bold animate-pulse">CONNECTING...</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side - Dark Glassmorphism Form */}
          <div className="bg-[#0A0A0A] rounded-[2.5rem] border border-white/5 p-8 sm:p-12 shadow-2xl order-1 lg:order-2" data-aos="fade-left">
            <div className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00D1D1] transition-colors w-5 h-5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-[#00D1D1] focus:ring-1 focus:ring-[#00D1D1] transition-all text-white placeholder:text-gray-600"
                  />
                </div>

                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#00D1D1] transition-colors w-5 h-5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-[#00D1D1] focus:ring-1 focus:ring-[#00D1D1] transition-all text-white placeholder:text-gray-600"
                  />
                </div>
              </div>

              <div className="relative group">
                <MessageSquare className="absolute left-4 top-6 text-gray-500 group-focus-within:text-[#00D1D1] transition-colors w-5 h-5" />
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what happened..."
                  rows="4"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-[#00D1D1] focus:ring-1 focus:ring-[#00D1D1] transition-all resize-none text-white placeholder:text-gray-600"
                ></textarea>
              </div>

              <button
                onClick={handleSubmit}
                className="w-full group bg-[#00D1D1] hover:bg-[#00f2f2] text-black font-black py-5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(0,209,209,0.2)] hover:shadow-[0_15px_40px_rgba(0,209,209,0.4)] active:scale-95"
              >
                SEND COMPLAINT
                <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>

              <p className="text-center text-gray-500 text-xs uppercase tracking-[0.2em] pt-4">
                Guaranteed response within 24 hours
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
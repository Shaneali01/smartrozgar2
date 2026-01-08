import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ShieldCheck, ArrowRight, ArrowLeft, Clock, Check, Star } from 'lucide-react';
import toast from 'react-hot-toast';

const BookingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const tasker = state?.tasker;

  if (!tasker) return <div className="p-20 text-[#00D1D1] text-center font-black">MISSING TASKER DATA</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Inter'] py-8 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        
        {/* STEPPER HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-10 mb-5">
            <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-none">
                    Hire <span className="text-[#00D1D1]">{tasker.fullName.split(' ')[0]}</span>
                </h1>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em]">Step {currentStep} of 3 • {currentStep === 1 ? 'Schedule' : currentStep === 2 ? 'Location' : 'Final Review'}</p>
            </div>
            {/* Horizontal Stepper UI */}
            <div className="flex gap-4">
                {[1,2,3].map(i => (
                    <div key={i} className={`h-2 w-20 rounded-full transition-all duration-700 ${currentStep >= i ? 'bg-[#00D1D1] shadow-[0_0_15px_#00D1D1]' : 'bg-white/10'}`}></div>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 bg-[#0A0A0A] border border-white/10 p-12 md:p-20 rounded-[4rem] space-y-12">
            
            {currentStep === 1 && (
              <div className="space-y-10 animate-in slide-in-from-right-10">
                <h3 className="text-3xl font-black uppercase italic">Pick a Date & Time</h3>
                <div className="grid grid-cols-1 gap-8">
                    <input type="date" className="w-full bg-black border border-white/10 p-6 rounded-3xl outline-none focus:border-[#00D1D1] transition-all text-xl font-bold" />
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-6 bg-[#00D1D1]/10 border border-[#00D1D1] text-[#00D1D1] rounded-2xl font-black uppercase text-xs">Morning (9AM - 1PM)</button>
                        <button className="p-6 bg-white/5 border border-white/5 text-gray-500 rounded-2xl font-black uppercase text-xs">Evening (2PM - 6PM)</button>
                    </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-10 animate-in slide-in-from-right-10">
                <h3 className="text-3xl font-black uppercase italic">Job Location</h3>
                <textarea placeholder="Write full address..." className="w-full bg-black border border-white/10 p-8 h-56 rounded-[3rem] outline-none focus:border-[#00D1D1] text-lg font-medium" />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-10 animate-in slide-in-from-right-10">
                <h3 className="text-3xl font-black uppercase italic">Booking Review</h3>
                <div className="bg-black p-10 rounded-[3rem] border border-white/5 space-y-6">
                    <div className="flex justify-between text-gray-500 font-black uppercase text-[11px]"><span>Professional</span> <span className="text-white">{tasker.fullName}</span></div>
                    <div className="flex justify-between text-gray-500 font-black uppercase text-[11px]"><span>Service Fee</span> <span className="text-[#00D1D1] text-2xl tracking-tighter">PKR {tasker.price}</span></div>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-10 border-t border-white/5">
                {currentStep > 1 && <button onClick={() => setCurrentStep(prev => prev - 1)} className="px-10 py-6 bg-white/5 rounded-3xl font-black uppercase text-[10px]">Back</button>}
                {currentStep < 3 ? (
                    <button onClick={() => setCurrentStep(prev => prev + 1)} className="flex-1 py-6 bg-[#00D1D1] text-black rounded-3xl font-black uppercase text-[10px] shadow-lg">Continue</button>
                ) : (
                    <button onClick={() => { toast.success("Hired!"); navigate('/dashboard'); }} className="flex-1 py-6 bg-[#00D1D1] text-black rounded-3xl font-black uppercase text-[10px] shadow-2xl">Confirm Booking</button>
                )}
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0A0A0A] border border-[#00D1D1]/30 p-10 rounded-[4rem]">
                <img src={tasker.image} className="w-24 h-24 rounded-3xl object-cover mb-6 ring-4 ring-[#00D1D1]/10" />
                <h4 className="text-2xl font-black uppercase italic leading-none">{tasker.fullName}</h4>
                <p className="text-[#00D1D1] text-[10px] font-black uppercase tracking-widest mt-2">{tasker.category}</p>
                <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase text-gray-500"><span>Rating</span> <span className="text-white">{tasker.rating}</span></div>
                    <div className="flex justify-between text-[10px] font-black uppercase text-gray-500"><span>Jobs Done</span> <span className="text-white">{tasker.jobs}</span></div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
import React, { useState, useEffect } from 'react';
import { Mail, User, MessageSquareMore, Send, Sparkles } from 'lucide-react';
import Lottie from 'lottie-react';

const simulateSubmission = async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true, message: 'Message sent successfully!' };
};

export default function Contact() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState({ message: '', type: '', isSubmitting: false });
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        fetch('/icons/Contact Us.json')
            .then(res => res.json())
            .then(data => setAnimationData(data))
            .catch(err => console.error('Lottie load failed:', err));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setStatus({ message: 'Fields required', type: 'error' });
            return;
        }
        setStatus({ message: 'Sending...', type: 'info', isSubmitting: true });
        const result = await simulateSubmission(formData);
        setStatus({ message: result.message, type: 'success', isSubmitting: false });
        if (result.success) setFormData({ name: '', email: '', message: '' });
    };

    return (
        <main className="bg-[#050505] min-h-screen flex items-center justify-center p-4 lg:p-8 font-['Inter'] relative overflow-hidden">
            
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-[#00D1D1]/10 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-[#00D1D1]/5 blur-[100px] rounded-full"></div>
            </div>

            <div className="w-full max-w-6xl h-full lg:h-[85vh] relative z-10 flex items-center">
                <div className="bg-[#0A0A0A] w-full h-full rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden flex flex-col lg:flex-row">

                    {/* Left: Artistic Side - Height Optimized */}
                    <div className="hidden lg:flex lg:w-1/2 bg-[#0D0D0D] p-10 flex-col justify-between border-r border-white/5 relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 text-[#00D1D1] mb-4">
                                <Sparkles size={16} />
                                <span className="uppercase tracking-[0.3em] text-[10px] font-black">Direct Access</span>
                            </div>
                            <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight">
                                Let's build <br /> 
                                <span className="text-[#00D1D1]">something great</span>
                            </h1>
                            <p className="text-gray-500 mt-4 text-sm max-w-xs leading-relaxed">
                                Our team is ready to assist you with your next big project.
                            </p>
                        </div>

                        {/* Lottie Container - Scale Controlled */}
                        <div className="relative z-10 flex items-center justify-center h-1/2">
                            {animationData ? (
                                <Lottie animationData={animationData} loop={true} className="w-full max-w-[280px]" />
                            ) : (
                                <div className="w-48 h-48 rounded-full bg-white/5 animate-pulse" />
                            )}
                        </div>

                        <div className="relative z-10 text-[10px] text-gray-600 uppercase tracking-widest font-bold">
                            © 2026 SmartRozgar HQ
                        </div>

                        {/* Background Decorative Text */}
                        <div className="absolute -bottom-6 -left-6 text-[8rem] font-black text-white/[0.02] select-none uppercase pointer-events-none">
                            Talk
                        </div>
                    </div>

                    {/* Right: Form Side - Height Optimized */}
                    <div className="w-full lg:w-1/2 h-full p-8 lg:p-12 flex flex-col justify-center bg-black/40 backdrop-blur-xl overflow-y-auto">
                        <div className="max-w-md mx-auto w-full">

                            <div className="mb-8">
                                <h2 className="text-2xl font-black text-white mb-1">Initialize <span className="text-[#00D1D1]">Message</span></h2>
                                <p className="text-gray-500 text-xs">Response time: Usually under 2 hours</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {status.message && (
                                    <div className={`p-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border text-center ${status.type === 'success' ? 'border-[#00D1D1] text-[#00D1D1]' : 'border-red-500/50 text-red-400'}`}>
                                        {status.message}
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <div className="group">
                                        <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-gray-600 mb-2 group-focus-within:text-[#00D1D1]">Name</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="Your Name"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#00D1D1] transition-all"
                                            />
                                            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-[#00D1D1]" />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-gray-600 mb-2 group-focus-within:text-[#00D1D1]">Email</label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="you@email.com"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#00D1D1] transition-all"
                                            />
                                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-[#00D1D1]" />
                                        </div>
                                    </div>

                                    <div className="group">
                                        <label className="block text-[10px] uppercase tracking-[0.2em] font-black text-gray-600 mb-2 group-focus-within:text-[#00D1D1]">Message</label>
                                        <div className="relative">
                                            <textarea
                                                name="message"
                                                rows="3"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Your message..."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#00D1D1] transition-all resize-none"
                                            />
                                            <MessageSquareMore className="absolute left-3.5 top-4 w-4 h-4 text-gray-600 group-focus-within:text-[#00D1D1]" />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={status.isSubmitting}
                                    className="w-full bg-[#00D1D1] hover:bg-[#00f2f2] text-black font-black py-4 rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 disabled:opacity-50"
                                >
                                    <span className="uppercase tracking-widest text-[11px]">Send Transmission</span>
                                    <Send size={14} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
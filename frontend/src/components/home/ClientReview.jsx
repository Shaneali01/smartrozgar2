import React, { useState, useEffect, useCallback } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'; 
import Lottie from 'lottie-react';

const testimonials = [
    { id: 1, name: 'Sarah K.', title: 'Homeowner, Gulberg', rating: 5, review: "I needed urgent plumbing repair, and Mahir Company was at my door within 30 minutes. The technician was professional and fixed the leak quickly.", avatar: 'SK' },
    { id: 2, name: 'Ahmed R.', title: 'Business Owner, DHA', rating: 5, review: "The AC service was thorough and efficient. They also advised me on energy savings. Truly transparent pricing as promised.", avatar: 'AR' },
    { id: 3, name: 'Hina M.', title: 'Resident, Askari X', rating: 4, review: "Used them for electrical wiring. The work quality was excellent. Communication was clear, and the final result was flawless.", avatar: 'HM' },
    { id: 4, name: 'Usman Z.', title: 'Investor, Model Town', rating: 5, review: "Hired them for full house painting. The team was respectful, fast, and the finish is impeccable. Best experience so far.", avatar: 'UZ' },
    { id: 5, name: 'Fatima L.', title: 'New Mom, Johar Town', rating: 5, review: "Excellent deep cleaning service! They paid attention to every detail and used eco-friendly products. Made my home feel brand new.", avatar: 'FL' },
];

const ClientReviews = () => {
    const [current, setCurrent] = useState(0);
    const [animationData, setAnimationData] = useState(null);

    useEffect(() => {
        fetch('/icons/Review_Animation.json')
            .then(res => res.json())
            .then(data => setAnimationData(data))
            .catch(err => console.error("Lottie Error:", err));
    }, []);

    const nextReview = useCallback(() => {
        setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, []);

    const prevReview = () => {
        setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(nextReview, 5000);
        return () => clearInterval(interval);
    }, [nextReview]);

    return (
        <section id="client-reviews" className="w-full bg-black font-['Inter'] py-24 relative overflow-hidden">
            
            {/* Background Glows */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-[#00D1D1]/10 blur-[120px] rounded-full"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20" data-aos="fade-up">
                    <h2 className="text-4xl sm:text-6xl font-black text-white mb-6">
                        Voices of <span className="text-[#00D1D1]">Satisfaction</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Don't just take our word for it. Hear from the homeowners who trust us every day.
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
                    
                    {/* Left: Animation */}
                    <div className="lg:col-span-5 mb-12 lg:mb-0" data-aos="fade-right">
                        <div className="relative aspect-square max-w-md mx-auto bg-gradient-to-br from-[#111111] to-transparent rounded-[3rem] border border-white/5 p-8 flex items-center justify-center shadow-2xl">
                            {animationData ? (
                                <Lottie animationData={animationData} loop={true} className="w-full h-full" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[#00D1D1] animate-pulse font-bold">LOADING...</div>
                            )}
                        </div>
                    </div>

                    {/* Right: Testimonial Card */}
                    <div className="lg:col-span-7 relative" data-aos="fade-left">
                        <div className="relative bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-10 sm:p-16 overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)]">
                            
                            {/* Animated Quote Icon */}
                            <Quote className="absolute top-10 right-10 w-20 h-20 text-white/5" />

                            <div className="relative z-10 min-h-[250px] flex flex-col justify-center">
                                <div className="flex mb-6">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < testimonials[current].rating ? 'text-[#00D1D1] fill-[#00D1D1]' : 'text-gray-700'}`} />
                                    ))}
                                </div>

                                <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed italic mb-10">
                                    "{testimonials[current].review}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-[#00D1D1] flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(0,209,209,0.3)]">
                                        {testimonials[current].avatar}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">{testimonials[current].name}</h4>
                                        <p className="text-[#00D1D1] text-sm font-medium">{testimonials[current].title}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Controls */}
                            <div className="absolute bottom-10 right-10 flex gap-4">
                                <button onClick={prevReview} className="p-4 bg-white/5 hover:bg-[#00D1D1] hover:text-black text-white rounded-2xl transition-all">
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button onClick={nextReview} className="p-4 bg-white/5 hover:bg-[#00D1D1] hover:text-black text-white rounded-2xl transition-all">
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-8 flex justify-center lg:justify-start gap-2">
                            {testimonials.map((_, i) => (
                                <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-12 bg-[#00D1D1]' : 'w-3 bg-white/10'}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ClientReviews;
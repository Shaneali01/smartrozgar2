import React, { useState, useEffect } from 'react';
import { 
  Mail, Lock, Eye, EyeOff, User, Phone, Home, Briefcase, 
  ChevronRight, Check, MapPin, AlertCircle, Loader2, ShieldCheck 
} from 'lucide-react';
import Lottie from 'lottie-react';
import Logo from '/images/logo2.png';
import { axiosInstance } from '../../lib/axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(''); 
  const [animationData, setAnimationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const [formData, setFormData] = useState({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '',
    gender: '', age: '', houseNo: '', street: '', landmark: '',
    city: '', state: '', pincode: '', skills: [], hourlyRate: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const skillsOptions = [
    "Maid/Cleaning", "Cooking", "Babysitting", "Elder Care", 
    "Driver", "Gardening", "Laundry", "Plumbing", "Electrician"
  ];

  useEffect(() => {
    fetch('/icons/Lady.json')
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(() => console.log("Animation failed to load"));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (message) setMessage('');
  };

  const handleSkillToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageType('error');
      return;
    }
    
    setLoading(true);
    setMessage('');

    try {
      const payload = {
        role,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        gender: formData.gender,
        age: parseInt(formData.age),
        address: {
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        ...(role === 'tasker' && {
          skills: formData.skills,
          hourlyRate: parseInt(formData.hourlyRate)
        })
      };

      const response = await axiosInstance.post('/auth/signup', payload);
      
      if (response.data.success) {
        setMessageType('success');
        setMessage("Account created! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed. Please check your details.");
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    /* FIX 1: Use 'fixed inset-0' and 'h-[100dvh]' to lock the page to the viewport */
    <div className="bg-[#050505] fixed inset-0 h-[100dvh] w-full flex items-center justify-center p-4 font-['Inter'] overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00D1D1]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00D1D1]/5 blur-[120px] rounded-full"></div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-[#00D1D1] animate-spin mx-auto mb-4" />
            <p className="text-[#00D1D1] font-bold">Creating your SmartRozgar account...</p>
          </div>
        </div>
      )}

      {/* FIX 2: Height limited to 90% of viewport to ensure card stays within bounds */}
      <div className="max-w-6xl w-full bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10 flex flex-col lg:flex-row h-full max-h-[90dvh] lg:h-[750px]">
        
        {/* LEFT PANEL: Branding */}
        <div className="hidden lg:flex lg:w-2/5 bg-[#0D0D0D] p-12 flex-col justify-between border-r border-white/5 relative">
          <div>
            <div className="flex items-center gap-2 text-[#00D1D1] mb-6 font-bold text-xs uppercase tracking-widest">
              <ShieldCheck size={16} /> Join SmartRozgar
            </div>
            <h3 className="text-4xl font-black text-white leading-tight">
              Start your <br />
              <span className="text-[#00D1D1]">Journey</span> with us
            </h3>
            <p className="text-gray-400 text-sm mt-4 leading-relaxed">
              The easiest way to find skilled help or offer your professional services.
            </p>
          </div>

          <div className="py-4">
            {animationData && <Lottie animationData={animationData} loop={true} className="w-full max-w-[280px] mx-auto opacity-80" />}
          </div>

          <div className="text-xs text-gray-600 font-bold uppercase tracking-widest">
            Safe • Secure • Reliable
          </div>
        </div>

        {/* RIGHT PANEL: Form */}
        <div className="flex-1 p-6 lg:p-12 flex flex-col bg-black/40 backdrop-blur-xl overflow-hidden">
          <div className="max-w-xl mx-auto w-full h-full flex flex-col">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-8 shrink-0">
              <div className="flex flex-col">
                <span className="text-white font-black text-xl tracking-tighter">Smart<span className="text-[#00D1D1]">Rozgar</span></span>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Sign Up</span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`h-1.5 w-6 rounded-full transition-all ${step >= i ? 'bg-[#00D1D1]' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>

            {/* FIX 3: This is the ONLY area allowed to scroll. Added custom scrollbar classes */}
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#00D1D1]/20 scrollbar-track-transparent">
              
              {/* STEP 1: SELECT ROLE */}
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div>
                    <h2 className="text-2xl font-black text-white">Choose your account type</h2>
                    <p className="text-gray-400 text-sm mt-1">How do you want to use SmartRozgar?</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                    <button onClick={() => { setRole('hirer'); nextStep(); }}
                      className="p-8 bg-white/5 border border-white/10 rounded-[2rem] hover:border-[#00D1D1] transition-all text-left group">
                      <Home size={32} className="text-[#00D1D1] mb-4" />
                      <h3 className="text-white font-bold text-lg">I want to Hire</h3>
                      <p className="text-gray-500 text-xs mt-1">I am looking for someone to help with tasks.</p>
                    </button>
                    
                    <button onClick={() => { setRole('tasker'); nextStep(); }}
                      className="p-8 bg-white/5 border border-white/10 rounded-[2rem] hover:border-[#00D1D1] transition-all text-left group">
                      <Briefcase size={32} className="text-[#00D1D1] mb-4" />
                      <h3 className="text-white font-bold text-lg">I want to Work</h3>
                      <p className="text-gray-500 text-xs mt-1">I want to offer my services and earn money.</p>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PERSONAL INFO */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-right-4 pb-4">
                  <h2 className="text-xl font-bold text-white">Personal Details</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-1">Full Name</label>
                      <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#00D1D1] outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-1">Gender</label>
                      <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#00D1D1] outline-none">
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-1">Phone Number</label>
                      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="0300 1234567" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#00D1D1] outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-1">Email (Optional)</label>
                      <input name="email" value={formData.email} onChange={handleChange} placeholder="mail@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#00D1D1] outline-none" />
                    </div>
                  </div>

                  <div className="p-4 bg-white/5 rounded-2xl space-y-3">
                    <label className="text-xs font-bold text-[#00D1D1] uppercase tracking-widest">Address</label>
                    <div className="grid grid-cols-2 gap-3">
                      <input name="city" value={formData.city} onChange={handleChange} placeholder="City" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#00D1D1]" />
                      <input name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#00D1D1]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-1">Password</label>
                      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#00D1D1] outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 ml-1">Confirm Password</label>
                      <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-[#00D1D1] outline-none" />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: WORK DETAILS */}
              {step === 3 && (
                <div className="space-y-6 animate-in zoom-in-95 duration-500 pb-4">
                  <h2 className="text-xl font-bold text-white">Final Steps</h2>
                  
                  {role === 'tasker' ? (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <label className="text-xs font-bold text-gray-400 ml-1">Select your Skills</label>
                        <div className="grid grid-cols-2 gap-2">
                          {skillsOptions.map(skill => (
                            <button key={skill} onClick={() => handleSkillToggle(skill)}
                              className={`py-3 rounded-xl border text-xs font-bold transition-all ${
                                formData.skills.includes(skill) ? 'bg-[#00D1D1] border-[#00D1D1] text-black shadow-lg' : 'bg-white/5 border-white/10 text-gray-500'
                              }`}>
                              {skill}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 ml-1">Your Hourly Rate (PKR)</label>
                        <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} placeholder="e.g. 500" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:border-[#00D1D1] outline-none" />
                      </div>
                    </div>
                  ) : (
                    <div className="py-12 text-center bg-white/5 rounded-[2rem] border border-white/10">
                      <div className="w-16 h-16 bg-[#00D1D1]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                         <Check size={32} className="text-[#00D1D1]" />
                      </div>
                      <h4 className="text-white font-bold">You're all set!</h4>
                      <p className="text-gray-400 text-xs px-10 mt-2">Click below to finish and start finding the best help for your home.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* BUTTONS (Fixed at bottom of right panel) */}
            <div className="mt-auto pt-6 border-t border-white/5 shrink-0">
              <div className="flex gap-4">
                {step > 1 && (
                  <button onClick={prevStep} className="flex-1 py-4 border border-white/10 rounded-2xl text-gray-400 font-bold text-xs uppercase hover:bg-white/5">
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button onClick={nextStep} className="flex-[2] py-4 bg-[#00D1D1] hover:bg-[#00f2f2] text-black font-black rounded-2xl text-xs uppercase flex items-center justify-center gap-2">
                    Continue <ChevronRight size={14} />
                  </button>
                ) : (
                  <button onClick={handleSubmit} className="flex-[2] py-4 bg-[#00D1D1] hover:bg-[#00f2f2] text-black font-black rounded-2xl text-xs uppercase shadow-lg">
                    Create My Account
                  </button>
                )}
              </div>

              {message && (
                <div className={`mt-4 p-3 rounded-xl text-xs font-bold text-center border ${messageType === 'success' ? 'border-[#00D1D1] text-[#00D1D1]' : 'border-red-500/50 text-red-400'}`}>
                  {message}
                </div>
              )}

              <p className="text-center mt-6 text-gray-600 text-xs">
                Already have an account? <Link to="/login" className="text-[#00D1D1] font-bold">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
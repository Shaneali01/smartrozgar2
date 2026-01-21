import React, { useState, useEffect } from 'react';
import { 
  Mail, Lock, Eye, EyeOff, User, Phone, Home, Briefcase, 
  ChevronRight, Check, MapPin, AlertCircle, Loader2, ShieldCheck, X
} from 'lucide-react';
import Lottie from 'lottie-react';
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
    gender: '', age: '', city: '', state: 'Punjab', pincode: '54000', 
    skills: [], hourlyRate: ''
  });

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

  const nextStep = () => {
    if (step === 1 && !role) {
      setMessage("Please select a role");
      setMessageType('error');
      return;
    }
    if (step === 2) {
      if(!formData.fullName || !formData.phone || !formData.city || !formData.password) {
        setMessage("Please fill Name, Phone, City and Password");
        setMessageType('error');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageType('error');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // THIS PAYLOAD NOW MATCHES YOUR BACKEND ROUTE PERFECTLY
      const payload = {
        role,
        fullName: formData.fullName,
        phone: formData.phone,      // Backend uses 'phone' to find existing and then maps to phoneNumber
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        age: formData.age,
        address: {
          city: formData.city,
          state: formData.state || "Punjab",   // Backend requires this
          pincode: formData.pincode || "54000", // Backend requires this
          houseNo: "",
          street: "",
          landmark: ""
        },
        skills: formData.skills,
        hourlyRate: formData.hourlyRate
      };

      const response = await axiosInstance.post('/auth/signup', payload);
      
      if (response.data.success) {
        setMessageType('success');
        setMessage(response.data.message);
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#050505] fixed inset-0 h-[100dvh] w-full flex items-center justify-center p-4 font-['Inter'] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#00D1D1]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#00D1D1]/5 blur-[120px] rounded-full"></div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-[#00D1D1] animate-spin" />
        </div>
      )}

      <div className="max-w-6xl w-full bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row h-full max-h-[90dvh]">
        
        {/* LEFT PANEL */}
        <div className="hidden lg:flex lg:w-2/5 bg-[#0D0D0D] p-12 flex-col justify-between border-r border-white/5">
          <h3 className="text-4xl font-black text-white leading-tight">Start your <span className="text-[#00D1D1]">Journey</span></h3>
          <div className="py-4">
            {animationData && <Lottie animationData={animationData} loop={true} className="w-full max-w-[280px] mx-auto opacity-80" />}
          </div>
          <div className="text-xs text-gray-600 font-bold uppercase">Safe • Secure • Reliable</div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 p-6 lg:p-12 flex flex-col bg-black/40 backdrop-blur-xl overflow-hidden">
          <div className="max-w-xl mx-auto w-full h-full flex flex-col">
            
            <div className="flex justify-between items-center mb-8 shrink-0">
               <span className="text-white font-black text-xl italic uppercase">Smart<span className="text-[#00D1D1]">Rozgar</span></span>
               <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`h-1.5 w-6 rounded-full ${step >= i ? 'bg-[#00D1D1]' : 'bg-white/10'}`} />
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              {step === 1 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-black text-white">Select Role</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => { setRole('hirer'); nextStep(); }} className={`p-8 bg-white/5 border rounded-[2rem] ${role === 'hirer' ? 'border-[#00D1D1]' : 'border-white/10'}`}>
                      <Home size={32} className="text-[#00D1D1] mb-2" />
                      <div className="text-white font-bold">Hirer</div>
                    </button>
                    <button onClick={() => { setRole('tasker'); nextStep(); }} className={`p-8 bg-white/5 border rounded-[2rem] ${role === 'tasker' ? 'border-[#00D1D1]' : 'border-white/10'}`}>
                      <Briefcase size={32} className="text-[#00D1D1] mb-2" />
                      <div className="text-white font-bold">Tasker</div>
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm focus:border-[#00D1D1] outline-none" />
                    <select name="gender" value={formData.gender} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none">
                      <option value="">Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none" />
                    <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none" />
                  </div>
                  <input name="city" value={formData.city} onChange={handleChange} placeholder="City (Required)" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-[#00D1D1]" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none" />
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none" />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  {role === 'tasker' ? (
                    <>
                      <div className="grid grid-cols-2 gap-2">
                        {skillsOptions.map(skill => (
                          <button key={skill} onClick={() => handleSkillToggle(skill)} className={`p-3 rounded-xl border text-[11px] font-bold ${formData.skills.includes(skill) ? 'bg-[#00D1D1] text-black' : 'text-gray-500 border-white/10'}`}>{skill}</button>
                        ))}
                      </div>
                      <input name="hourlyRate" type="number" value={formData.hourlyRate} onChange={handleChange} placeholder="Hourly Rate (PKR)" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white outline-none" />
                    </>
                  ) : (
                    <div className="text-center py-10 text-gray-400">Ready to create your Hirer profile!</div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-auto pt-6 border-t border-white/5">
              <div className="flex gap-4">
                {step > 1 && <button onClick={() => setStep(step - 1)} className="flex-1 py-4 border border-white/10 rounded-2xl text-gray-500 uppercase text-xs">Back</button>}
                <button onClick={step < 3 ? nextStep : handleSubmit} className="flex-[2] py-4 bg-[#00D1D1] text-black font-black rounded-2xl text-xs uppercase shadow-[0_0_15px_rgba(0,209,209,0.3)]">
                  {step === 3 ? 'Deploy Profile' : 'Next Phase'}
                </button>
              </div>
              {message && <div className={`mt-4 p-3 rounded-xl text-center text-xs font-bold border ${messageType === 'success' ? 'text-[#00D1D1] border-[#00D1D1]' : 'text-red-400 border-red-400'}`}>{message}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
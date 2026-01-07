import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldCheck, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import Logo from '/images/logo2.png'; 
import { axiosInstance } from '../../lib/axios';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/icons/Login.json')
      .then(response => response.json())
      .then(data => setAnimationData(data))
      .catch(error => console.error('Error loading animation:', error));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      setError('Please enter your email and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await axiosInstance.post('/auth/login', formData);
      login(response.data.user.role);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    /* MAIN WRAPPER: 
       'fixed inset-0' ensures it takes exactly the screen size.
       'overflow-hidden' prevents the "page-level" scrollbar.
    */
    <section className="fixed inset-0 w-full h-[100dvh] bg-[#050505] flex items-center justify-center p-4 sm:p-6 font-['Inter'] overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[#00D1D1]/5 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-[#00D1D1]/5 blur-[100px] rounded-full"></div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-5xl w-full bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Side: Branding (Visible only on desktop) */}
          <div className="hidden lg:flex bg-[#0D0D0D] p-12 flex-col justify-between relative border-r border-white/5">
            <div>
               <div className="flex items-center gap-2 text-[#00D1D1] mb-6 font-bold tracking-widest text-[10px] uppercase">
                  <ShieldCheck size={16} /> Secure Login
               </div>
               <h3 className="text-4xl font-black text-white mb-4 leading-tight">
                 Welcome back to <br />
                 <span className="text-[#00D1D1]">SmartRozgar</span>
               </h3>
               <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                 Log in to manage your profile and explore new opportunities.
               </p>
            </div>

            <div className="w-full max-w-[280px] mx-auto opacity-80">
              {animationData && (
                <Lottie 
                  animationData={animationData} 
                  loop={true} 
                  className="w-full h-auto"
                />
              )}
            </div>

            <div className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">
               Your security is our priority
            </div>
          </div>

          {/* Right Side: Login Form 
             'overflow-y-auto' is ONLY added here for small mobile screens 
             so the form doesn't get cut off if the screen is tiny.
          */}
          <div className="p-8 sm:p-12 lg:p-16 bg-black/40 backdrop-blur-xl max-h-[90vh] lg:max-h-none overflow-y-auto lg:overflow-visible">
            <div className="max-w-sm mx-auto">
              
              {/* Brand Logo */}
              <div className="text-center mb-10">
                <img src={Logo} alt="SmartRozgar" className="h-10 mx-auto mb-4 brightness-0 invert opacity-90" />
                <h2 className="text-2xl font-black text-white tracking-tight">Login</h2>
                <p className="text-gray-500 text-xs mt-1">Please enter your details below</p>
              </div>

              <div className="space-y-5">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-xs font-medium text-center">
                    {error}
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@mail.com"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#00D1D1] transition-all"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white focus:outline-none focus:border-[#00D1D1] transition-all"
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#00D1D1]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between px-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="accent-[#00D1D1] bg-transparent border-white/10" />
                    <span className="text-[11px] text-gray-500 font-medium">Remember me</span>
                  </label>
                  <button type="button" className="text-[11px] font-bold text-[#00D1D1] hover:underline underline-offset-4">
                    Forgot Password?
                  </button>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-[#00D1D1] hover:bg-[#00f2f2] disabled:bg-gray-800 text-black font-black py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-95 mt-2"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <>
                      <span>Login</span>
                      <LogIn size={18} />
                    </>
                  )}
                </button>

                <div className="text-center mt-8">
                  <p className="text-gray-500 text-xs font-medium">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-[#00D1D1] font-bold hover:underline">Sign up for SmartRozgar</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
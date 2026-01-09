import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ShieldCheck, MapPin, CheckCircle2, 
  Upload, Info, AlertCircle, Clock, Zap, Shield, 
  Copy, Check, Landmark, Wallet, Smartphone 
} from 'lucide-react';

const BookingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const tasker = state?.tasker;
  const selectedPlanKey = state?.plan || 'standard';
  const planInfo = tasker?.pricing[selectedPlanKey];

  // --- FORM STATES ---
  const [requirements, setRequirements] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [copied, setCopied] = useState(false);
  
  // --- PAYMENT METHOD STATE ---
  const [activeMethod, setActiveMethod] = useState('bank'); // 'bank', 'easypaisa', 'jazzcash'
  
  // --- ADD-ONS & PRICING ---
  const [addons, setAddons] = useState({ material: false, express: false });
  const [totalPrice, setTotalPrice] = useState(0);
  const serviceFee = 250;

  const paymentDetails = {
    bank: { name: "Meezan Bank", title: "FixIt Escrow", account: "PK70 MEZN 1234 5678 9012", icon: <Landmark size={18}/> },
    easypaisa: { name: "EasyPaisa", title: "M. Ahmad (Admin)", account: "0300 1234567", icon: <Wallet size={18}/> },
    jazzcash: { name: "JazzCash", title: "M. Ahmad (Admin)", account: "0321 7654321", icon: <Smartphone size={18}/> }
  };

  useEffect(() => {
    if (planInfo) {
      let total = parseInt(planInfo.price) + serviceFee;
      if (addons.material) total += 500;
      if (addons.express) total += 300;
      setTotalPrice(total);
    }
  }, [addons, planInfo]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!tasker) return <div className="h-screen bg-black flex items-center justify-center text-white italic font-black">Redirecting...</div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-['Inter'] pb-20">
      
      {/* HEADER SECTION */}
      <div className="pt-24 pb-8 px-6 bg-[#0A0A0A] border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-[#00D1D1] text-[10px] font-black uppercase tracking-widest transition-all">
                <ArrowLeft size={14}/> Back to Selection
            </button>
            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] hidden md:flex">
                <span className="text-gray-600">01 Selection</span>
                <div className="h-[1px] w-6 bg-white/10"></div>
                <span className="text-[#00D1D1]">02 Checkout</span>
                <div className="h-[1px] w-6 bg-white/10"></div>
                <span className="text-gray-800">03 Confirm</span>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: THE FORMS */}
        <div className="lg:col-span-8 space-y-12">
            
            {/* SECTION 1: REQUIREMENTS */}
            <section className="space-y-6">
                <h2 className="text-4xl font-black uppercase italic tracking-tighter leading-tight">Job <span className="text-[#00D1D1]">Scope</span></h2>
                <div className="space-y-4">
                    <textarea 
                        rows={4}
                        placeholder="Explain the problem in detail. (e.g., 'The kitchen sink pipe is cracked, I need a replacement...')"
                        className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 text-sm focus:border-[#00D1D1] outline-none transition-all resize-none shadow-inner"
                        onChange={(e) => setRequirements(e.target.value)}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                            <MapPin className="absolute left-5 top-5 text-gray-500" size={16}/>
                            <input type="text" placeholder="House #, Street, Block..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm outline-none focus:border-[#00D1D1]" onChange={(e)=>setAddress(e.target.value)} />
                        </div>
                        <div className="relative">
                            <Clock className="absolute left-5 top-5 text-gray-500" size={16}/>
                            <input type="date" className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm outline-none focus:border-[#00D1D1]" onChange={(e)=>setDate(e.target.value)} />
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 2: ADD-ONS */}
            <section className="pt-10 border-t border-white/5 space-y-6">
                <h3 className="text-2xl font-black uppercase italic tracking-tight flex items-center gap-3">
                    <Zap size={20} className="text-[#00D1D1] fill-[#00D1D1]/20"/> Recommended Extras
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button onClick={() => setAddons(p => ({...p, material: !p.material}))} className={`p-6 rounded-[2rem] border transition-all flex justify-between items-center group ${addons.material ? 'bg-[#00D1D1] border-[#00D1D1] text-black' : 'bg-white/5 border-white/10'}`}>
                        <div className="text-left"><p className="text-xs font-black uppercase">Source Materials</p><p className={`text-[8px] font-bold uppercase ${addons.material ? 'text-black/60' : 'text-gray-500'}`}>Tasker buys parts for you</p></div>
                        <span className="font-black">+Rs.500</span>
                    </button>
                    <button onClick={() => setAddons(p => ({...p, express: !p.express}))} className={`p-6 rounded-[2rem] border transition-all flex justify-between items-center group ${addons.express ? 'bg-[#00D1D1] border-[#00D1D1] text-black' : 'bg-white/5 border-white/10'}`}>
                        <div className="text-left"><p className="text-xs font-black uppercase">Express Service</p><p className={`text-[8px] font-bold uppercase ${addons.express ? 'text-black/60' : 'text-gray-500'}`}>Arrival in 60 minutes</p></div>
                        <span className="font-black">+Rs.300</span>
                    </button>
                </div>
            </section>

            {/* SECTION 3: MULTI-METHOD ESCROW PAYMENT */}
            <section className="pt-10 border-t border-white/5 space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#00D1D1]/10 flex items-center justify-center text-[#00D1D1] shadow-[0_0_20px_rgba(0,209,209,0.1)]"><ShieldCheck size={24}/></div>
                    <div>
                        <h3 className="text-2xl font-black uppercase italic leading-none text-white">Secure Escrow</h3>
                        <p className="text-[9px] text-gray-500 uppercase font-black tracking-widest mt-1">Manual Verification Required</p>
                    </div>
                </div>

                {/* METHOD TABS */}
                <div className="flex gap-2 p-1 bg-white/5 rounded-2xl border border-white/10">
                  {['bank', 'easypaisa', 'jazzcash'].map((method) => (
                    <button 
                      key={method}
                      onClick={() => setActiveMethod(method)}
                      className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeMethod === method ? 'bg-[#00D1D1] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                    >
                      {paymentDetails[method].icon} {method}
                    </button>
                  ))}
                </div>

                <div className="bg-[#0A0A0A] border border-white/10 rounded-[3rem] p-8 space-y-8 relative overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        <div className="p-6 bg-black/40 rounded-3xl border border-white/5 relative group">
                            <p className="text-[9px] text-gray-600 font-black uppercase mb-2">{paymentDetails[activeMethod].name} Number / IBAN</p>
                            <p className="text-sm font-mono font-bold text-[#00D1D1] break-all">{paymentDetails[activeMethod].account}</p>
                            <button onClick={()=>copyToClipboard(paymentDetails[activeMethod].account)} className="absolute top-6 right-6 text-gray-600 hover:text-white transition-colors">
                                {copied ? <Check size={14} className="text-[#00D1D1]"/> : <Copy size={14}/>}
                            </button>
                        </div>
                        <div className="p-6 bg-black/40 rounded-3xl border border-white/5">
                            <p className="text-[9px] text-gray-600 font-black uppercase mb-2">Account Title</p>
                            <p className="text-sm font-bold uppercase text-white tracking-tight">{paymentDetails[activeMethod].title}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative group border-2 border-dashed border-white/10 rounded-[2.5rem] p-12 hover:border-[#00D1D1]/40 transition-all text-center bg-white/[0.01]">
                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e)=>setReceipt(e.target.files[0])}/>
                            <div className="p-4 bg-black w-fit mx-auto rounded-2xl mb-4 text-gray-600 group-hover:text-[#00D1D1] transition-colors">
                                <Upload size={24} />
                            </div>
                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">
                                {receipt ? <span className="text-[#00D1D1]">{receipt.name}</span> : `Upload ${activeMethod} Receipt`}
                            </p>
                        </div>
                        <div className="p-5 bg-amber-500/5 rounded-[1.5rem] border border-amber-500/10 flex items-start gap-4">
                            <AlertCircle size={18} className="text-amber-500 shrink-0" />
                            <p className="text-[9px] text-gray-500 uppercase font-black leading-relaxed">
                                Our admin team will verify this screenshot. Money is held in Escrow and only released to the professional after you approve the completed work.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        {/* RIGHT COLUMN: DYNAMIC INVOICE */}
        <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
                <div className="bg-[#0A0A0A] border border-white/10 rounded-[3.5rem] p-10 space-y-8 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-[#00D1D1]/5 blur-[100px] rounded-full"></div>
                    
                    <div className="flex items-center gap-4 pb-8 border-b border-white/5 relative z-10">
                        <img src={tasker.image} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-white/5" />
                        <div>
                            <h4 className="font-black uppercase italic text-lg leading-none">{tasker.fullName}</h4>
                            <div className="flex items-center gap-1 mt-2">
                                <ShieldCheck size={12} className="text-[#00D1D1]"/>
                                <span className="text-[8px] text-gray-500 font-black uppercase tracking-widest">Verified Expert</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 text-[11px] font-black uppercase tracking-widest text-gray-500 relative z-10">
                        <div className="flex justify-between items-center">
                            <span>{selectedPlanKey} Package</span>
                            <span className="text-white font-black italic text-sm">Rs. {planInfo.price}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span>Service Fee (Escrow)</span>
                            <span className="text-white font-black italic text-sm">+Rs. {serviceFee}</span>
                        </div>
                        {addons.material && <div className="flex justify-between items-center text-[#00D1D1]"><span>Material Sourcing</span><span>+Rs. 500</span></div>}
                        {addons.express && <div className="flex justify-between items-center text-[#00D1D1]"><span>Express Arrival</span><span>+Rs. 300</span></div>}
                        
                        <div className="h-[1px] bg-white/5 my-6"></div>
                        
                        <div className="flex justify-between items-center">
                            <span className="text-xs italic">Total Payable</span>
                            <span className="text-5xl font-black italic tracking-tighter text-white leading-none">Rs.{totalPrice}</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => navigate('/success')}
                        disabled={!requirements || !address || !receipt || !date}
                        className="w-full py-7 bg-[#00D1D1] text-black font-black uppercase text-[11px] rounded-[2rem] hover:scale-[1.03] active:scale-95 transition-all shadow-[0_20px_50px_rgba(0,209,209,0.3)] disabled:opacity-20 disabled:grayscale relative z-10"
                    >
                        Place Booking Request
                    </button>
                </div>
                
                <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-[2rem] flex items-center gap-4 group">
                    <ShieldCheck size={24} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                    <p className="text-[9px] font-black uppercase text-emerald-500/80 tracking-widest leading-relaxed">
                        Secure Escrow Protection: Your money is safe with us until the job is done.
                    </p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default BookingPage;
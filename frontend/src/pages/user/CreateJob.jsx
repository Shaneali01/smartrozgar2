import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, Clock, Zap, ShieldCheck, Receipt, 
  ChevronLeft, Upload, X, Wallet, CheckCircle2
} from 'lucide-react';

const EliteHirerStepper = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]); 
  const [paymentOption, setPaymentOption] = useState('later'); // 'now' or 'later'
  
  const [formData, setFormData] = useState({
    service: 'General Maintenance & Repair',
    description: '',
    houseNo: '', street: '', city: '', pincode: '',
    date: '', hours: 1, price: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeployTask = async () => {
    // Basic Validation
    if (!formData.date) return alert("Please select a date.");
    if (paymentOption === 'now' && files.length === 0) {
      return alert("Please upload proof of payment or select 'Pay Later'.");
    }

    setLoading(true);

    try {
      const hirerData = JSON.parse(localStorage.getItem('user'));
      const hirerId = hirerData?._id || hirerData?.id;

      let uploadedUrls = [];
      
      // 1. Only upload if they chose 'now' and have files
      if (paymentOption === 'now' && files.length > 0) {
        const uploadPromises = files.map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "YOUR_PRESET"); 
          const res = await axios.post("https://api.cloudinary.com/v1_1/YOUR_CLOUD/image/upload", data);
          return res.data.secure_url;
        });
        uploadedUrls = await Promise.all(uploadPromises);
      }

      // 2. Map Payload
      const payload = {
        hirer: hirerId,
        service: formData.service,
        description: formData.description,
        address: {
          houseNo: formData.houseNo,
          street: formData.street,
          city: formData.city,
          pincode: formData.pincode,
          state: "Pakistan"
        },
        date: formData.date,
        hours: Number(formData.hours),
        price: Number(formData.price),
        paymentScreenshots: uploadedUrls,
        paymentStatus: uploadedUrls.length > 0 ? "unverified" : "unpaid",
        status: "pending",
        jobType: "public"
      };

      const response = await axios.post('http://localhost:5000/api/jobs/create-job', payload);
      
      if (response.status === 201) {
        alert(paymentOption === 'now' ? "Job deployed! Verification pending." : "Job deployed! You can pay after completion.");
        navigate('/hirer-dashboard');
      }
    } catch (error) {
      alert("Error creating job. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#02040a] text-slate-400 font-sans selection:bg-teal-500/30">
      <nav className="border-b border-white/5 bg-[#02040a]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 text-white font-bold">
            <Zap className="text-teal-400" size={20} fill="currentColor" />
            <span className="tracking-tighter text-lg">ElitePortal</span>
          </div>
          <button onClick={() => navigate(-1)} className="text-xs font-bold text-slate-500 hover:text-white transition-colors">Exit</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          
          {/* STEP 1, 2, 3 logic remains the same (Service, Location, Timing) */}
          {step === 1 && (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-3xl font-bold text-white tracking-tight">Job Details</h2>
                <div className="space-y-4">
                    <select name="service" value={formData.service} onChange={handleChange} className="w-full bg-[#0a0f1d] border border-white/5 p-4 rounded-xl text-white outline-none focus:border-teal-500">
                        <option>General Maintenance & Repair</option>
                        <option>Deep Cleaning Services</option>
                        <option>Electrical Engineering</option>
                    </select>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows="5" className="w-full bg-[#0a0f1d] border border-white/5 p-4 rounded-xl text-white outline-none focus:border-teal-500" placeholder="Requirements..." />
                </div>
             </div>
          )}

          {step === 2 && (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-3xl font-bold text-white tracking-tight">Site Location</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input name="houseNo" placeholder="House #" onChange={handleChange} className="col-span-2 bg-[#0a0f1d] border border-white/5 p-4 rounded-xl text-white outline-none focus:border-teal-500" />
                    <input name="city" placeholder="City" onChange={handleChange} className="bg-[#0a0f1d] border border-white/5 p-4 rounded-xl text-white outline-none focus:border-teal-500" />
                    <input name="pincode" placeholder="Pincode" onChange={handleChange} className="bg-[#0a0f1d] border border-white/5 p-4 rounded-xl text-white outline-none focus:border-teal-500" />
                </div>
             </div>
          )}

          {step === 3 && (
             <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                <h2 className="text-3xl font-bold text-white tracking-tight">Timeline</h2>
                <div className="flex gap-4">
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="flex-1 bg-[#0a0f1d] border border-white/5 p-4 rounded-xl text-white outline-none color-scheme-dark" />
                    <input type="number" name="hours" placeholder="Est. Hours" onChange={handleChange} className="w-32 bg-[#0a0f1d] border border-white/5 p-4 rounded-xl text-white outline-none" />
                </div>
             </div>
          )}

          {/* STEP 4: REDESIGNED WITH OPTIONAL PAYMENT */}
          {step === 4 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <header className="space-y-2">
                <h2 className="text-3xl font-bold text-white tracking-tight">Settlement Method</h2>
                <p className="text-slate-500">Choose how you want to handle the service fee of ₨ {formData.price}.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option 1: Pay Later */}
                <div 
                  onClick={() => setPaymentOption('later')}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${paymentOption === 'later' ? 'border-teal-500 bg-teal-500/5' : 'border-white/5 bg-[#0a0f1d] hover:border-white/20'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <Wallet className={paymentOption === 'later' ? 'text-teal-400' : 'text-slate-500'} />
                    {paymentOption === 'later' && <CheckCircle2 size={20} className="text-teal-500" />}
                  </div>
                  <h3 className="text-white font-bold text-lg">Pay After Service</h3>
                  <p className="text-xs text-slate-500 mt-1">Deploy now, pay the professional directly once the work is verified.</p>
                </div>

                {/* Option 2: Pre-pay (Escrow) */}
                <div 
                  onClick={() => setPaymentOption('now')}
                  className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${paymentOption === 'now' ? 'border-teal-500 bg-teal-500/5' : 'border-white/5 bg-[#0a0f1d] hover:border-white/20'}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <ShieldCheck className={paymentOption === 'now' ? 'text-teal-400' : 'text-slate-500'} />
                    {paymentOption === 'now' && <CheckCircle2 size={20} className="text-teal-500" />}
                  </div>
                  <h3 className="text-white font-bold text-lg">Secure Escrow</h3>
                  <p className="text-xs text-slate-500 mt-1">Upload receipt now. We hold the funds until the task is complete.</p>
                </div>
              </div>

              {/* Upload Section - Only shows if 'now' is selected */}
              {paymentOption === 'now' && (
                <div className="space-y-4 pt-6 border-t border-white/5 animate-in slide-in-from-top-2">
                  <div className="bg-[#0a0f1d] border border-white/5 p-4 rounded-xl text-xs text-slate-400">
                    <p className="font-bold text-white mb-1">Bank: Meezan Bank Ltd</p>
                    <p>IBAN: PK72MEZN00123456789</p>
                  </div>
                  <div className="relative border-2 border-dashed border-slate-800 rounded-2xl p-8 flex flex-col items-center justify-center hover:border-teal-500/30 transition-all">
                    <input type="file" multiple onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Upload className="text-slate-600 mb-2" />
                    <span className="text-xs font-bold">Upload One or More Screenshots</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {files.map((f, i) => (
                      <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-white/10">
                        <img src={URL.createObjectURL(f)} className="w-full h-full object-cover" alt="Proof" />
                        <button onClick={() => removeFile(i)} className="absolute top-1 right-1 bg-red-500 p-0.5 rounded-full text-white"><X size={10}/></button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between mt-12 pt-8 border-t border-white/5">
            <button onClick={() => setStep(step - 1)} className={`font-bold text-sm ${step === 1 ? 'invisible' : 'text-slate-500 hover:text-white'}`}>Back</button>
            <button 
              onClick={step === 4 ? handleDeployTask : () => setStep(step + 1)} 
              disabled={loading}
              className={`px-12 py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${step === 4 ? 'bg-teal-500 text-black shadow-lg shadow-teal-500/20' : 'bg-white text-black'}`}
            >
              {loading ? 'Deploying...' : step === 4 ? 'Confirm & Deploy' : 'Next Step'}
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 hidden lg:block">
          <div className="bg-[#0a0f1d] border border-white/5 rounded-3xl p-8 sticky top-32 space-y-6">
            <div className="flex items-center gap-2 text-white border-b border-white/5 pb-4">
              <Receipt size={16} className="text-teal-500" />
              <h3 className="text-xs font-black uppercase tracking-widest">Job Brief</h3>
            </div>
            <div className="space-y-4">
              <div><label className="text-[10px] font-bold text-slate-600 uppercase">Service</label><p className="text-sm text-white">{formData.service}</p></div>
              <div><label className="text-[10px] font-bold text-slate-600 uppercase">Scheduled</label><p className="text-sm text-white">{formData.date || 'Pending'}</p></div>
              <div><label className="text-[10px] font-bold text-slate-600 uppercase">Total Cost</label><p className="text-2xl font-bold text-teal-400">₨ {Number(formData.price).toLocaleString()}</p></div>
              <div><label className="text-[10px] font-bold text-slate-600 uppercase">Payment</label><p className="text-xs text-slate-400 italic">{paymentOption === 'now' ? 'Escrow (Upfront)' : 'Post-Service Payment'}</p></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EliteHirerStepper;
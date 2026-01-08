import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { 
  Wallet, Plus, ArrowUpRight, ArrowDownLeft, 
  CreditCard, PieChart, History, ExternalLink,
  DollarSign, TrendingUp, Landmark
} from 'lucide-react';

const MyWallet = () => {
  const { userData } = useOutletContext();

  const transactions = [
    { id: 1, type: 'credit', title: 'Wallet Top-up', date: 'Oct 20, 2024', amount: '+5000', status: 'Completed' },
    { id: 2, type: 'debit', title: 'Service Payment: Cleaning', date: 'Oct 18, 2024', amount: '-2500', status: 'Completed' },
    { id: 3, type: 'debit', title: 'Service Payment: Plumbing', date: 'Oct 15, 2024', amount: '-1200', status: 'Pending' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-700 pb-12">
      
      {/* 1. Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1 w-12 bg-[#00D1D1] rounded-full"></div>
            <span className="text-[10px] font-black text-[#00D1D1] uppercase tracking-[0.4em]">Financial Hub</span>
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter uppercase">My Wallet</h1>
        </div>
        <button className="px-8 py-4 bg-[#00D1D1] text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00f2f2] transition-all shadow-[0_10px_30px_rgba(0,209,209,0.2)] flex items-center gap-2">
          <Plus size={16}/> Add Funds
        </button>
      </div>

      {/* 2. Top Section: Cards & Stats */}
      <div className="grid grid-cols-12 gap-8">
        
        {/* Virtual Card View */}
        <div className="col-span-12 lg:col-span-7">
          <div className="relative h-64 w-full bg-gradient-to-br from-[#111] to-[#050505] rounded-[2.5rem] border border-white/10 p-10 overflow-hidden group shadow-2xl">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D1D1]/10 blur-[80px] rounded-full group-hover:bg-[#00D1D1]/20 transition-all duration-700"></div>
            
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Available Balance</p>
                  <h2 className="text-4xl font-black text-white tracking-tighter">
                    PKR {userData?.walletBalance || '0.00'}
                  </h2>
                </div>
                <div className="h-12 w-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                  <Landmark size={24} className="text-[#00D1D1]" />
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-2">{userData?.fullName || 'User Name'}</p>
                  <p className="font-mono text-gray-500 tracking-[0.2em] text-xs">**** **** **** 4821</p>
                </div>
                <div className="flex -space-x-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/80 blur-[1px]"></div>
                    <div className="w-10 h-10 rounded-full bg-yellow-500/80 blur-[1px]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Summary Stats */}
        <div className="col-span-12 lg:col-span-5 grid grid-cols-1 gap-4">
          <WalletStat label="Monthly Spending" value="PKR 8,400" icon={<TrendingUp size={20}/>} trend="+12%" />
          <WalletStat label="Saved with SmartRozgar" value="PKR 1,200" icon={<PieChart size={20}/>} trend="Top 5%" />
        </div>
      </div>

      {/* 3. Transaction History */}
      <div className="bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex justify-between items-center">
          <h3 className="font-black text-white text-[10px] uppercase tracking-[0.2em] text-gray-500">Recent Transactions</h3>
          <button className="text-[10px] font-black text-[#00D1D1] uppercase tracking-widest flex items-center gap-1 hover:underline">
            View All <ExternalLink size={12} />
          </button>
        </div>
        
        <div className="divide-y divide-white/5">
          {transactions.map((trx) => (
            <div key={trx.id} className="p-6 hover:bg-white/[0.02] transition-all flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border border-white/5 ${trx.type === 'credit' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {trx.type === 'credit' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div>
                  <p className="font-black text-sm text-white uppercase tracking-tight">{trx.title}</p>
                  <p className="text-[10px] text-gray-600 font-bold uppercase mt-1">{trx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-black text-sm tracking-tighter ${trx.type === 'credit' ? 'text-emerald-400' : 'text-white'}`}>
                  {trx.amount} PKR
                </p>
                <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest mt-1">{trx.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Payment Methods Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 bg-white/5 border border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center text-center group hover:border-[#00D1D1]/50 transition-all cursor-pointer">
          <div className="h-12 w-12 bg-black rounded-full flex items-center justify-center text-gray-600 group-hover:text-[#00D1D1] mb-4 border border-white/5">
            <Plus size={24} />
          </div>
          <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Add New Card</p>
        </div>
        {/* Placeholder for existing card */}
        <div className="p-8 bg-[#0A0A0A] border border-white/10 rounded-[2rem] flex items-center gap-4">
          <div className="h-10 w-14 bg-gradient-to-r from-blue-600 to-blue-400 rounded-md"></div>
          <div>
            <p className="text-[10px] font-black text-white uppercase tracking-widest">Visa Default</p>
            <p className="text-[10px] text-gray-600 font-bold tracking-widest">**** 9012</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Component for Stats
const WalletStat = ({ label, value, icon, trend }) => (
  <div className="bg-[#0A0A0A] border border-white/10 rounded-[2rem] p-6 flex items-center justify-between group hover:border-white/20 transition-all">
    <div className="flex items-center gap-4">
      <div className="h-12 w-12 bg-black rounded-2xl flex items-center justify-center text-[#00D1D1] border border-white/5">
        {icon}
      </div>
      <div>
        <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{label}</p>
        <p className="text-lg font-black text-white tracking-tighter">{value}</p>
      </div>
    </div>
    <span className="text-[9px] font-black px-3 py-1 bg-[#00D1D1]/10 text-[#00D1D1] rounded-full uppercase">
      {trend}
    </span>
  </div>
);

export default MyWallet;
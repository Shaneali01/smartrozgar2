import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Send, Paperclip, MoreVertical, Search, ArrowLeft, 
  CheckCheck, Smile, Phone, Video 
} from 'lucide-react';

const ChatPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const scrollRef = useRef();

  // 1. INITIAL MOCK DATA
  const [conversations, setConversations] = useState([
    {
      id: 1,
      fullName: "Ahmad Hassan",
      image: "https://i.pravatar.cc/150?u=ahmad",
      status: "Online",
      messages: [
        { id: 101, sender: 'tasker', text: "I can be there by 4:00 PM.", time: "10:00 AM" },
        { id: 102, sender: 'user', text: "That works for me, Ahmad!", time: "10:05 AM" },
      ]
    },
    {
      id: 4,
      fullName: "Kamran Siddiqui",
      image: "https://i.pravatar.cc/150?u=kamran",
      status: "Online",
      messages: [
        { id: 401, sender: 'tasker', text: "I've reviewed your request for the kitchen fitting.", time: "09:30 AM" }
      ]
    }
  ]);

  // 2. DYNAMIC SELECTION LOGIC
  const [activeChatId, setActiveChatId] = useState(state?.tasker?.id || 1);

  // Handle incoming Tasker from Modal
  useEffect(() => {
    if (state?.tasker) {
      const exists = conversations.find(c => c.id === state.tasker.id);
      if (!exists) {
        const newConversation = {
          id: state.tasker.id,
          fullName: state.tasker.fullName,
          image: state.tasker.image,
          status: "Online",
          messages: [{ 
            id: Date.now(), 
            sender: 'tasker', 
            text: `Hi! I'm ${state.tasker.fullName}. I noticed you were looking at my profile. How can I assist you?`, 
            time: "Just now" 
          }]
        };
        setConversations(prev => [newConversation, ...prev]);
        setActiveChatId(state.tasker.id);
      } else {
        setActiveChatId(state.tasker.id);
      }
    }
  }, [state]);

  const activeChat = conversations.find(c => c.id === activeChatId) || conversations[0];

  const handleSendMessage = (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(chat => {
        if(chat.id === activeChatId) {
            return { ...chat, messages: [...chat.messages, newMessage] };
        }
        return chat;
    }));
    setMessage("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChatId, conversations]);

  // Filter conversations based on search
  const filteredChats = conversations.filter(c => 
    c.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen w-full bg-[#050505] text-white font-['Inter'] flex overflow-hidden fixed inset-0">
      
      {/* SIDEBAR */}
      <div className="hidden lg:flex w-[380px] border-r border-white/5 flex-col bg-[#0A0A0A]">
        <div className="p-8 space-y-6">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-[#00D1D1] text-[10px] font-black uppercase tracking-widest transition-all">
                <ArrowLeft size={14}/> Back to Hub
            </button>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">Messages</h2>
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16}/>
                <input 
                  type="text" 
                  placeholder="Find contact..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-xs font-bold outline-none focus:border-[#00D1D1] transition-all" 
                />
            </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
            {filteredChats.map((chat) => (
                <div 
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className={`p-5 rounded-[2rem] flex items-center gap-4 cursor-pointer transition-all mb-2 border
                        ${activeChatId === chat.id ? 'bg-[#00D1D1]/10 border-[#00D1D1]/30' : 'bg-transparent border-transparent hover:bg-white/5'}`}
                >
                    <img src={chat.image} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-white/5" alt="pro" />
                    <div className="flex-1 overflow-hidden">
                        <h5 className={`text-[11px] font-black uppercase tracking-tight ${activeChatId === chat.id ? 'text-[#00D1D1]' : 'text-gray-400'}`}>{chat.fullName}</h5>
                        <p className="text-[9px] text-gray-600 font-bold truncate uppercase">
                          {chat.messages[chat.messages.length - 1]?.text}
                        </p>
                    </div>
                    {chat.status === "Online" && <div className="w-1.5 h-1.5 bg-[#00D1D1] rounded-full shadow-[0_0_8px_#00D1D1]"></div>}
                </div>
            ))}
        </div>
      </div>

      {/* CHAT WINDOW */}
      <div className="flex-1 flex flex-col h-full bg-[#050505]">
        
        {/* Header */}
        <div className="h-24 shrink-0 border-b border-white/5 bg-[#0A0A0A]/90 backdrop-blur-md flex items-center justify-between px-10 z-10">
            <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={activeChat.image} className="w-12 h-12 rounded-2xl object-cover ring-2 ring-[#00D1D1]/20" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#00D1D1] rounded-full border-2 border-[#0A0A0A]"></div>
                </div>
                <div>
                    <h4 className="font-black uppercase italic tracking-tight text-xl">{activeChat.fullName}</h4>
                    <p className="text-[9px] font-black text-[#00D1D1] uppercase tracking-[0.2em]">Verified Expert</p>
                </div>
            </div>
            <div className="flex items-center gap-6 text-gray-500">
                <Phone size={20} className="hover:text-[#00D1D1] cursor-pointer transition-all"/>
                <Video size={20} className="hover:text-[#00D1D1] cursor-pointer transition-all"/>
                <MoreVertical size={20} className="hover:text-white cursor-pointer"/>
            </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
            {activeChat.messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className="max-w-[65%] space-y-2">
                        <div className={`p-5 rounded-[2rem] text-sm font-medium leading-relaxed whitespace-pre-wrap shadow-2xl
                            ${msg.sender === 'user' 
                                ? 'bg-[#00D1D1] text-black rounded-tr-none shadow-[0_10px_30px_rgba(0,209,209,0.2)]' 
                                : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'}`}>
                            {msg.text}
                        </div>
                        <p className={`text-[8px] font-black text-gray-700 uppercase px-4 flex items-center gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.time} {msg.sender === 'user' && <CheckCheck size={12} className="text-[#00D1D1]"/>}
                        </p>
                    </div>
                </div>
            ))}
            <div ref={scrollRef} />
        </div>

        {/* Multi-line Input Bar */}
        <div className="p-8 bg-[#0A0A0A] border-t border-white/5 shrink-0">
            <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto flex items-end gap-4 bg-black border border-white/10 p-3 rounded-[2.5rem] focus-within:border-[#00D1D1] transition-all">
                <div className="flex items-center gap-1 pb-1">
                  <button type="button" className="p-3 text-gray-500 hover:text-[#00D1D1] transition-colors"><Paperclip size={22}/></button>
                  <button type="button" className="p-3 text-gray-500 hover:text-[#00D1D1] transition-colors"><Smile size={22}/></button>
                </div>
                
                <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => { if(e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSendMessage(); }}}
                    placeholder={`Message ${activeChat.fullName.split(' ')[0]}...`} 
                    rows={1}
                    className="flex-1 bg-transparent border-none py-3 px-2 text-sm font-medium outline-none placeholder:text-gray-800 resize-none max-h-32 custom-scrollbar overflow-y-auto"
                />

                <button 
                  type="submit" 
                  disabled={!message.trim()} 
                  className={`p-4 rounded-2xl transition-all shrink-0 
                    ${message.trim() ? 'bg-[#00D1D1] text-black shadow-[0_0_25px_rgba(0,209,209,0.4)] hover:scale-105' : 'bg-white/5 text-gray-800'}`}
                >
                    <Send size={20} />
                </button>
            </form>
        </div>
      </div>

      {/* Global CSS for thin scrollbars */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 209, 209, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00D1D1; }
      `}} />
    </div>
  );
};

export default ChatPage;
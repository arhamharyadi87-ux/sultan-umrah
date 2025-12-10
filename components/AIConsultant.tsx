import React, { useState, useEffect, useRef } from 'react';
import { sendMessageToAI } from '../services/geminiService';
import { ChatMessage, LoadingState } from '../types';

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Assalamualaikum! Saya SultanAssistant. Ada yang bisa saya bantu mengenai rencana ibadah VIP Anda? Tanyakan apa saja tentang paket atau persiapan umrah.',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || status === LoadingState.LOADING) return;

    const userMsg: ChatMessage = { role: 'user', text: input, timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setStatus(LoadingState.LOADING);

    try {
      const responseText = await sendMessageToAI(input);
      const modelMsg: ChatMessage = { role: 'model', text: responseText, timestamp: Date.now() };
      setMessages(prev => [...prev, modelMsg]);
      setStatus(LoadingState.SUCCESS);
    } catch (error) {
      const errorMsg: ChatMessage = { role: 'model', text: "Maaf, terjadi kesalahan. Mohon coba lagi.", timestamp: Date.now() };
      setMessages(prev => [...prev, errorMsg]);
      setStatus(LoadingState.ERROR);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <section id="consultant" className="py-20 px-4 md:px-6 bg-neo-green border-b-4 border-black pattern-grid">
        <style>{`
            .pattern-grid {
                background-image: radial-gradient(black 1px, transparent 1px);
                background-size: 20px 20px;
            }
        `}</style>
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border-4 border-black shadow-neo-xl p-0 overflow-hidden flex flex-col h-[600px]">
          
          {/* Window Header */}
          <div className="bg-neo-pink border-b-4 border-black p-4 flex justify-between items-center">
            <h3 className="font-black text-xl uppercase flex items-center gap-2">
                <span className="animate-pulse">🟢</span> Live AI Consultant
            </h3>
            <div className="flex gap-2">
                <div className="w-4 h-4 bg-white border-2 border-black rounded-full"></div>
                <div className="w-4 h-4 bg-neo-yellow border-2 border-black rounded-full"></div>
                <div className="w-4 h-4 bg-neo-blue border-2 border-black rounded-full"></div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-grow p-6 overflow-y-auto bg-gray-50" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 border-2 border-black font-bold text-sm md:text-base shadow-neo ${
                  msg.role === 'user' 
                    ? 'bg-neo-yellow text-black rounded-tl-xl rounded-tr-xl rounded-bl-xl' 
                    : 'bg-white text-black rounded-tr-xl rounded-br-xl rounded-bl-xl'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {status === LoadingState.LOADING && (
               <div className="flex justify-start mb-4">
                 <div className="bg-white border-2 border-black p-4 shadow-neo rounded-tr-xl rounded-br-xl rounded-bl-xl">
                   <div className="flex gap-1">
                     <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                     <div className="w-2 h-2 bg-black rounded-full animate-bounce delay-75"></div>
                     <div className="w-2 h-2 bg-black rounded-full animate-bounce delay-150"></div>
                   </div>
                 </div>
               </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t-4 border-black flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              className="flex-grow bg-gray-100 border-2 border-black p-4 font-bold focus:outline-none focus:bg-neo-yellow transition-colors placeholder-gray-500"
              placeholder="Tanya soal hotel, visa, atau persiapan..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={status === LoadingState.LOADING}
            />
            <button 
              onClick={handleSend}
              disabled={status === LoadingState.LOADING}
              className="bg-black text-white px-8 py-4 font-black uppercase border-2 border-transparent hover:bg-neo-blue hover:text-black hover:border-black transition-all disabled:opacity-50"
            >
              KIRIM
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIConsultant;